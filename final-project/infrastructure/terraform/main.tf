module "network" {
  source = "./modules/network"

  aws_region          = var.aws_region
  project_name        = var.project_name
  environment         = var.environment
  vpc_cidr            = var.vpc_cidr
  public_subnet_cidrs = var.public_subnet_cidrs
}

module "compute" {
  count  = var.enable_ec2_lab ? 1 : 0
  source = "./modules/compute"

  project_name      = var.project_name
  environment       = var.environment
  vpc_id            = module.network.vpc_id
  public_subnet_id  = module.network.public_subnet_ids[0]
  instance_type     = var.ec2_instance_type
  allowed_ssh_cidrs = var.allowed_ssh_cidrs
}

module "eks" {
  count  = var.enable_eks_lab ? 1 : 0
  source = "./modules/eks"

  project_name       = var.project_name
  environment        = var.environment
  vpc_id             = module.network.vpc_id
  public_subnet_ids  = module.network.public_subnet_ids
  kubernetes_version = var.kubernetes_version
}

module "ecr" {
  count  = var.enable_ecr ? 1 : 0
  source = "./modules/ecr"

  project_name = var.project_name
  environment  = var.environment
}
