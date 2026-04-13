variable "aws_region" {
  description = "AWS region"
  type        = string
  default     = "us-east-1"
}

variable "project_name" {
  description = "Project name prefix"
  type        = string
  default     = "nerp"
}

variable "environment" {
  description = "Deployment environment"
  type        = string
  default     = "dev"
}

variable "vpc_cidr" {
  description = "CIDR block for the VPC"
  type        = string
  default     = "10.42.0.0/16"
}

variable "public_subnet_cidrs" {
  description = "CIDRs for public subnets"
  type        = list(string)
  default     = ["10.42.1.0/24", "10.42.2.0/24"]
}

variable "allowed_ssh_cidrs" {
  description = "CIDRs allowed to SSH into the week-4 EC2 lab instance"
  type        = list(string)
  default     = ["0.0.0.0/0"]
}

variable "ec2_instance_type" {
  description = "EC2 instance type for the week-4 lab"
  type        = string
  default     = "t3.micro"
}

variable "kubernetes_version" {
  description = "Target EKS Kubernetes version"
  type        = string
  default     = "1.29"
}

variable "enable_ec2_lab" {
  description = "Enable week-4 EC2 lab resources"
  type        = bool
  default     = true
}

variable "enable_eks_lab" {
  description = "Enable week-9 EKS lab resources"
  type        = bool
  default     = false
}

variable "enable_ecr" {
  description = "Enable ECR repositories for container images"
  type        = bool
  default     = true
}
