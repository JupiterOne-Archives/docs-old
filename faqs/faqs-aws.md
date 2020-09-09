# AWS related FAQs

## Some of my AWS resources seem to be missing from the Asset Inventory / Graph. What is going on?

This is most commonly caused by incorrect or insufficient permissions. Check the
IAM policy assigned to the IAM role used by JupiterOne in your AWS account. You
can find details on the required permissions by going to

**Integrations Configuration** > **Add AWS Configuration** > and clicking on the
**Setup Instructions** button.

Or they can be found on the [jupiterone-aws-integration][] project on Github.

[jupiterone-aws-integration]: https://github.com/jupiterone/jupiterone-aws-integration

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

To determine whether an EC2 instance is publicly accessible, the instance itself needs to be in a public
subnet in addition to having a security group rule allowing traffic. This is determined by a query that
checks for both of these conditions:

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
