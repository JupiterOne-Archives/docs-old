# Integration with JupiterOne

## Setup

JupiterOne provides a managed integration for Rapid7 InsightVM. The integration
connects directly to Rapid7 InsightVM API to obtain configuration metadata and
analyze resource relationships.

## Authentication

Jupiterone requires the following information to complete authentication:
1. The InsightVM Security Console Socket Address
   - The publicly-accessible socket (host:port) of your InsightVM Security Console. e.g. <hostname>:3780.
2. An InsightVM Username and Password
   - Use an existing user or create a user that has at least the [Security Manager and Site Owner Role](https://docs.rapid7.com/insightvm/managing-users-and-authentication/#security-manager-and-site-owner)

<!-- {J1_DOCUMENTATION_MARKER_START} -->
<!--
********************************************************************************
NOTE: ALL OF THE FOLLOWING DOCUMENTATION IS GENERATED USING THE
"j1-integration document" COMMAND. DO NOT EDIT BY HAND! PLEASE SEE THE DEVELOPER
DOCUMENTATION FOR USAGE INFORMATION:

https://github.com/JupiterOne/sdk/blob/master/docs/integrations/development.md
********************************************************************************
-->

## Data Model

### Entities

The following entities are created:

| Resources     | Entity `_type`            | Entity `_class` |
| ------------- | ------------------------- | --------------- |
| Account       | `insightvm_account`       | `Account`       |
| Asset         | `insightvm_asset`         | `Device`        |
| Finding       | `insightvm_finding`       | `Finding`       |
| Scan          | `insightvm_scan`          | `Assessment`    |
| Site          | `insightvm_site`          | `Site`          |
| User          | `insightvm_user`          | `User`          |
| Vulnerability | `insightvm_vulnerability` | `Vulnerability` |

### Relationships

The following relationships are created/mapped:

| Source Entity `_type` | Relationship `_class` | Target Entity `_type`     |
| --------------------- | --------------------- | ------------------------- |
| `insightvm_account`   | **HAS**               | `insightvm_asset`         |
| `insightvm_account`   | **HAS**               | `insightvm_site`          |
| `insightvm_account`   | **HAS**               | `insightvm_user`          |
| `insightvm_asset`     | **HAS**               | `insightvm_finding`       |
| `insightvm_finding`   | **IS**                | `insightvm_vulnerability` |
| `insightvm_scan`      | **MONITORS**          | `insightvm_asset`         |
| `insightvm_site`      | **HAS**               | `insightvm_asset`         |
| `insightvm_site`      | **HAS**               | `insightvm_user`          |
| `insightvm_site`      | **PERFORMED**         | `insightvm_scan`          |
| `insightvm_user`      | **OWNS**              | `insightvm_asset`         |

<!--
********************************************************************************
END OF GENERATED DOCUMENTATION AFTER BELOW MARKER
********************************************************************************
-->
<!-- {J1_DOCUMENTATION_MARKER_END} -->
