# Frequently Asked Questions

## How do I get my custom / on-premise data into JupiterOne?

JupiterOne's asset inventory, search and visualization supports any data
imported that follows the [reference data model][1], not limited to data
ingested by managed integrations.

This is easily done via the [API or CLI][2]. Each entity object can be
represented in a few lines of JSON or YAML code. The [J1 API Client or CLI][2]
can create/update them to your JupiterOne account. You can also develop a script
to run on a schedule (e.g. via a cron job) or integrate into your DevOps
automation.

[1]: ../docs/jupiterone-data-model.md
[2]: ../guides/j1-client-and-cli.md

## Where do these `Person` entities come from? Why are they not tagged with an integration?

The Person entities are “mapped” from `User` entities. They are considered
"shared" entities that multiple integrations can map to and contribute
properties to. For example, a `Person` can be created by a Google integration
(from a `google_user`). Or from a Github User, AWS IAM User, etc.

The `Person` entities represent actual individuals in the organizations, whereas
the `User` entities are the logical user accounts within each digital
environment/account (i.e. from an integration).

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

## Endpoint compliance data isn't appearing as expected. How can I troubleshoot this?

For the Stethoscope-powered compliance data to report successfully:

- Endpoint devices must be running Stethoscope-app.
- Endpoint devices must be running the powerup agent.
- The powerup agent must be sucessfully activated.

Stethoscope-app and the powerup agent are both installed via the same powerup
installation bundle. You should check to see that the Stethoscope giraffe
icon is present in the device's system tray. If it is not, you will need to
launch Stethoscope-app. You can verify that the powerup agent is running as a
system service by checking for its process. On MacOS or Linux, issue a
command like `ps -ef | grep j1-endpoint-agen[t]` to verify that there
is indeed an agent service running.

To verify that the powerup agent is successfully activated, you can perform a
manual scan from within a shell terminal:

`/opt/j1endpointagent/bin/j1-endpoint-agent scan --verbose`

The output of this scan will indicate success if your agent has been
successfully activated and can communicate securely with JupiterOne. If this
is unsuccessful, you should resend an activation email to this device from
the JupiterOne Powerup administration UI for Endpoint Compliance, and perform
the activation step as indicated in the email. If you suspect there may have
been a problem with installation, or if other errors persist, please try
re-downloading and executing the installation script, and performing the
activation step.

Additional diagnostic information may be available in the device's system
log. You can search this for "jupiterone" or "ECA:" to quickly filter the
results.

## How do I search/filter on all AWS entities without enumerating all types?

For example, you may want to identify if a certain tag is present across all
entities from AWS. You can do this by using the special metadata
`_integrationName`, like this:

```j1ql
Find * with _integrationName="AWS" and tag.ABC=undefined
```

You may also want to limit this query to filter out irrelevant entities by class.
For example:

```j1ql
Find * with
  _integrationName="AWS" and
  tag.ABC=undefined and
  _class!='Finding'
```