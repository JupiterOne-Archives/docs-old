resource "aws_s3_bucket" "docs_redirect" {
  bucket = "${var.s3_redirect_bucket_name}"
  acl    = "public-read"

  website {
    redirect_all_requests_to = "https://support.jupiterone.io/hc/en-us"
  }
}