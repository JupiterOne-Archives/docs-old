# JupiterOne Managed Integration for NowSecure

## Overview

JupiterOne provides a managed integration for NowSecure. The integration
connects directly to [NowSecure REST API][1] to obtain application scan assets,
reports, and findings.

Configure the integration by providing an API Key from your NowSecure account.
JupiterOne by default ingests findings from the past 30 days. The configuration
can be changed to ingest findings from the latest scan reports (this option
requires Enterprise Plan from NowSecure).

## Data Model

JupiterOne vulnerability management and scanner integration is built on this
high level data model:

```text
Vendor   - HOSTS    ->       Account
Account  - PROVIDES ->       Service (*)
Service  - SCANS or TESTS -> <Entity> (*)
<Entity> - HAS      ->       Finding
```

> (\*) Examples:
>
> - `Service` (e.g. SAST, DAST, IAST, MAST, PenTest, etc.)
> - `<Entity>` (e.g. Application or Host or Device)

Optionally, the following is added when each scan/assessment/report is also
tracked by the integration:

```text
Service    - PERFORMS   -> Assessment
Assessment - IDENTIFIED -> Finding
```

## Entities

The following entity resources are ingested when the integration runs.

| NowSecure Resources | \_type of the Entity | \_class of the Entity |
| ------------------- | -------------------- | --------------------- |
| Account             | `nowsecure_account`  | `Account`             |
| Service             | `nowsecure_service`  | `Service`             |
| User                | `nowsecure_user`     | `User`                |
| Application         | `mobile_app`         | `Application`         |
| Finding             | `nowsecure_finding`  | `Finding`             |

## Relationships

The following relationships are created:

| From                | Relationship | To                  |
| ------------------- | ------------ | ------------------- |
| `nowsecure_account` | **HAS**      | `nowsecure_user`    |
| `nowsecure_account` | **PROVIDES** | `nowsecure_service` |
| `nowsecure_account` | **HAS**      | `mobile_app`        |
| `nowsecure_service` | **TESTS**    | `mobile_app`        |
| `mobile_app`        | **HAS**      | `nowsecure_finding` |

The following relationships are mapped:

| From     | Relationship | To           |
| -------- | ------------ | ------------ |
| `<ROOT>` | **DEVELOPS** | `mobile_app` |

[1]: https://developer.nowsecure.com/
