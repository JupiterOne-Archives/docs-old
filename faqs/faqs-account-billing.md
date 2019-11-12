# Account and billing related FAQs

## What are entities? And how are they counted for usage/billing?

An `entity` is a `node` stored in the JupiterOne graph database. Entities
typically come from an integration. They can also be added via the Asset
Inventory web app or API (custom scripts).

Each entity represents an object from your organization's digital operational
environment. Examples include an AWS EC2 instance, RDS DB cluster, RDS DB
instance, IAM role, IAM policy, user endpoint, etc.

The following entities are not counted for billing/usage calculation:

- **Mapped Entities** -- these are entities with `_source='system-mapper'`
  property. These are entities derived by the JupiterOne Mapper, such as an
  external Network or Host entity created because a security group contains a
  rule pointing to it.

- **Findings and PRs** -- these entities are considered "event-like" and not
  true resources in an digital operating environment, therefore they are not
  being counted for usage/billing purpose.

- **Images, NetworkInterfaces, and IpAddress** -- these entities are also not
  counted against the usage or billing.

Run the following query in your account to get a count:

```j1ql
Find * with
  _source != 'system-mapper' and
  _class !=
    ('Finding' and 'PR' and 'Image' and 'NetworkInterface' and 'IpAddress')
  as e
return
  count(e) as entityCount
```

## What are the limitations of the `COMMUNITY` Edition of JupiterOne? 

JupiterOne `COMMUNITY` Edition is FREE for non-commercial use, non-profit or
small teams. It comes with the following features:

- Configure up to *five* integration instances
- Up to 500 entities and 10 users
- Access to Asset Inventory / CMDB, search, query and graph visualization from
  query results

The following limitations apply:

- Integrations cannot be configured for scheduled polling -- you can still
  manually trigger an integration to run to get updated data.

Additionally, a paid subscription is required for the following capabilities:

- Automated and continuous data polling and analysis
- Alerts and notifications (email, Jira, Slack)
- Reporting charts and dashboards
- Compliance management, evidence collection with continuous assessment
- Policy management (build/edit/export policies and procedures) and compliance
  mapping
- Full API access
- SAML Single Sign On

_Notes:_

- Account in active trial have access to all paid subscription features.
- Trial accounts are automatically converted into `COMMUNITY` edition after
  trial expires.
- The entity limit for a paid account depends on the subscription tier.

## I see a user named "Callisto" on my account. Who is that?

"Callisto <callisto@jupiterone.io>" is the account for JupiterOne Support. The
Support User is by default added to a new account during free trial,
proof-of-concept evaluation, or initial account onboarding. This is to
facilitate better support and training on using the platform.

- The support user can be removed by an account administrator at any time,
  should you determine that ongoing regular support is no longer needed.
- You have the option and administrative privilege to add the support user back
  at any time, when support is needed in the future.
