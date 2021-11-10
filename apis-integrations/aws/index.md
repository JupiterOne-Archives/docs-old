# Integration with JupiterOne

## AWS + JupiterOne Integration Benefits

- Visualize AWS cloud resources across several services in the JupiterOne graph.
- Map AWS users to employees in your JupiterOne account.
- Monitor visibility and governance of your AWS cloud environment by leveraging
  hundreds of out of the box queries.
- Monitor compliance against the AWS CIS Framework and other security benchmarks
  using the JupiterOne compliance app.
- Monitor AWS vulnerabilities and findings from multiple services within the
  alerts app.
- Monitor changes to your AWS cloud resources using multiple JupiterOne alert
  rule packs specific to AWS.
- Monitor several out of the box dashboards of your security across AWS
  services.
- Create automated workflows in JupiterOne alerts using SNS & SQS to remediate
  configuration gaps in AWS.

## How it Works

- JupiterOne periodically fetches users and cloud resources from AWS to update
  the graph.
- Enable CloudTrail event delivery through EventBridge to capture additional
  details on supported entities. See the setup guide
  [AWS CloudTrail Event Streaming](https://support.jupiterone.io/hc/en-us/articles/360051794213-AWS-CloudTrail-Event-Streaming).
- Enable configuration of AWS accounts through Organizations and ingest
  Organization specific data. See the setup guide
  [AWS Organizations](https://support.jupiterone.io/hc/en-us/articles/1500005364921-AWS-Organizations).
- Write JupiterOne queries to review and monitor updates to the graph, or
  leverage existing queries.
- Configure alerts to take action when the JupiterOne graph changes, or leverage
  existing alerts.

!!! note

    Information is ingested from all AWS regions that do not require additional
    contractual arrangements with AWS. Please submit a JupiterOne support request if
    you need to monitor additional regions.

## Requirements

- JupiterOne provides a policy statement that defines the needed AWS
  permissions. An AWS IAM Role must be configured for JupiterOne that allows
  reading configuration details of supported resources. The Role must be
  configured to include an External ID provided by JupiterOne.
- You must have permission in JupiterOne to install new integrations.

## Support

If you need help with this integration, please contact
[JupiterOne Support](https://support.jupiterone.io).

## Integration Walkthrough

The integration instance configuration requires the customer's `roleArn` to
assume in order to read infrastructure information through AWS APIs. The role is
configured to require an `externalId`; this also must be maintained in the
instance configuration.

### In AWS

1. Detailed setup instructions and a pre-built CloudFormation Stack are provided
   in the application and maintained in the public [JupiterOne AWS
   CloudFormation][1] project on Github. Follow the steps under **In
   JupiterOne** to capture the auto-generated **External ID** specific to the
   integration instance.

[1]: https://github.com/jupiterone/jupiterone-aws-integration

### In JupiterOne

1. From the configuration **Gear Icon**, select **Integrations**.
2. Scroll to the **AWS** integration tile and click it.
3. Click the **Add Configuration** button and configure the following settings:

- Enter the **Account Name** by which you'd like to identify this AWS account in
  JupiterOne. Ingested entities will have this value stored in `tag.AccountName`
  when **Tag with Account Name** is checked.
- Enter a **Description** that will further assist your team when identifying
  the integration instance.
- Select a **Polling Interval** that you feel is sufficient for your monitoring
  needs. You may leave this as `DISABLED` and manually execute the integration.
- Enter the **Role ARN** of the IAM role to assume in order to authenticate with
  AWS.

4. Click **Create Configuration** once all values are provided.

### Permissions

The AWS integration requires security auditor permissions into the target AWS
account, as defined by a combination of the [SecurityAudit][2] IAM policy
managed by AWS, and a few additional `List*`, `Get*`, and `Describe*`
permissions missing from the AWS managed policy. The exact policy and permission
statements can be found in the public [JupiterOne AWS CloudFormation][1] project
on Github.

[2]:
  https://console.aws.amazon.com/iam/home#policies/arn:aws:iam::aws:policy/SecurityAudit

## How to Uninstall

1. From the configuration **Gear Icon**, select **Integrations**.
2. Scroll to the **AWS** integration tile and click it.
3. Identify and click the **integration to delete**.
4. Click the **trash can** icon.
5. Click the **Remove** button to delete the integration.

## Data Model

### Entities

The following entity resources and their meta data (not actual contents) are
ingested when the integration runs:

| AWS Service     | AWS Entity Resource       | \_type : \_class of the Entity                                           |
| --------------- | ------------------------- | ------------------------------------------------------------------------ |
| Account         | n/a                       | `aws_account` : `Account`                                                |
| ACM             | ACM Certificate           | `aws_acm_certificate` : `Certificate`                                    |
| API Gateway     | REST API                  | `aws_api_gateway_rest_api` : `Gateway`                                   |
| API Gateway V2  | API                       | `aws_api_gateway_v2_api` : `Gateway`                                     |
|                 | Route                     | `aws_api_gateway_v2_route` : `ApplicationEndpoint`                       |
|                 | Authorizer                | `aws_api_gateway_v2_integration` : `Configuration`                       |
|                 | Integration               | `aws_api_gateway_v2_authorizer` : `Configuration`                        |
| Batch           | Batch Compute Environment | `aws_batch_compute_environment` : `Configuration`                        |
|                 | Batch Job                 | `aws_batch_job` : `Process`, `Task`                                      |
|                 | Batch Job Definition      | `aws_batch_job_definition` : `Configuration`, `Function`                 |
|                 | Batch Job Queue           | `aws_batch_job_queue` : `Queue`                                          |
| CloudFormation  | Stack                     | `aws_cloudformation_stack`: `Configuration`                              |
| CloudFront      | Distribution              | `aws_cloudfront_distribution`: `Gateway`                                 |
|                 |                           | `aws_cloudfront_distribution_origin` : `Configuration`                   |
| CloudWatch      | Event Rule                | `aws_cloudwatch_event_rule` : `Task`                                     |
|                 | Metric Alarm              | `aws_cloudwatch_metric_alarm` : `Monitor`                                |
|                 | Log Group                 | `aws_cloudwatch_log_group` : `Logs`                                      |
| Config          | Config Rule               | `aws_config_rule` : `ControlPolicy`                                      |
| DynamoDB        | DynamoDB Table            | `aws_dynamodb_table` : `DataStore`, `Database`                           |
| EC2             | AMI Image                 | `aws_ami` : `Image`                                                      |
|                 | EC2 Instance              | `aws_instance` : `Host`                                                  |
|                 | EC2 Key Pair              | `aws_key_pair` : `AccessKey`                                             |
|                 | EBS Volume                | `aws_ebs_volume` : `DataStore`, `Disk`                                   |
|                 | EBS Volume Snapshot       | `aws_ebs_snapshot` : `DataStore`, `Disk`, `Image`                        |
|                 | Elastic IP                | `aws_eip` : `IpAddress`                                                  |
|                 | Internet Gateway          | `aws_internet_gateway` : `Gateway`                                       |
|                 | NAT Gateway               | `aws_nat_gateway` : `Gateway`                                            |
|                 | Network ACL               | `aws_network_acl` : `Firewall`                                           |
|                 | Network Interface         | `aws_eni` : `NetworkInterface`                                           |
|                 | Route Table               | `aws_route_table` : `Configuration`                                      |
|                 | Security Group            | `aws_security_group` : `Firewall`                                        |
|                 | Subnet                    | `aws_subnet` : `Network`                                                 |
|                 | VPC                       | `aws_vpc` : `Network`                                                    |
|                 | VPN Gateway               | `aws_vpn_gateway` : `Gateway`                                            |
| AutoScaling     | Auto Scaling Group        | `aws_autoscaling_group` : `Deployment`, `Group`                          |
| ECR             | ECR Container Repository  | `aws_ecr_repository` : `Repository`                                      |
|                 | ECR Container Image       | `aws_ecr_image` : `Image`                                                |
|                 | ECR Image Scan Finding    | `aws_ecr_image_scan_finding` : `Finding`                                 |
| ECS             | ECS Cluster               | `aws_ecs_cluster` : `Cluster`                                            |
|                 | ECS Container Instance    | `aws_ecs_container_instance` : `Host`, `Container`                       |
|                 | ECS Service               | `aws_ecs_service` : `Service`                                            |
|                 | ECS Task Definition       | `aws_ecs_task_definition` : `Function`, `Configuration`                  |
|                 | ECS Task                  | `aws_ecs_task` : `Task`, `Process`                                       |
| EFS             | EFS File System           | `aws_efs_file_system` : `DataStore`                                      |
|                 | EFS Mount Target          | `aws_efs_mount_target` : `NetworkEndpoint`                               |
| EKS             | EKS Cluster               | `aws_eks_cluster` : `Cluster`                                            |
| ELB             | Application Load Balancer | `aws_alb` : `Gateway`                                                    |
|                 | Network Load Balancer     | `aws_nlb` : `Gateway`                                                    |
|                 | Classic Load Balancer     | `aws_elb` : `Gateway`                                                    |
|                 | Target Group              | `aws_lb_target_group` : `Group`                                          |
|                 | Listener                  | `aws_lb_listener` : `ApplicationEndpoint`                                |
|                 | ListenerRule              | `aws_lb_listener_rule` : `Rule`                                          |
| ElastiCache     | Cache Cluster (Memcached) | `aws_elasticache_memcached_cluster` : `Database`, `DataStore`, `Cluster` |
|                 | Replication Group (Redis) | `aws_elasticache_redis_cluster` : `Database`, `DataStore`, `Cluster`     |
|                 | Node Group Member         | `aws_elasticache_cluster_node` : `Database`, `DataStore`, `Host`         |
| Elasticsearch   | Elasticsearch Domain      | `aws_elasticsearch_domain` : `Database`, `DataStore`, `Cluster`          |
| GuardDuty       | GuardDuty Detector        | `aws_guardduty_detector` : `Assessment`, `Scanner`                       |
|                 | GuardDuty Finding         | `aws_guardduty_finding` : `Finding`                                      |
| IAM             | Account Password Policy   | `aws_iam_account_password_policy` : `PasswordPolicy`                     |
|                 | IAM User                  | `aws_iam_user` : `User`                                                  |
|                 | IAM User Access Key       | `aws_iam_access_key` : `AccessKey`                                       |
|                 | IAM User MFA Device       | `mfa_device` : `AccessKey`                                               |
|                 | IAM Group                 | `aws_iam_group` : `UserGroup`                                            |
|                 | IAM Role                  | `aws_iam_role` : `AccessRole`                                            |
|                 | IAM User Policy           | `aws_iam_user_policy` : `AccessPolicy`                                   |
|                 | IAM Group Policy          | `aws_iam_group_policy` : `AccessPolicy`                                  |
|                 | IAM Role Policy           | `aws_iam_role_policy` : `AccessPolicy`                                   |
|                 | IAM Managed Policy        | `aws_iam_policy` : `AccessPolicy`                                        |
|                 | IAM SAML Provider         | `aws_iam_saml_provider` : `Service`                                      |
| Access Analyzer | Access Analyzer           | `aws_accessanalyzer_analyzer` : `Accessment`, `Scanner`                  |
|                 | Access Analyzer Finding   | `aws_accessanalyzer_finding` : `Finding`                                 |
| Inspector       | Inspector Assessment Run  | `aws_inspector_assessment` : `Assessment`                                |
|                 | Inspector Finding         | `aws_inspector_finding` : `Finding`                                      |
| KMS             | KMS Key                   | `aws_kms_key` : `CryptoKey`                                              |
| Lambda          | Lambda Function           | `aws_lambda_function` : `Function`                                       |
| RedShift        | Redshift Cluster          | `aws_redshift_cluster` : `DataStore`, `Database`, `Cluster`              |
| RDS             | RDS DB Cluster            | `aws_rds_cluster` : `DataStore`, `Database`, `Cluster`                   |
|                 | RDS DB Instance           | `aws_db_instance` : `DataStore`, `Database`, `Host`                      |
|                 | RDS DB Instance Snapshot  | `aws_db_snapshot` : `DataStore`, `Database`, `Image`                     |
|                 | RDS DB Cluster Snapshot   | `aws_db_cluster_snapshot` : `DataStore`, `Database`, `Image`             |
| Route53         | Route53 Domain            | `aws_route53_domain` : `Domain`                                          |
|                 | Route53 Hosted Zone       | `aws_route53_zone` : `DomainZone`                                        |
|                 | Route53 RecordSet         | `aws_route53_record` : `DomainRecord`,                                   |
| S3              | S3 Bucket                 | `aws_s3_bucket` : `DataStore`                                            |
|                 | S3 Bucket Policy          | `aws_s3_bucket_policy` : `AccessPolicy`                                  |
| SNS             | SNS Subscription          | `aws_sns_subscription` : `Subscription`                                  |
|                 | SNS Topic                 | `aws_sns_topic` : `Channel`                                              |
| SQS             | SQS Queue                 | `aws_sqs_queue` : `Queue`                                                |
| Transfer        | Transfer Server (SFTP)    | `aws_transfer_server` : `Host`, `Gateway`                                |
|                 | Transfer User (SFTP)      | `aws_transfer_user` : `User`                                             |
| WAF             | Web ACL                   | `aws_waf_web_acl` : `Firewall`                                           |
| WAF V2          | Web ACL                   | `aws_waf_v2_web_acl` : `Firewall`                                        |
| WorkSpaces      | Workspace                 | `aws_workspace` : `Host`                                                 |
|                 | Bundle                    | `aws_workspaces_bundle` : `Configuration`                                |

### Relationships

The following relationships are created/mapped:

#### Basic relationships within the integration instance account/resources

| Relationships                                                              |
| -------------------------------------------------------------------------- |
| `aws_account` (master) **HAS** `aws_account` (sub-account)                 |
| `aws_account` **HAS** `Service` (e.g. `aws_ec2`, `aws_iam`, ...)           |
| `aws_acm` **HAS** `aws_acm_certificate`                                    |
| `aws_batch` **HAS** `aws_batch_compute_environment`                        |
| `aws_batch` **HAS** `aws_batch_job_definition`                             |
| `aws_batch` **HAS** `aws_batch_job_queue`                                  |
| `aws_batch_compute_environment` **USES** `aws_ecs_cluster`                 |
| `aws_batch_compute_environment` **ASSIGNED**\|**USES** `aws_iam_role`      |
| `aws_batch_job_queue` **HAS** `aws_batch_job`                              |
| `aws_apigateway` **HAS** `aws_api_gateway_rest_api`                        |
| `aws_api_gateway_rest_api` **TRIGGERS** `aws_lambda_function`              |
| `aws_api_gateway_v2_api` **HAS** `aws_api_gateway_v2_route`                |
| `aws_api_gateway_v2_route` **HAS** `aws_api_gateway_v2_integration`        |
| `aws_api_gateway_v2_route` **HAS** `aws_api_gateway_v2_authorizer`         |
| `aws_api_gateway_v2_integration` **CONNECTS** `resource`                   |
| `aws_api_gateway_v2_authorizer` **CONNECTS** `resource`                    |
| `aws_cloudfront` **HAS** `aws_cloudfront_distribution`                     |
| `aws_cloudfront_distribution` **CONNECTS** `aws_api_gateway_rest_api`      |
| `aws_cloudfront_distribution` **CONNECTS** `aws_s3_bucket`                 |
| `aws_cloudfront_distribution` **TRIGGERS** `aws_lambda_function`           |
| `aws_cloudfront_distribution` **USES** `aws_acm_certificate`               |
| `aws_cloudfront_distribution` **HAS** `aws_cloudfront_distribution_origin` |
| `aws_cloudtrail` **LOGS** `aws_s3_bucket`                                  |
| `aws_cloudtrail` **LOGS** `aws_cloudwatch_log_group`                       |
| `aws_cloudwatch_event_rule` **TRIGGERS** `aws_lambda_function`             |
| `aws_config` **HAS** `aws_config_rule`                                     |
| `aws_config_rule` **EVALUATES** `aws_account`                              |
| `aws_config_rule` **EVALUATES** `<AWS Resource>`                           |
| `aws_dynamodb` **HAS** `aws_dynamodb_table`                                |
| `aws_dynamodb_table` **USES** `aws_kms_key`                                |
| `aws_ec2` **HAS** `aws_instance`                                           |
| `aws_ec2` **HAS** `aws_subnet`                                             |
| `aws_ec2` **HAS** `aws_ebs_volume`                                         |
| `aws_ec2` **HAS** `aws_network_acl`                                        |
| `aws_ec2` **HAS** `aws_vpc`                                                |
| `aws_autoscaling_group` **HAS** `aws_instance`                             |
| `aws_instance` **USES** `aws_ebs_volume`                                   |
| `aws_instance` **USES** `aws_eip`                                          |
| `aws_instance` **USES** `aws_eni`                                          |
| `aws_ebs_volume` **HAS** `aws_ebs_snapshot`                                |
| `aws_ebs_volume` **USES** `aws_ebs_snapshot`                               |
| `aws_ebs_volume` **USES** `aws_kms_key`                                    |
| `aws_instance` **HAS** `aws_security_group`                                |
| `aws_nat_gateway` **USES** `aws_eni` or `aws_eip`                          |
| `aws_eni` **USES** `aws_eip`                                               |
| `aws_vpc` **CONTAINS** `aws_subnet`                                        |
| `aws_vpc` **HAS** `aws_nat_gateway`                                        |
| `aws_vpc` **HAS** `aws_internet_gateway`                                   |
| `aws_vpc` **HAS** `aws_vpn_gateway`                                        |
| `aws_vpc` **HAS** `aws_route_table`                                        |
| `aws_vpc` **LOGS** `aws_cloudwatch_log_group`                              |
| `aws_vpc` **LOGS** `aws_s3_bucket`                                         |
| `aws_subnet` **HAS** `aws_instance`                                        |
| `aws_subnet` **USES** `aws_route_table`                                    |
| `aws_network_acl` **PROTECTS** `aws_subnet`                                |
| `aws_ecr` **HAS** `aws_ecr_repository`                                     |
| `aws_ecr_repository` **HAS** `aws_ecr_image`                               |
| `aws_ecr_image` **HAS** `aws_ecr_image_scan_finding`                       |
| `aws_ecs` **HAS** `aws_ecs_cluster`                                        |
| `aws_ecs` **HAS** `aws_ecs_task_definition`                                |
| `aws_ecs_cluster` **HAS** `aws_ecs_service`                                |
| `aws_ecs_cluster` **HAS** `aws_ecs_container_instance`                     |
| `aws_ecs_cluster` **RUNS** `aws_ecs_task`                                  |
| `aws_ecs_container_instance` **RUNS** `aws_ecs_task`                       |
| `aws_ecs_task_definition` **ASSIGNED**\|**USES** `aws_iam_role`            |
| `aws_ecs_task_definition` **DEFINES** `aws_ecs_service`                    |
| `aws_ecs_task_definition` **DEFINES** `aws_ecs_task`                       |
| `aws_ecs_service` **TRIGGERS** `aws_ecs_task`                              |
| `aws_instance` **RUNS** `aws_ecs_container_instance`                       |
| `aws_efs` **HAS** `aws_efs_file_system`                                    |
| `aws_efs_file_system` **HAS** `aws_efs_mount_point`                        |
| `aws_efs_mount_point` **USES** `aws_eni`                                   |
| `aws_subnet` **HAS** `aws_efs_mount_point`                                 |
| `aws_eks` **HAS** `aws_eks_cluster`                                        |
| `aws_elasticloadbalancing` **HAS** `aws_alb` or `aws_nlb` or `aws_elb`     |
| `aws_elasticache_redis_cluster` **HAS** `aws_elasticache_cluster_node`     |
| `aws_alb` **USES** `aws_acm_certificate`                                   |
| `aws_alb` or `aws_nlb` **CONNECTS** `aws_lb_target_group`                  |
| `aws_alb` or `aws_nlb` **CONNECTS** `aws_lb_listener`                      |
| `aws_elb` **CONNECTS** `aws_instance`                                      |
| `aws_lb_target_group` **HAS** `aws_instance` or `aws_lambda_function`      |
| `aws_lb_target_group` **HAS** `aws_eip` or `aws_eni`                       |
| `aws_lb_listener` **HAS** `aws_lb_listener_rule`                           |
| `aws_guardduty_detector` **IDENTIFIED** `aws_guardduty_finding`            |
| `aws_instance` **HAS** `aws_guardduty_finding`                             |
| `aws_iam` **HAS** `aws_iam_policy`                                         |
| `aws_iam` **HAS** `aws_iam_role`                                           |
| `aws_iam` **HAS** `aws_iam_role_policy`                                    |
| `aws_iam` **HAS** `aws_iam_user`                                           |
| `aws_iam` **HAS** `aws_iam_user_policy`                                    |
| `aws_iam` **HAS** `aws_iam_group`                                          |
| `aws_iam` **HAS** `aws_iam_group_policy`                                   |
| `aws_iam_group` **HAS** `aws_iam_group_policy`                             |
| `aws_iam_group` **CONTAINS** `aws_iam_user`                                |
| `aws_iam_group` **HAS** `aws_iam_policy`                                   |
| `aws_iam_role` **HAS** `aws_iam_role_policy`                               |
| `aws_iam_role` **HAS** `aws_iam_policy`                                    |
| `aws_iam_user` **HAS** `aws_iam_policy`                                    |
| `aws_iam_user` **HAS** `aws_iam_user_policy`                               |
| `aws_accessanalyzer_analyzer` **IDENTIFIED** `aws_accessanalyzer_finding`  |
| `aws_inspector_assessment` **IDENTIFIED** `aws_inspector_finding`          |
| `aws_instance` **HAS** `aws_inspector_finding`                             |
| `aws_lambda` **HAS** `aws_lambda_function`                                 |
| `aws_lambda_function` **HAS** `aws_iam_role`                               |
| `aws_lambda_function` **HAS** `aws_vpc`                                    |
| `aws_redshift` **HAS** `aws_redshift_cluster`                              |
| `aws_vpc` **HAS** `aws_redshift_cluster`                                   |
| `aws_rds` **HAS** `aws_rds_cluster`                                        |
| `aws_rds` **HAS** `aws_db_instance`                                        |
| `aws_rds_cluster` **CONTAINS** `aws_db_instance`                           |
| `aws_rds_cluster` **USES** `aws_kms_key`                                   |
| `aws_rds_cluster` **CONTAINS** `aws_db_cluster_snapshot`                   |
| `aws_db_instance` **CONTAINS** `aws_db_snapshot`                           |
| `aws_route53` **HAS** `aws_route53_domain`                                 |
| `aws_route53` **HAS** `aws_route53_zone`                                   |
| `aws_route53_zone` **HAS** `aws_route53_record`                            |
| `aws_db_instance` **USES** `aws_kms_key`                                   |
| `aws_s3` **HAS** `aws_s3_bucket`                                           |
| `aws_s3_bucket` **USES** `aws_kms_key`                                     |
| `aws_s3_bucket` **HAS** `aws_s3_bucket_policy`                             |
| `aws_security_group` **PROTECTS** `resource`                               |
| `aws_ec2` **HAS** `aws_security_group`                                     |
| `aws_efs_mount_target` **HAS** `aws_security_group`                        |
| `aws_eks_cluster` **HAS** `aws_security_group`                             |
| `aws_elasticache_cluster` **HAS** `aws_security_group`                     |
| `aws_elasticsearch_domain` **HAS** `aws_security_group`                    |
| `aws_elb` **HAS** `aws_security_group`                                     |
| `aws_nlb` **HAS** `aws_security_group`                                     |
| `aws_alb` **HAS** `aws_security_group`                                     |
| `aws_lb` **HAS** `aws_security_group`                                      |
| `aws_hsm` **HAS** `aws_security_group`                                     |
| `aws_instance` **HAS** `aws_security_group`                                |
| `aws_lambda_function` **HAS** `aws_security_group`                         |
| `aws_rds_cluster` **HAS** `aws_security_group`                             |
| `aws_db_resource` **HAS** `aws_security_group`                             |
| `aws_redshift_cluster` **HAS** `aws_security_group`                        |
| `aws_sns_topic` **HAS** `aws_sns_subscription`                             |
| `aws_transfer_server` **HAS** `aws_transfer_user`                          |
| `aws_s3_bucket` **ALLOWS** `aws_transfer_user`                             |
| `aws_iam_role` **ASSIGNED** `aws_transfer_server`                          |
| `aws_iam_role` **ASSIGNED** `aws_transfer_user`                            |
| `aws_waf` **HAS** `aws_waf_web_acl`                                        |
| `aws_waf_v2` **HAS** `aws_waf_v2_web_acl`                                  |
| `aws_waf_v2_web_acl` **PROTECTS** `resource`                               |
| `aws_waf_web_acl` **PROTECTS** `aws_cloudfront_distribution`               |
| `aws_workspace` **USES** `aws_workspaces_bundle`                           |
| `aws_subnet` **HAS** `aws_workspace`                                       |

### Mapped Relationships - connections to broader entity resources

| Relationships                                              |
| ---------------------------------------------------------- |
| `aws_iam_user` **IS** `Person` _See Note 1_                |
| `aws_route53_record` **CONNECTS** `Host` or `Gateway`      |
| `Domain` **HAS** `aws_route53_zone` _See Note 2_           |
| `aws_vpc` **CONNECTS** `aws_vpc` (VPC Peering Connections) |

!!! note

    1. This is mapped automatically only when the IAM user has an `Email`
       tag, or the `username` of the IAM User is an email that matches that of a
       `Person` entity in the graph.

    2. `Domain` entities include domains registered on AWS Route53 (i.e.
       `aws_route53_domain`) and those registered outside of AWS and added into
       JupiterOne separately (e.g. a domain registered on GoDaddy).

### Advanced mappings

The AWS integration performs analysis of security group rules, IAM policies, and
assume role trust policies to determine the following mapping:

| Relationships                                                                               |
| ------------------------------------------------------------------------------------------- |
| `aws_iam_role` **TRUSTS** `aws_iam_user` or `aws_<service>` (within the same account)       |
| `aws_iam_role` **TRUSTS** `aws_iam_role` or `aws_iam_user` or `aws_account` (cross-account) |
| `aws_iam_policy` **ALLOWS** `<Resource>` _See notes below_                                  |

!!! note

    This creates permission relationships from an IAM policy -- including
    both managed policies (i.e. `aws_iam_policy`) and inline polices (i.e.
    `aws_iam_user_policy`, `aws_iam_group_policy` and `aws_iam_role_policy`) -- to
    other AWS entities based on the actions and resources specified by the policy
    document.

    **TIP** Use `AccessPolicy` class in a query to easily include all types of IAM policies.

    **TIP** The `actions` property on the permissions relationships/edges are normalized to 
    all lowercase and stored in `normalizedActions` property. Use this property for case
    insensitive querying of IAM permissions.

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

### Multi-region Support

Multi-region support is built-in to the integration to ensure maximum
visibility, especially to discover resources in an unauthorized region.

#### Supported Regions

**Americas:**

- `ca-central-1` Montreal
- `us-east-1` N. Virginia
- `us-east-2` Ohio
- `us-west-1` N. California
- `us-west-2` Oregon
- `sa-east-1` São Paulo

**Europe:**

- `eu-central-1` Frankfurt
- `eu-north-1` Stockholm
- `eu-west-1` Ireland
- `eu-west-2` London
- `eu-west-3` Paris

**Asia Pacific:**

- `ap-northeast-1` Tokyo
- `ap-northeast-2` Seoul
- `ap-south-1` Mumbai
- `ap-southeast-1` Singapore
- `ap-southeast-2` Sydney

### Unsupported Regions

All AWS regions are supported except for the following:

**China Regions:**

- `cn-north-1` Beijing
- `cn-northwest-1` Ningxia

> _Customers who wish to use the China Regions are required to sign up for a
> separate set of account credentials unique to China services._

**GovCloud:**

- `us-gov-east-1`
- `us-gov-west-1`

> _We do not run in the cloud of government yet._

**Other:**

- `ap-northeast-3` Osaka-Local
- `me-south-1` Bahrain (Middle East)

> _Separate subscription or access token/client needed for these regions._
