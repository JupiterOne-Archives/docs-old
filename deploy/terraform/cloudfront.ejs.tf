resource "random_id" "cloudfront_authentication_user_agent" {
  byte_length = 4
  prefix = "cf_user_agent_"
}

locals {
  origin_id = "docs-origin-id"
}

data "aws_acm_certificate" "docs" {
  provider = "aws.target.us-east-1"
  domain = "${ var.docs_acm_certificate_domain }"
  statuses = ["ISSUED"]
  most_recent = true
}

resource "aws_cloudfront_origin_access_identity" "site_s3_origin_access_identity" {
  comment="docs s3 origin access identity"
}

resource "aws_cloudfront_distribution" "docs" {
  origin {
    domain_name = "${aws_s3_bucket.docs_redirect.website_endpoint}"
    origin_id = "${local.origin_id}"

    # Avoid s3_origin_config for better index.html handling
    # reference: https://github.com/terraform-providers/terraform-provider-aws/issues/4757
    #
    # s3_origin_config {
    #   origin_access_identity = "${aws_cloudfront_origin_access_identity.site_s3_origin_access_identity.cloudfront_access_identity_path}"
    # }

    custom_origin_config {
      http_port              = "80"
      https_port             = "443"
      origin_protocol_policy = "http-only"
      origin_ssl_protocols   = ["TLSv1.2"]
    }

    custom_header {
      name  = "User-Agent"
      value = "${random_id.cloudfront_authentication_user_agent.hex}"
    }
  }

  aliases = [
    "${var.docs_domain}"

  ]

  enabled = true
  is_ipv6_enabled = true
  comment = "A distribution for ${aws_s3_bucket.docs_redirect.website_endpoint}"

  default_cache_behavior {
    allowed_methods = ["GET", "HEAD", "OPTIONS"]
    cached_methods = ["GET", "HEAD"]
    target_origin_id = "${local.origin_id}"

    forwarded_values {
      query_string = false

      cookies {
        forward = "none"
      }
    }

    compress               = true
    viewer_protocol_policy = "redirect-to-https"
    min_ttl                = "${var.aws_cloudfront_distribution_min_ttl}"
    default_ttl            = "${var.aws_cloudfront_distribution_default_ttl}"
    max_ttl                = "${var.aws_cloudfront_distribution_max_ttl}"
  }

  price_class = "PriceClass_100"

  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }

  viewer_certificate {
    acm_certificate_arn = "${data.aws_acm_certificate.docs.arn}"
    ssl_support_method = "sni-only"
    minimum_protocol_version = "TLSv1.2_2018"
  }

  tags {
    Environment = "${var.target_name}"
    Project = "${var.lifeomic_project}"
  }
}
