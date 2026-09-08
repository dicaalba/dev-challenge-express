variable "aws_region" {
  description = "Región de AWS para el bucket S3."
  type        = string
  default     = "us-east-1"
}

variable "project_name" {
  description = "Nombre base del proyecto (usado para nombrar recursos)."
  type        = string
  default     = "dev-challenge-express"
}

variable "cloudfront_price_class" {
  description = "Clase de precio de CloudFront (PriceClass_100 es la más económica)."
  type        = string
  default     = "PriceClass_100"
}
