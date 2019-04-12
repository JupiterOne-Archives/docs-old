# AWS

## Overview

JupiterOne provides a managed integration with Amazon Web Services. The
integration connects directly to AWS APIs to obtain infrastructure metadata and
analyze resource relationships. Customers authorize read-only, security audit
access by establishing an IAM trust relationship that allows JupiterOne to
assume a role in their account.

Information is ingested from all AWS regions that do not require additional
contractual arrangements with AWS. Please submit a JupiterOne support request if
you need to monitor additional regions.

## Integration Instance Configuration

The integration is triggered by an event containing the information for a
specific integration instance.

The integration instance configuration requires the customer's `roleArn` to
assume in order to read infrastructure information through AWS APIs. The role is
configured to require an `externalId`; this also must be maintained in the
instance configuration.

Detailed setup instructions and a pre-built CloudFormation Stack are provided in
the application and maintained in the public [JupiterOne AWS CloudFormation][1]
project on Github.

[1]: https://github.com/jupiterone/jupiterone-aws-integration

## Permissions

The AWS integration requires security auditor permissions into the target AWS
account, as defined by a combination of the [SecurityAudit][2] IAM policy
managed by AWS, and a few additional `List*`, `Get*`, and `Describe*`
permissions missing from the AWS managed policy. The exact policy and permission
statements can be found in the public [JupiterOne AWS CloudFormation][1] project
on Github.

[2]: https://console.aws.amazon.com/iam/home#policies/arn:aws:iam::aws:policy/SecurityAudit

## Entities

The following entity resources and their meta data (not actual contents) are
ingested when the integration runs:

| AWS Service | AWS Entity Resource       | \_type : \_class of the Entity                              |
| ----------- | ------------------------- | ----------------------------------------------------------- |
| Account     | n/a                       | `aws_account` : `Account`                                   |
| ACM         | ACM Certificate           | `aws_acm_certificate` : `Certificate`                       |
| API Gateway | REST API                  | `aws_api_gateway_rest_api` : `Gateway`                      |
| CloudFront  | Distribution              | `aws_cloudfront_distribution`: `Gateway`                    |
| Config      | Config Rule               | `aws_config_rule` : `ControlPolicy`                         |
| DynamoDB    | DynamoDB Table            | `aws_dynamodb_table` : `DataStore`, `Database`              |
| EC2         | AMI Image                 | `aws_ami_image` : `Image`                                   |
|             | EC2 Instance              | `aws_instance` : `Host`                                     |
|             | EC2 Key Pair              | `aws_key_pair` : `AccessKey`                                |
|             | EBS Volume                | `aws_ebs_volume` : `DataStore`, `Disk`                      |
|             | Internet Gateway          | `aws_internet_gateway` : `Gateway`                          |
|             | Network ACL               | `aws_network_acl` : `Firewall`                              |
|             | Security Group            | `aws_security_group` : `Firewall`                           |
|             | VPC                       | `aws_vpc` : `Network`                                       |
|             | Subnet                    | `aws_subnet` : `Network`                                    |
| ELB         | Application Load Balancer | `aws_alb` : `Gateway`                                       |
|             | Network Load Balancer     | `aws_nlb` : `Gateway`                                       |
| GuardDuty   | GuardDuty Detector        | `aws_guardduty_detector` : `Assessment`, `Scanner`          |
|             | GuardDuty Finding         | `aws_guardduty_finding` : `Finding`                         |
| IAM         | Account Password Policy   | `aws_iam_account_password_policy` : `PasswordPolicy`        |
|             | IAM User                  | `aws_iam_user` : `User`                                     |
|             | IAM User Access Key       | `aws_iam_access_key` : `AccessKey`                          |
|             | IAM User MFA Device       | `mfa_device` : `AccessKey`                                  |
|             | IAM Group                 | `aws_iam_group` : `UserGroup`                               |
|             | IAM Role                  | `aws_iam_role` : `AccessRole`                               |
|             | IAM User Policy           | `aws_iam_user_policy` : `AccessPolicy`                      |
|             | IAM Group Policy          | `aws_iam_group_policy` : `AccessPolicy`                     |
|             | IAM Role Policy           | `aws_iam_role_policy` : `AccessPolicy`                      |
|             | IAM Managed Policy        | `aws_iam_policy` : `AccessPolicy`                           |
| Inspector   | Inspector Assessment Run  | `aws_inspector_assessment` : `Assessment`                   |
|             | Inspector Finding         | `aws_inspector_finding` : `Finding`                         |
| KMS         | KMS Key                   | `aws_kms_key` : `CryptoKey`                                 |
| Lambda      | Lambda Function           | `aws_lambda_function` : `Function`, `Workload`              |
| RedShift    | Redshift Cluster          | `aws_redshift_cluster` : `DataStore`, `Database`, `Cluster` |
| RDS         | RDS DB Cluster            | `aws_rds_cluster` : `DataStore`, `Database`, `Cluster`      |
|             | RDS DB Instance           | `aws_db_instance` : `DataStore`, `Database`, `Host`         |
| S3          | S3 Bucket                 | `aws_s3_bucket` : `DataStore`                               |
| Transfer    | Transfer Server (SFTP)    | `aws_transfer_server` : `Host`, `Gateway`                   |
|             | Transfer User (SFTP)      | `aws_transfer_user` : `User`                                |
| WAF         | Web ACL                   | `aws_waf_web_acl` : `Firewall`                              |

## Relationships

The following relationships are created/mapped:

### Basic relationships within the integration instance account/resources

|
| --
| `aws_account` **HAS** `aws_apigateway`
| `aws_account` **HAS** `aws`
| `aws_account` **HAS** `aws_iam`
| `aws_account` **HAS** `aws_lambda`
| `aws_account` **HAS** `aws_s3`
| `aws_account` **HAS** `aws_config`
| `aws_acm` **HAS** `aws_acm_certificate`
| `aws_apigateway` **HAS** `aws_api_gateway_rest_api`
| `aws_api_gateway_rest_api` **TRIGGERS** `aws_lambda_function`
| `aws_cloudfront` **HAS** `aws_cloudfront_distribution`
| `aws_cloudfront_distribution` **CONNECTS** `aws_api_gateway_rest_api`
| `aws_cloudfront_distribution` **CONNECTS** `aws_s3_bucket`
| `aws_cloudfront_distribution` **USES** `aws_acm_certificate`
| `aws_config` **HAS** `aws_config_rule`
| `aws_config_rule` **EVALUATES** `aws_account`
| `aws_config_rule` **EVALUATES** `aws_instance`
| `aws_config_rule` **EVALUATES** `aws_security_group`
| `aws_config_rule` **EVALUATES** `aws_ebs_volume`
| `aws_config_rule` **EVALUATES** `aws_iam_user`
| `aws_config_rule` **EVALUATES** `aws_iam_group`
| `aws_config_rule` **EVALUATES** `aws_iam_role`
| `aws_config_rule` **EVALUATES** `aws_s3_bucket`
| `aws_dynamodb` **HAS** `aws_dynamodb_table`
| `aws_dynamodb_table` **USES** `aws_kms_key`
| `aws_ec2` **HAS** `aws_instance`
| `aws_ec2` **HAS** `aws_security_group`
| `aws_ec2` **HAS** `aws_subnet`
| `aws_ec2` **HAS** `aws_ebs_volume`
| `aws_ec2` **HAS** `aws_network_acl`
| `aws_ec2` **HAS** `aws_vpc`
| `aws_instance` **USES** `aws_ebs_volume`
| `aws_ebs_volume` **USES** `aws_kms_key`
| `aws_security_group` **PROTECTS** `aws_instance`
| `aws_vpc` **CONTAINS** `aws_subnet`
| `aws_network_acl` **PROTECTS** `aws_subnet`
| `aws_elb` **HAS** `aws_alb`
| `aws_elb` **HAS** `aws_nlb`
| `aws_alb` **USES** `aws_acm_certificate`
| `aws_guardduty_detector` **IDENTIFIED** `aws_guardduty_finding`
| `aws_instance` **HAS** `aws_guardduty_finding`
| `aws_iam` **HAS** `aws_iam_managed_policy`
| `aws_iam` **HAS** `aws_iam_role`
| `aws_iam` **HAS** `aws_iam_role_policy`
| `aws_iam` **HAS** `aws_iam_user`
| `aws_iam` **HAS** `aws_iam_user_policy`
| `aws_iam` **HAS** `aws_iam_group`
| `aws_iam` **HAS** `aws_iam_group_policy`
| `aws_iam_group` **HAS** `aws_iam_group_policy`
| `aws_iam_group` **CONTAINS** `aws_iam_user`
| `aws_iam_group` **HAS** `aws_iam_managed_policy`
| `aws_iam_role` **HAS** `aws_iam_role_policy`
| `aws_iam_role` **HAS** `aws_iam_managed_policy`
| `aws_iam_user` **HAS** `aws_iam_managed_policy`
| `aws_iam_user` **HAS** `aws_iam_user_policy`
| `aws_inspector_assessment` **IDENTIFIED** `aws_inspector_finding`
| `aws_instance` **HAS** `aws_inspector_finding`
| `aws_lambda` **HAS** `aws_lambda_function`
| `aws_lambda_function` **HAS** `aws_iam_role`
| `aws_redshift` **HAS** `aws_redshift_cluster`
| `aws_vpc` **HAS** `aws_redshift_cluster`
| `aws_rds` **HAS** `aws_rds_cluster`
| `aws_rds` **HAS** `aws_db_instance`
| `aws_rds_cluster` **CONTAINS** `aws_db_instance`
| `aws_rds_cluster` **USES** `aws_kms_key`
| `aws_db_instance` **USES** `aws_kms_key`
| `aws_s3` **HAS** `aws_s3_bucket`
| `aws_s3_bucket` **USES** `aws_kms_key`
| `aws_transfer_server` **HAS** `aws_transfer_user`
| `aws_s3_bucket` **ALLOWS** `aws_transfer_user`
| `aws_iam_role` **ASSIGNED** `aws_transfer_server`
| `aws_iam_role` **ASSIGNED** `aws_transfer_user`
| `aws_waf` **HAS** `aws_waf_web_acl`
| `aws_waf_web_acl` **PROTECTS** `aws_cloudfront_distribution`

### Connections to broader entity resources

|
| --
| `aws_iam_user` **IS** `Person` <br> Note: This is mapped automatically only when the IAM user has an `Email` tag, or the `username` of the IAM User is an email that matches that of a Person entity in the graph.

### Advanced mappings

The AWS integration performs analysis of security group rules, IAM policies, and
assume role trust policies to determine the following mapping:

|
| --
| `aws_iam_role` **TRUSTS** `aws_iam_user|aws_<service>` (within the same account)
| `aws_iam_role` **TRUSTS** `aws_iam_role|aws_iam_user|aws_account` (cross-account)

### ProTips and Best Practices

- Tag your resources with the following tags:

  - `Classification`
  - `Owner`
  - `PII` or `PHI` or `PCI` (`boolean` to indicate data type)

- Use email address as the `username` for your **IAM Users**, or tag them with
  `Email` tag, so that they can be automatically mapped to a `Person` (i.e.
  `employee`) entity.

- Configure tagging as part of your integration configuration (in JupiterOne),
  under Advanced Options, to tag the

  - `AccountName` and
  - `Production` flag, if applicable.

- Configure your integration name to be the same as your AWS account alias.
