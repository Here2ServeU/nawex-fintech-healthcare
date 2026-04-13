resource "aws_ecr_repository" "frontend" {
  name                 = "${var.project_name}-${var.environment}-frontend"
  image_tag_mutability = "MUTABLE"
}

resource "aws_ecr_repository" "api_node" {
  name                 = "${var.project_name}-${var.environment}-api-node"
  image_tag_mutability = "MUTABLE"
}

resource "aws_ecr_repository" "ai_service_python" {
  name                 = "${var.project_name}-${var.environment}-ai-service-python"
  image_tag_mutability = "MUTABLE"
}
