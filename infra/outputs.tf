output "bucket_name" {
  description = "Nombre del bucket S3 donde subir el contenido de dist/."
  value       = aws_s3_bucket.site.bucket
}

output "cloudfront_domain" {
  description = "Dominio público de CloudFront para acceder a la app."
  value       = aws_cloudfront_distribution.site.domain_name
}

output "cloudfront_distribution_id" {
  description = "ID de la distribución (útil para invalidar la caché tras un deploy)."
  value       = aws_cloudfront_distribution.site.id
}

output "deploy_hint" {
  description = "Comandos sugeridos para subir el build y refrescar la caché."
  value       = <<-EOT
    npm run build
    aws s3 sync ../dist s3://${aws_s3_bucket.site.bucket} --delete
    aws cloudfront create-invalidation \
      --distribution-id ${aws_cloudfront_distribution.site.id} \
      --paths "/*"
  EOT
}
