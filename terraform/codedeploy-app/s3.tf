resource "aws_s3_bucket" "deploy-bucket" {
  bucket = "vit-microservice-demo-${var.app-name}-deployment"
}