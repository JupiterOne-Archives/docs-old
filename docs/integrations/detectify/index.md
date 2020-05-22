# JupiterOne Managed Integration for Detectify

## Overview

JupiterOne provides a managed integration for Detectify. The integration
connects directly to [Detectify REST API][1] to obtain application scan assets,
reports, and findings.

Configure the integration by providing an API Key from your Detectify account.
JupiterOne by default ingests findings from the past 30 days. The configuration
can be changed to ingest findings from the latest scan reports (this option
requires Enterprise Plan from Detectify).

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

| Detectify Resources | \_type of the Entity     | \_class of the Entity |
| ------------------- | ------------------------ | --------------------- |
| Account             | `detectify_account`      | `Account`             |
| Service             | `detectify_service`      | `Service`             |
| Asset (Domain)      | `web_app_domain`         | `Application`         |
| Asset (Subdomain)   | `web_app_endpoint`       | `ApplicationEndpoint` |
| Scan Profile        | `detectify_scan_profile` | `Configuration`       |
| Finding             | `detectify_finding`      | `Finding`             |
| Scan Report         | `detectify_scan`         | `Assessment`          |

## Relationships

The following relationships are created:

| From                 | Relationship   | To                       |
| -------------------- | -------------- | ------------------------ |
| `detectify_account`  | **PROVIDES**   | `detectify_service`      |
| `detectify_account`  | **HAS**        | `web_app`                |
| `web_app_domain`     | **HAS**        | `detectify_scan_profile` |
| `web_app_domain`     | **HAS**        | `web_app_endpoint`       |
| `detectify_account`  | **HAS**        | `detectify_scan`         |
| `detectify_service`  | **PERFORMED**  | `detectify_scan`         |
| `detectify_endpoint` | **HAS**        | `detectify_finding`      |
| `detectify_scan`     | **IDENTIFIED** | `detectify_finding`      |

The following relationships are mapped:

| From     | Relationship | To               |
| -------- | ------------ | ---------------- |
| `<ROOT>` | **DEVELOPS** | `web_app_domain` |

[1]: https://developer.detectify.com/
