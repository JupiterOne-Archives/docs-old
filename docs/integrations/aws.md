# AWS Integration Details

## Overview

JupiterOne provides a managed integration service directly to monitored AWS
accounts via native IAM Assume Role capability and talk directly to AWS API and
SDK.

## Integration Instance Configuration

The integration is triggered by an event containing the information for a
specific integration instance.

The integration instance configuration requires the customer's `roleArn` to
assume in order to read infrastructure information through AWS APIs. The role is
configured to require an `externalId`; this also must be maintained in the
instance configuration.

The detailed setup instructions can be found directly in-app.

The easiest way to provision the required resources in your AWS account for
integrating with JupiterOne is via our pre-built CloudFormation Stack. This is
available directly in-app to launch into your AWS environment. We only require
Read-Only, Security Audit access into your account. We are only ready resource
configurations and do not require access to actual data such as S3 objects.

The details of this CloudFormation Stack and the access requirements of the AWS
role are documented in the public [JupiterOne AWS Integration][1] project on
Github.

[1]: https://github.com/jupiterone-io/jupiterone-aws-integration

## Entities

The following entity resources are ingested when the integration runs:

| AWS Service | AWS Entity Resource | _type : _class of the Entity
| ----------- | -----------         | -----------
| EC2         | EC2 Instance        | `aws_ec2_instance`       : `Host`
|             | EBS Volume          | `aws_ec2_volume`         : `DataStore, Disk`
|             | Security Group      | `aws_ec2_security_group` : `Firewall`
|             | VPC                 | `aws_ec2_vpc`            : `Network`
|             | Subnet              | `aws_ec2_subnet`         : `Network`
| IAM         | IAM User            | `aws_iam_user`           : `User`
|             | IAM Group           | `aws_iam_group`          : `UserGroup`
|             | IAM Role            | `aws_iam_role`           : `AccessRole`
|             | IAM Managed Policy  | `aws_iam_managed_policy` : `AccessPolicy`
|             | IAM Role Policy     | `aws_iam_role_policy`    : `AccessPolicy`
|             | IAM User Policy     | `aws_iam_user_policy`    : `AccessPolicy`
| S3          | S3 Bucket           | `aws_s3_bucket`          : `DataStore`
| Lambda      | Lambda Function     | `aws_lambda_function`    : `Function, Workload`
| API Gateway | REST API            | `aws_apigateway_rest_api`: `Gateway, Proxy`
| Config      | Config Rule         | `aws_config_rule`        : `ControlPolicy`

## Relationships

The following relationships are created/mapped:

### Basic relationships within the integration instance account/resources

|
| --
| `aws_ec2_instance` **USES** `aws_ec2_volume`
| `aws_ec2_security_group` **PROTECTS** `aws_ec2_instance`
| `aws_apigateway_rest_api` **TRIGGERS** `aws_lambda_function`

### Connections to broader entity resources

|
| --
| `aws_iam_user - IS -> Person` <br> Note: This is mapped automatically only when the `username` of the IAM User is an email that matches the Person's.

### Advanced mappings

The AWS integration performs analysis of security group rules, IAM policies, and
assume role trust policies to determine the following mapping:

|
| --
| `User|Service|AccessRole` **CAN_ASSUME** `aws_iam_role`