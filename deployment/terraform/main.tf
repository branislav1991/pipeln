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
  features {}
}

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
    name       = "default"
    node_count = 1
    vm_size    = "Standard_D2_v2"
  }

  # Azure will assign the id automatically
  identity {
    type = "SystemAssigned"
  }

  ingress_application_gateway {
    gateway_name = "pipelnservicecluster-AGIC"
    subnet_cidr  = "10.225.0.0/16"
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
