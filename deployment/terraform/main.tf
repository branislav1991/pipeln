terraform {
  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
      version = "2.87.0"
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

variable "location" { # Which location are we deploying to
  type = string
}

resource "azurerm_resource_group" "rg" {
  name     = "pipeln-rg-${var.location}"
  location = var.location
}

resource "azurerm_storage_account" "static_storage" {
  name                      = "pipelnstaticweb"
  resource_group_name       = azurerm_resource_group.rg.name
  location                  = azurerm_resource_group.rg.location
  account_kind              = "StorageV2"
  account_tier              = "Standard"
  account_replication_type  = "GRS"
  enable_https_traffic_only = true

  static_website {
    index_document = "index.html"
  }
}

output "storage_account_name" {
  value = azurerm_storage_account.static_storage.name
}
