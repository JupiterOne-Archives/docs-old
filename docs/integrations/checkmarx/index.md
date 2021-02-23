# Integration with JupiterOne

## Setup

JupiterOne provides a managed integration for Checkmarx. The integration
connects directly to Checkmarx SAST API to obtain configuration metadata and
analyze resource relationships.

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

| Resources  | Entity `_type`           | Entity `_class` |
| ---------- | ------------------------ | --------------- |
| Account    | `checkmarx_account`      | `Account`       |
| Assessment | `checkmarx_scan`         | `Assessment`    |
| Finding    | `checkmarx_finding`      | `Finding`       |
| Project    | `checkmarx_project`      | `Project`       |
| Service    | `checkmarx_dast_scanner` | `Service`       |
| Team       | `checkmarx_team`         | `Team`          |

### Relationships

The following relationships are created/mapped:

| Source Entity `_type`    | Relationship `_class` | Target Entity `_type`    |
| ------------------------ | --------------------- | ------------------------ |
| `checkmarx_account`      | **HAS**               | `checkmarx_dast_scanner` |
| `checkmarx_account`      | **HAS**               | `checkmarx_team`         |
| `checkmarx_dast_scanner` | **PERFORMED**         | `checkmarx_scan`         |
| `checkmarx_project`      | **HAS**               | `checkmarx_scan`         |
| `checkmarx_scan`         | **IDENTIFIED**        | `checkmarx_finding`      |
| `checkmarx_team`         | **HAS**               | `checkmarx_project`      |

<!--
********************************************************************************
END OF GENERATED DOCUMENTATION AFTER BELOW MARKER
********************************************************************************
-->
<!-- {J1_DOCUMENTATION_MARKER_END} -->
