# JupiterOne Managed Integration for Bugcrowd

## Overview

JupiterOne provides a managed integration for Bugcrowd. The integration connects
directly to [Bugcrowd REST API][1] to obtain application scan assets, reports,
and findings.

Configure the integration by providing an API Token from your Bugcrowd account.

## Entities

The following entity resources are ingested when the integration runs.

| Bugcrowd Resources | \_type of the Entity  | \_class of the Entity |
| ------------------ | --------------------- | --------------------- |
| Account            | `bugcrowd_account`    | `Account`             |
| Bounty Program     | `bugcrowd_bounty`     | `Program`             |
| Submission         | `bugcrowd_submission` | `Finding`             |

## Relationships

The following relationships are created:

| From               | Relationship | To                    |
| ------------------ | ------------ | --------------------- |
| `bugcrowd_account` | **HAS**      | `bugcrowd_service`    |
| `bugcrowd_account` | **HAS**      | `bugcrowd_bounty`     |
| `bugcrowd_service` | **MANAGES**  | `bugcrowd_bounty`     |
| `bugcrowd_bounty`  | **HAS**      | `bugcrowd_submission` |

The following relationships are mapped:

| From                  | Relationship | To                 |
| --------------------- | ------------ | ------------------ |
| `<ROOT>`              | **Owns**     | `bugcrowd_account` |
| `bugcrowd` (`Vendor`) | **Hosts**    | `bugcrowd_account` |

[1]: https://docs.bugcrowd.com/reference
