# AWS Integration Details

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
the application and maintained in the public [JupiterOne AWS Integration][1]
project on Github.

[1]: https://github.com/jupiterone-io/jupiterone-aws-integration

## Entities

The following entity resources are ingested when the integration runs:

| AWS Service | AWS Entity Resource | _type : _class of the Entity
| ----------- | -----------         | -----------
| API Gateway | REST API            | `aws_apigateway_rest_api`: `Gateway`
| EC2         | EC2 Instance        | `aws_ec2_instance`       : `Host`
|             | EBS Volume          | `aws_ec2_volume`         : `DataStore, Disk`
|             | Security Group      | `aws_ec2_security_group` : `Firewall`
|             | VPC                 | `aws_ec2_vpc`            : `Network`
|             | Subnet              | `aws_ec2_subnet`         : `Network`
| IAM         | IAM User            | `aws_iam_user`           : `User`
|             | IAM Group           | `aws_iam_group`          : `UserGroup`
|             | IAM Role            | `aws_iam_role`           : `AccessRole`
|             | IAM User Policy     | `aws_iam_user_policy`    : `AccessPolicy`
|             | IAM Group Policy    | `aws_iam_group_policy`   : `AccessPolicy`
|             | IAM Role Policy     | `aws_iam_role_policy`    : `AccessPolicy`
|             | IAM Managed Policy  | `aws_iam_managed_policy` : `AccessPolicy`
| S3          | S3 Bucket           | `aws_s3_bucket`          : `DataStore`
| Lambda      | Lambda Function     | `aws_lambda_function`    : `Function, Workload`
| Config      | Config Rule         | `aws_config_rule`        : `ControlPolicy`

## Relationships

The following relationships are created/mapped:

### Basic relationships within the integration instance account/resources

|
| --
| `aws_account` **HAS** `aws_apigateway`
| `aws_account` **HAS** `aws_ec2`
| `aws_account` **HAS** `aws_iam`
| `aws_account` **HAS** `aws_lambda`
| `aws_account` **HAS** `aws_s3`
| `aws_account` **HAS** `aws_config`
| `aws_apigateway` **HAS** `aws_apigateway_rest_api`
| `aws_apigateway_rest_api` **TRIGGERS** `aws_lambda_function`
| `aws_config` **HAS** `aws_config_rule`
| `aws_config_rule` **EVALUATES** `aws_account`
| `aws_config_rule` **EVALUATES** `aws_ec2_instance`
| `aws_config_rule` **EVALUATES** `aws_ec2_security_group`
| `aws_config_rule` **EVALUATES** `aws_ec2_volume`
| `aws_config_rule` **EVALUATES** `aws_iam_user`
| `aws_config_rule` **EVALUATES** `aws_iam_group`
| `aws_config_rule` **EVALUATES** `aws_iam_role`
| `aws_config_rule` **EVALUATES** `aws_s3_bucket`
| `aws_ec2` **HAS** `aws_ec2_instance`
| `aws_ec2` **HAS** `aws_ec2_security_group`
| `aws_ec2` **HAS** `aws_ec2_subnet`
| `aws_ec2` **HAS** `aws_ec2_volume`
| `aws_ec2` **HAS** `aws_ec2_vpc`
| `aws_ec2_instance` **USES** `aws_ec2_volume`
| `aws_ec2_security_group` **PROTECTS** `aws_ec2_instance`
| `aws_ec2_vpc` **CONTAINS** `aws_ec2_subnet`
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
| `aws_lambda` **HAS** `aws_lambda_function`
| `aws_lambda_function` **HAS** `aws_iam_role`
| `aws_s3` **HAS** `aws_s3_bucket`

### Connections to broader entity resources

|
| --
| `aws_iam_user` **IS** `Person` <br> Note: This is mapped automatically only when the `username` of the IAM User is an email that matches the Person's.

### Advanced mappings

The AWS integration performs analysis of security group rules, IAM policies, and
assume role trust policies to determine the following mapping:

|
| --
| `User|Service|AccessRole` **CAN_ASSUME** `aws_iam_role`