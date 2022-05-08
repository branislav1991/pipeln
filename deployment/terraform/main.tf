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

provider "helm" {
  kubernetes {
    host                   = azurerm_kubernetes_cluster.aks.kube_config.0.host
    client_key             = base64decode(azurerm_kubernetes_cluster.aks.kube_config.0.client_key)
    client_certificate     = base64decode(azurerm_kubernetes_cluster.aks.kube_config.0.client_certificate)
    cluster_ca_certificate = base64decode(azurerm_kubernetes_cluster.aks.kube_config.0.cluster_ca_certificate)
  }
}

resource "helm_release" "nginx_ingress" {
  name       = "nginxingress"
  repository = "https://kubernetes.github.io/ingress-nginx"
  chart      = "ingress-nginx"
  namespace  = "ingress-basic"

  set {
    name  = "controller.service.annotations.service\\.beta\\.kubernetes\\.io/azure-load-balancer-health-probe-request-path"
    value = "/healthz"
  }
}
