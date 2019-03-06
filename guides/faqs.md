# Frequently Asked Questions

## How do I add custom properties to my AWS entities from the source?

You can add custom properties by tagging your AWS resources. AWS supports tags
for most resources. All tags will be ingested as entity properties. Each tag
will have a prefix `tag.` followed by the tag name as the entity property name.

You can then build queries using these tag properties. For example:

```j1ql
Find aws_instance with tag.Environment='staging'
```

## Some AWS resources seem to be missing from the Asset Inventory / Graph. What is going on?

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

## How are `Person` entities (i.e. `employees`) created?

A `Person` entity is created by the "mapper" process -- when a `User` entity is
ingested/updated from an identity provider integration (e.g. Okta, OneLogin,
Google), a `Person` entity is "mapped" with the user's information (first and
last name, email address, etc.).

## How can I avoid creating a `Person` entity for a generic/system user account?

Certain properties are used to determine if the user is a system user or an
actual individual. This depends on the integration.

For **Okta**, you can set the `userType` property for the user to one of the
following to avoid it being mapped to a `Person`:

- `bot`
- `generic`
- `service`
- `system`

## I see a user named "Callisto" on my account. Who is that?

"Callisto <callisto@jupiterone.io>" is the account for JupiterOne Support. The
Support User is by default added to a new account during free trial,
proof-of-concept evaluation, or initial account onboarding. This is to
facilitate better support and training on using the platform.

- The support user can be removed by an account administrator at any time,
  should you determine that ongoing regular support is no longer needed.
- You have the option and administrative privilege to add the support user back
  at any time, when support is needed in the future.