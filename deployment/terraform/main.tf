terraform {
  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
      version = "3.4.0"
    }
  }

  backend "azurerm" {
    resource_group_name  = "multitstate"
    storage_account_name = "multitstate"
    container_name       = "multitstate"
    key                  = "terraform.tfstate"
  }
}

provider "azurerm" {
  features {
    key_vault {
      purge_soft_delete_on_destroy = true
    }
  }
}

data "azurerm_client_config" "current" {}

# Which location are we deploying to
variable "location" {
  type = string
}

# Resource group for the entire pipeln project
resource "azurerm_resource_group" "rg" {
  name     = "pipeln-rg-${var.location}"
  location = var.location
}

output "resource_group_name" {
  value = azurerm_resource_group.rg.name
}

# Static website resources
resource "azurerm_storage_account" "static_storage" {
  name                      = "pipelnstaticweb"
  resource_group_name       = azurerm_resource_group.rg.name
  location                  = azurerm_resource_group.rg.location
  account_kind              = "StorageV2"
  account_tier              = "Standard"
  account_replication_type  = "GRS"
  enable_https_traffic_only = true

  static_website {
    index_document     = "index.html"
    error_404_document = "index.html"
  }
}

output "storage_account_name" {
  value = azurerm_storage_account.static_storage.name
}

# Web services
variable "kv-key-permissions-full" {
  type        = list(string)
  description = "List of full key permissions, must be one or more from the following: Backup, create, decrypt, delete, encrypt, get, import, list, purge, recover, restore, sign, UnwrapKey, update, verify and WrapKey."
  default = ["Backup", "Create", "Decrypt", "Delete", "Encrypt", "Get", "Import", "List", "Purge",
  "Recover", "Restore", "Sign", "UnwrapKey", "Update", "Verify", "WrapKey"]
}

variable "kv-secret-permissions-full" {
  type        = list(string)
  description = "List of full secret permissions, must be one or more from the following: Backup, delete, get, list, purge, recover, restore and set"
  default     = ["Backup", "Delete", "Get", "List", "Purge", "Recover", "Restore", "Set"]
}

variable "kv-certificate-permissions-full" {
  type        = list(string)
  description = "List of full certificate permissions, must be one or more from the following: Backup, create, delete, DeleteIssuers, get, GetIssuers, import, list, ListIssuers, ManageContacts, ManageIssuers, purge, recover, restore, SetIssuers and update"
  default = ["Create", "Delete", "DeleteIssuers", "Get", "GetIssuers", "Import", "List", "ListIssuers",
  "ManageContacts", "ManageIssuers", "Purge", "Recover", "SetIssuers", "Update", "Backup", "Restore"]
}

variable "kv-storage-permissions-full" {
  type        = list(string)
  description = "List of full storage permissions, must be one or more from the following: Backup, delete, get, GetSAS, list, ListSAS, purge, recover, RegenerateKey, restore, set, SetSAS and update"
  default = ["Backup", "Delete", "Get", "GetSAS", "List", "ListSAS",
  "Purge", "Recover", "RegenerateKey", "Restore", "Set", "SetSAS", "Update"]
}

variable "kv-key-permissions-read" {
  type        = list(string)
  description = "List of read key permissions, must be one or more from the following: backup, create, decrypt, delete, encrypt, get, import, list, purge, recover, restore, sign, UnwrapKey, update, verify and WrapKey"
  default     = ["Get", "List"]
}

variable "kv-secret-permissions-read" {
  type        = list(string)
  description = "List of full secret permissions, must be one or more from the following: backup, delete, get, list, purge, recover, restore and set"
  default     = ["Get", "List"]
}

variable "kv-certificate-permissions-read" {
  type        = list(string)
  description = "List of full certificate permissions, must be one or more from the following: backup, create, delete, DeleteIssuers, get, GetIssuers, import, list, ListIssuers, ManageContacts, ManageIssuers, purge, recover, restore, SetIssuers and update"
  default     = ["Get", "GetIssuers", "List", "ListIssuers"]
}

variable "kv-storage-permissions-read" {
  type        = list(string)
  description = "List of read storage permissions, must be one or more from the following: backup, delete, DeleteSaS, get, GetSAS, list, ListSAS, purge, recover, RegenerateKey, restore, set, SetSAS and update"
  default     = ["Get", "GetSAS", "List", "ListSAS"]
}

resource "azurerm_user_assigned_identity" "base" {
  name                = "mi-appgw-keyvault"
  resource_group_name = azurerm_resource_group.rg.name
  location            = azurerm_resource_group.rg.location
}

resource "azurerm_key_vault" "akv" {
  name                        = "pipelnkeyvault"
  location                    = azurerm_resource_group.rg.location
  resource_group_name         = azurerm_resource_group.rg.name
  enabled_for_disk_encryption = true
  tenant_id                   = data.azurerm_client_config.current.tenant_id
  soft_delete_retention_days  = 7
  purge_protection_enabled    = false

  sku_name = "standard"

  # Configure access policy for tenant
  access_policy {
    tenant_id = data.azurerm_client_config.current.tenant_id
    object_id = data.azurerm_client_config.current.object_id

    key_permissions         = var.kv-key-permissions-full
    secret_permissions      = var.kv-secret-permissions-full
    certificate_permissions = var.kv-certificate-permissions-full
    storage_permissions     = var.kv-storage-permissions-full
  }

  # Configure access policy for appgw
  access_policy {
    object_id = azurerm_user_assigned_identity.base.principal_id
    tenant_id = data.azurerm_client_config.current.tenant_id

    key_permissions         = var.kv-key-permissions-read
    secret_permissions      = var.kv-secret-permissions-read
    certificate_permissions = var.kv-certificate-permissions-read
    storage_permissions     = var.kv-storage-permissions-read
  }
}

resource "azurerm_key_vault_certificate" "tlscert" {
  name         = "pipelntlscert"
  key_vault_id = azurerm_key_vault.akv.id

  certificate_policy {
    issuer_parameters {
      name = "Self"
    }

    key_properties {
      exportable = true
      key_size   = 2048
      key_type   = "RSA"
      reuse_key  = true
    }

    lifetime_action {
      action {
        action_type = "AutoRenew"
      }

      trigger {
        days_before_expiry = 30
      }
    }

    secret_properties {
      content_type = "application/x-pkcs12"
    }

    x509_certificate_properties {
      # Server Authentication = 1.3.6.1.5.5.7.3.1
      # Client Authentication = 1.3.6.1.5.5.7.3.2
      extended_key_usage = ["1.3.6.1.5.5.7.3.1"]

      key_usage = [
        "cRLSign",
        "dataEncipherment",
        "digitalSignature",
        "keyAgreement",
        "keyCertSign",
        "keyEncipherment",
      ]

      subject            = "CN=hello-world"
      validity_in_months = 12
    }
  }
}

# Application gateway
resource "azurerm_virtual_network" "vnet" {
  name                = "pipelnvnet"
  resource_group_name = azurerm_resource_group.rg.name
  location            = azurerm_resource_group.rg.location
  address_space       = ["192.168.0.0/16"]
}

resource "azurerm_subnet" "kubesubnet" {
  name                 = "kubesubnet"
  resource_group_name  = azurerm_resource_group.rg.name
  virtual_network_name = azurerm_virtual_network.vnet.name
  address_prefixes     = ["192.168.0.0/24"]
}

resource "azurerm_subnet" "appgwsubnet" {
  name                 = "appgwsubnet"
  resource_group_name  = azurerm_resource_group.rg.name
  virtual_network_name = azurerm_virtual_network.vnet.name
  address_prefixes     = ["192.168.1.0/24"]
}

resource "azurerm_public_ip" "ip" {
  name                = "pipelnpublicaddress"
  resource_group_name = azurerm_resource_group.rg.name
  location            = azurerm_resource_group.rg.location
  allocation_method   = "Static"
  sku                 = "Standard"
}

resource "azurerm_application_gateway" "appgw" {
  name                = "piplenbackendappgw"
  resource_group_name = azurerm_resource_group.rg.name
  location            = azurerm_resource_group.rg.location

  sku {
    name     = "Standard_v2"
    tier     = "Standard_v2"
    capacity = 2
  }

  identity {
    type         = "UserAssigned"
    identity_ids = [azurerm_user_assigned_identity.base.id]
  }

  ssl_certificate {
    key_vault_secret_id = azurerm_key_vault_certificate.tlscert.secret_id
    name                = "appgw-listener-cert"
  }

  gateway_ip_configuration {
    name      = "pipeln-gateway-ip-configuration"
    subnet_id = azurerm_subnet.appgwsubnet.id
  }

  frontend_port {
    name = "pipeln-feport"
    port = 80
  }

  frontend_port {
    name = "httpsPort"
    port = 443
  }

  frontend_ip_configuration {
    name                 = "pipeln-feip"
    public_ip_address_id = azurerm_public_ip.ip.id
  }

  backend_address_pool {
    name = "pipeln-beap"
  }

  backend_http_settings {
    name                  = "pipeln-httpsettings"
    cookie_based_affinity = "Disabled"
    port                  = 80
    protocol              = "Http"
    request_timeout       = 1
  }

  http_listener {
    name                           = "pipeln-http-listener"
    protocol                       = "Http"
    frontend_port_name             = "pipeln-feport"
    frontend_ip_configuration_name = "pipeln-feip"
  }

  request_routing_rule {
    name                       = "pipeln-request-routing-rule"
    rule_type                  = "Basic"
    http_listener_name         = "pipeln-http-listener"
    backend_address_pool_name  = "pipeln-beap"
    backend_http_settings_name = "pipeln-httpsettings"
  }
}

resource "azurerm_container_registry" "acr" {
  name                = "pipelnservicecontainers"
  resource_group_name = azurerm_resource_group.rg.name
  location            = azurerm_resource_group.rg.location
  sku                 = "Basic"
  admin_enabled       = true
}

output "acr_login_server" {
  value = azurerm_container_registry.acr.login_server
}

output "acr_login_username" {
  value     = azurerm_container_registry.acr.admin_username
  sensitive = true
}

output "acr_login_password" {
  value     = azurerm_container_registry.acr.admin_password
  sensitive = true
}

resource "azurerm_kubernetes_cluster" "aks" {
  name                = "pipelnservicecluster"
  location            = azurerm_resource_group.rg.location
  resource_group_name = azurerm_resource_group.rg.name
  dns_prefix          = "pipeln-k8s"

  # used to group all the internal objects of this cluster
  node_resource_group = "pipelnservicecluster-rg-node"

  default_node_pool {
    name           = "default"
    node_count     = 1
    vm_size        = "Standard_D2_v2"
    vnet_subnet_id = azurerm_subnet.kubesubnet.id
  }

  # Azure will assign the id automatically
  identity {
    type = "SystemAssigned"
  }

  ingress_application_gateway {
    gateway_id = azurerm_application_gateway.appgw.id
  }
}

output "aks_cluster_name" {
  value = azurerm_kubernetes_cluster.aks.name
}

resource "azurerm_role_assignment" "ara" {
  scope                            = azurerm_container_registry.acr.id
  role_definition_name             = "AcrPull"
  principal_id                     = azurerm_kubernetes_cluster.aks.kubelet_identity[0].object_id
  skip_service_principal_aad_check = true
}

resource "azurerm_role_assignment" "kubetogw" {
  scope                            = azurerm_application_gateway.appgw.id
  role_definition_name             = "Managed Identity Operator"
  principal_id                     = azurerm_kubernetes_cluster.aks.identity[0].principal_id
  skip_service_principal_aad_check = true
}
