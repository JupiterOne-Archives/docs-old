# JupiterOne Managed Integration for Snipe-IT

## Overview

JupiterOne provides a managed integration for Snipe-IT. The integration connects
directly to [Snipe-IT REST API][1] to hardware and asset information.

Configure the integration by providing an API Token with read-only permissions.
Obtain an API token from the bottom of the "Manage API Keys" page in your
Snipe-IT account.

## Entities

The following entity resources are ingested when the integration runs.

| Snipe-IT Resources | \_type of the Entity | \_class of the Entity |
| ------------------ | -------------------- | --------------------- |
| Account            | `snipeit_account`    | `Account`             |
| Service            | `snipeit_service`    | `Service`             |
| Hardware           | `hardware`           | `Device`              |
| Location           | `location`           | `Site`                |

## Relationships

The following relationships are created:

| From              | Relationship | To                |
| ----------------- | ------------ | ----------------- |
| `snipeit_account` | **PROVIDES** | `snipeit_service` |
| `snipeit_account` | **MANAGES**  | `location`        |
| `snipeit_account` | **MANAGES**  | `hardware`        |
| `location`        | **HAS**      | `hardware`        |

The following relationships are mapped:

| From     | Relationship  | To                 |
| -------- | ------------- | ------------------ |
| `Person` | **HAS\|OWNS** | `snipeit_hardware` |

[1]: https://snipe-it.readme.io/reference
