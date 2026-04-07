terraform {
  required_version = ">= 1.5.0"
}

module "network" {
  source = "./modules/network"
}

module "kafka" {
  source = "./modules/kafka"
}

module "mongodb" {
  source = "./modules/mongodb"
}

module "opensearch" {
  source = "./modules/opensearch"
}
