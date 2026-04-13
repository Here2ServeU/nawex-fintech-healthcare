output "vpc_id" {
  value = module.network.vpc_id
}

output "public_subnet_ids" {
  value = module.network.public_subnet_ids
}

output "ec2_public_ip" {
  value = try(module.compute[0].public_ip, null)
}

output "eks_cluster_name" {
  value = try(module.eks[0].cluster_name, null)
}

output "ecr_repositories" {
  value = try(module.ecr[0].repository_urls, {})
}
