# AWS related FAQs

## Some of my AWS resources seem to be missing from the Asset Inventory / Graph. What is going on?

This is most commonly caused by incorrect or insufficient permissions. Check the
IAM policy assigned to the IAM role used by JupiterOne in your AWS account. You
can find details on the required permissions by going to

**Integrations Configuration** > **Add AWS Configuration** > and clicking on the
**Setup Instructions** button.

Or they can be found on the [jupiterone-aws-integration][] project on Github.

## How can I add/configure all the sub-accounts in my AWS Organization?

First configure your AWS Organization master account to JupiterOne per the instructions 
in the JupiterOne application or those found at the [jupiterone-aws-integration][] project on Github. During this process you will create an IAM Role for JupiterOne with specific policies attached and a specific external trust ID. Please note the IAM Role name, policies, and external trust ID used. Do not select the option "Auto-configure additional integrations..." yet.

Now use your favorite infrastructure-as-code method to systematically generate an identical JupiterOne IAM Role in each of your  sub-accounts. Be sure to name the IAM Role identically, attach the same policies, and use the same external trust ID as was used with the master account configuration.

Finally, make sure that in the JupiterOne application you have selected a polling interval and select the option to "Auto-configure additional integrations..." in your master account configuration.

If these steps are done correctly, JupiterOne will automatically pull in all sub-accounts from the Organization the next time it polls your environment.

## How can I skip certain sub-accounts when auto-configuring my AWS Organization?

To skip certain sub-accounts when auto-configuring JupiterOne AWS integrations 
from an Organizations master account, add the optional `j1-integration: SKIP` tag 
to the sub-account in your infrastructure-as-code or from the AWS Organizations web console.

## How can I bypass a Service Control Policy blocking the JupiterOne Integration?

See the [AWS Service control policies documentation](https://docs.aws.amazon.com/organizations/latest/userguide/orgs_manage_policies_scps.html) for the latest information.

Errors may occur after configuring one or many AWS integrations if there is a
Service Control Policy (SCP) blocking specified services or regions. Any AWS
Services that cannot be ingested by JupiterOne can be found within the logs of
the *Integration Jobs* (Integrations > Configurations > Settings > Jobs).

![Integration Jobs](../assets/faq-integration-jobs.png)

For each SCP that is blocking JupiterOne ingestion, add the following condition
element to your SCP JSON: 

**Note** Make sure the ARN below matches the IAM Role ARN you used to configure
your JupiterOne AWS integration.

```json
"Condition": {
  "ArnNotLike": {
    "aws:PrincipalARN": [
        "arn:aws:iam::*:role/JupiterOne*"
    ]
  }
}
```

## I have a Network marked as "public", what does that mean?

The `public` property on a Network entity means the network is publicly
accessible. A publicly accessible network could be either internal or external.
There is an `internal` property to indicate whether that is the case.

A network that is not an entity ingested from an integration is determined to be
potentially an external network, with `internal=undefined`. When such a network
(or host) has a public IP address or CIDR, it is set to be `public=true`.

An internal network - that is, a Network entity ingested from an integration,
such as an `aws_subnet` or `aws_vpc` - is set to `internal=true`. An
internal network may be determined to be publicly accessible by the integration
with certain conditions that are specific to each type of integration.

## How is it determined if an AWS VPC or Subnet is public?

An `aws_vpc` or `aws_subnet` is determined to be publicly accessible --
i.e. `public=true` -- only when the following conditions are met:

- The VPC has an Internet Gateway that connects it to the Internet
- The VPC or subnet has a Route in the Route Table to external networks
- The VPC or subnet has a Network ACL that allows traffic to/from external networks

## Why is the security group of an EC2 instance showing as connected to the Internet when the instance itself is not in a public subnet?

Relationships in the JupiterOne graph represent the actual configurations between two entities.

In this case, if a security group has a rule allowing traffic to or from the Internet, there will be a
relationship edge between that security group connecting it to/from the Internet. The EC2 instance 
itself will _not_ have a relationship edge to/from the Internet.

To determine whether an EC2 instance is publicly accessible, the instance itself needs to be in a public subnet in addition to having a security group rule allowing traffic. This is determined by a query that checks for both of these conditions:

```j1ql
Find aws_subnet with public=true
  that HAS aws_instance
  that PROTECTS aws_security_group
  that ALLOWS Internet
Return tree
```

## How do I add custom properties to my AWS entities from the source?

You can add custom properties by tagging your AWS resources. AWS supports tags
for most resources. All tags will be ingested as entity properties. Each tag
will have a prefix `tag.` followed by the tag name as the entity property name.

You can then build queries using these tag properties. For example:

```j1ql
Find aws_instance with tag.Environment='staging'
```

## I am using a powerful policy like AdministratorAccess in AWS, why can't I query on the resources it allows?

The relationships in J1 are built between the entities as described in the environments. For example, the `AdministratorAccess` IAM policy in AWS has an `allow *:*` rule, therefore, a relationship is built directly from that `aws_iam_policy` entity to the `aws_account` entity.

Similarly, if the policy states `allow s3:*`, the `ALLOWS` relationship in JupiterOne is built between the `aws_iam_policy` entity to the `aws_s3` service entity. This approach allows for simpler graph without thousands of connections from one entity to all other sub-entities that reside within an account or service.

These conditions need to be taken into account at the query level.

For example, to find IAM policies that allow access to S3 buckets, we should also check those that allow access to all resources in the S3 service and those that allow access to all services in the AWS account.

This is done simply as follows:

```
Find AccessPolicy 
  that ALLOWS (aws_account|aws_s3|aws_s3_bucket) ...
```

[jupiterone-aws-integration]: https://github.com/jupiterone/jupiterone-aws-integration

## How do I check the status of S3 server access logging vs bucket object logging?

To check logging status specifically for **Server Access Logging**:

```j1ql
Find aws_s3_bucket that logs to aws_s3_bucket
return tree
```

To check logging status specifically for **Object Level Logging**:

```j1ql
Find aws_s3_bucket 
that sends aws_cloudtrail 
that logs to * 
return TREE
```

!!! note
    Object level logging is done via CloudTrail

To check for if a bucket does not have any logging enabled:

```j1ql
Find aws_s3_bucket with loggingEnabled != true
```

!!! note
    Either server access logging or object level logging will result 
    in `loggingEnabled = true`

**Bonus:** to check for S3 buckets that publish **inventory reports**:

```j1ql
find aws_s3_bucket that publishes to aws_s3_bucket
return tree
```

!!! note
    There are additional properties captured on the edge in each case, 
    which can be used for additional filtering (see screenshots). 
    For example:
    
    ​```j1ql
    find aws_s3_bucket 
    that sends aws_cloudtrail 
    that logs to * 
    where logs.read=true and logs.write=true
    return TREE
    ​```