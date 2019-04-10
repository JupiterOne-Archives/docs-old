# J1 Queries for AWS Config

AWS Config is a service provided by AWS that can be used to evaluate the
configuration settings of your AWS resources. This is typically done by enabling
AWS Config rules in one or multiple of your AWS accounts to represent your ideal
configuration settings.

There are a few downsides of AWS Config:

- It can easily cost $500 to $1000+ per account month depending on the number of
  resources in the account and number of rules you have configured.

- It is hard to fine tune AWS Config rules with the tags and other contextual
  data to reduce false positives.

- Setting up alerts and notifications requires additional configuration using
  SNS or CloudWatch.

Fortunately, almost all of evaluation of AWS Config rules can be done by a
simple J1QL query/alert in JupiterOne. Additionally, each query can easily be
modified to include tags or even relationship context.

Here are some examples.

## ACM Rules

**acm-certificate-expiration-check**

Ensures ACM Certificates in your account are marked for expiration within the
specified number of days.

```j1ql
Find aws_acm_certificate with expiresOn < date.now + 30days

OR

Find Certificate with expiresOn < date.now + 30days
```

## EC2 Rules

**ec2-instances-in-vpc**

Ensure all EC2 instances run in a VPC.

```j1ql
Find aws_instance with vpcId=undefined
```

**ec2-volume-inuse-check**

Checks whether EBS volumes are attached to EC2 instances.

```j1ql
Find aws_ebs_volume that !USES aws_instance
```

**encrypted-volumes**

Checks whether the EBS volumes that are in an attached state are encrypted.

```j1ql
Find aws_instance as i that USES aws_ebs_volume with encrypted!=true as v
  return
    i.tag.AccountName, i.name, i.instanceId, i.state, i.region, i.webLink,
    v.volumeId, v.encrypted, v.webLink
```

**restricted-ssh**

Checks whether the incoming SSH traffic for the security groups is accessible.

*With AWS Config, this rule is compliant when the IP addresses of the incoming
SSH traffic in the security groups are restricted. This rule applies only to
IPv4.*

```j1ql
Find aws_security_group as sg that ALLOWS as rule * as src
  where
    rule.ingress=true and rule.ipProtocol='tcp' and
    (rule.fromPort<=22 and rule.toPort>=22)
  return
    sg.displayName,
    rule.ipProtocol, rule.fromPort, rule.toPort,
    src.displayName, src.ipAddress, src.CIDR
```

## IAM Rules

**iam-root-access-key-check**

Ensure root AWS account has MFA enabled.

```j1ql
Find aws_account with _source!='system-mapper' and AccountMFAEnabled!=1
```

**iam-password-policy**

Ensure the account password policy for IAM users meets the specified requirements.

```j1ql
Find aws_iam_account_password_policy with
  requireUppercase != true or
  requireLowercase != true or
  requireSymbols != true or
  requireNumbers != true or
  minLength < 8 or
  maxAgeDays > 90 or
  historyCount < 12
```

*Adjust the above values to match your organization policy. You can also separate each into its own query.*

**iam-user-no-policies-check**

Ensure that none of your IAM users have policies attached.

*IAM users should inherit permissions from IAM groups or roles.*

```j1ql
Find aws_iam_user that assigned (aws_iam_user_policy|aws_iam_policy)
```

The `aws_iam_user_policy` in the above query specifies an inline policy whereas
the `aws_iam_policy` is a managed policy.

## Lambda Rules

**lambda-function-public-access-prohibited**

Checks whether the AWS Lambda function policy attached to the Lambda resource
prohibits public access.

**lambda-function-settings-check**

```j1ql
Find aws_lambda_function with runtime='nodejs6.10'

Find aws_lambda_function with timeout < 5 or timeout > 300

Find aws_lambda_function with memorySize <= 128 or memorySize >= 1024

Find aws_lambda_function with role = '<role_arn>'
```

You can of course adjust any of the values in the above example queries.

**Note that `nodejs6.10` is End-of-Life (EOL) as of April 2019.**
The first query above is an excellent check to ensure you have migrated all of
your lambda functions to `nodejs8.10`.

## RDS Rules

**db-instance-backup-enabled**

Checks whether RDS DB instances have backups enabled.

```j1ql
Find (aws_db_instance|aws_rds_cluster) with BackupRetentionPeriod=undefined
```

*Optionally, the rule checks the backup retention period and the backup window.*

```j1ql
Find (aws_db_instance|aws_rds_cluster) with
  BackupRetentionPeriod=undefined or
  BackupRetentionPeriod<30
```

**rds-snapshots-public-prohibited**

Checks if Amazon Relational Database Service (Amazon RDS) snapshots are public.
The rule is non-compliant if any existing and new Amazon RDS snapshots are
public.

**rds-storage-encrypted**

Checks whether storage encryption is enabled for your RDS DB instances.

```j1ql
Find (aws_db_instance|aws_rds_cluster) with encrypted!=true
```

See a visual graph of which RDS cluster/instance is using which KMS key with the
following query:

```j1ql
Find (aws_db_instance|aws_rds_cluster) that uses aws_kms_key return tree
```

You can easily extend the query to cover other data stores and check for their
encryption status across the board:

```j1ql
Find DataStore with encrypted!=true
```

The above query covers **RDS instances/clusters**, **S3 buckets**, **EBS volumes**,
**DynamoDB tables**, **Redshift clusters** all at once.

This is often combined with some tagging to reduce false positives. For example:

```j1ql
Find DataStore with encrypted!=true and
  (classification='critical' or classification='confidential')
```

## DynamoDB Rules

**dynamodb-throughput-limit-check**

Checks whether provisioned DynamoDB throughput is approaching the maximum limit
for your account. By default, the rule checks if provisioned throughput exceeds
a threshold of 80% of your account limits.

```j1ql
n/a
```

## S3 Rules

**s3-bucket-public-read-prohibited**

Checks that your Amazon S3 buckets do not allow public read access.

```j1ql
Find aws_s3_bucket that ALLOWS as grant Everyone where grant.permission='READ'
```

Or, to return certain specific properties about the bucket and the rule:

```j1ql
Find aws_s3_bucket as bucket that ALLOWS as grant everyone
  where grant.permission='READ'
  return
    bucket.displayName, bucket.tag.AccountName,
    grant.permission, grant.granteeType, grant.granteeURI
```

**s3-bucket-public-write-prohibited**

Checks that your Amazon S3 buckets do not allow public write access.

```j1ql
Find aws_s3_bucket that ALLOWS as grant Everyone where grant.permission='WRITE'
```

**s3-bucket-replication-enabled**

Checks whether S3 buckets have cross-region replication enabled.

```j1ql
Find aws_s3_bucket with replicationEnabled != true or destinationBuckets = undefined
```

**s3-bucket-server-side-encryption-enabled**

Checks whether server side encryption is enabled for your S3 buckets.

```j1ql
Find aws_s3_bucket with encrypted=false and defaultEncryptionEnabled=false
```

**s3-bucket-ssl-requests-only**

Checks whether S3 buckets have policies that require requests to use Secure
Socket Layer (SSL/TLS).

```j1ql
n/a
```

**s3-bucket-logging-enabled**

Checks whether logging is enabled for your S3 buckets.

```j1ql
Find aws_s3_bucket with loggingEnabled != true
```

**s3-bucket-versioning-enabled**

Checks whether versioning is enabled for your S3 buckets. Optionally, the rule
checks if MFA delete is enabled for your S3 buckets.

```j1ql
Find aws_s3_bucket with versioningEnabled != true or mfaDelete != true
```

## Other Rules

**cloudtrail-enabled**

Ensure CloudTrail is enabled.

```j1ql
Find aws_account that !HAS aws_cloudtrail
```
