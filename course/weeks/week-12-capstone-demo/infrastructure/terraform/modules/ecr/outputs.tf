output "repository_urls" {
  value = {
    frontend          = aws_ecr_repository.frontend.repository_url
    api_node          = aws_ecr_repository.api_node.repository_url
    ai_service_python = aws_ecr_repository.ai_service_python.repository_url
  }
}
