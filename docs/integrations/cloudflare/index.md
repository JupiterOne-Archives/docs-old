# JupiterOne Managed Integration for Cloudflare

## Overview

JupiterOne provides a managed integration for Cloudflare. The integration
connects directly to [Cloudflare REST API][1] to obtain DNS related
configuration information.

Configure the integration by providing an API Token with read-only permissions.
Obtain an API token from the bottom of the ["API Tokens" page][2] in your
Cloudflare account.

## Entities

The following entity resources are ingested when the integration runs.

| Cloudflare Resources | \_type of the Entity        | \_class of the Entity |
| -------------------- | --------------------------- | --------------------- |
| Account              | `cloudflare_account`        | `Account`             |
| Account Member       | `cloudflare_account_member` | `User`                |
| Account Role         | `cloudflare_account_role`   | `AccessRole`          |
| DNS Zone             | `cloudflare_dns_zone`       | `DomainZone`          |
| DNS Record           | `cloudflare_dns_record`     | `DomainRecord`        |

## Relationships

The following relationships are created:

| From                        | Relationship | To                          |
| --------------------------- | ------------ | --------------------------- |
| `cloudflare_account`        | **HAS**      | `cloudflare_account_member` |
| `cloudflare_account`        | **HAS**      | `cloudflare_account_role`   |
| `cloudflare_account`        | **HAS**      | `cloudflare_dns_zone`       |
| `cloudflare_dns_zone`       | **HAS**      | `cloudflare_dns_record`     |
| `cloudflare_account_member` | **ASSIGNED** | `cloudflare_account_role`   |

The following relationships are mapped:

| From     | Relationship | To                    |
| -------- | ------------ | --------------------- |
| `Domain` | **HAS**      | `cloudflare_dns_zone` |

[1]: https://api.cloudflare.com/
[2]: https://dash.cloudflare.com/profile/api-tokens
