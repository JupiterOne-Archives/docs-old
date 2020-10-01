# Integration with JupiterOne

## Setup

The Qualys API requires usage of a username and password associated with a user.
Also, by default, trial users do not have access to the Qualys API so you must
request access to the API.

After testing for quite a bit, this integration was unable to ingest host
findings with the built-in READER role event after adding all of the modules.
This may be related to parts of the Qualys "host detection" feature being
controlled by a license setting.

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

| Resources       | Entity `_type`           | Entity `_class` |
| --------------- | ------------------------ | --------------- |
| Host            | `qualys_host`            | `Host`          |
| Host Finding    | `qualys_host_finding`    | `Finding`       |
| Vulnerability   | `qualys_vuln`            | `Vulnerability` |
| Web App         | `qualys_web_app`         | `Application`   |
| Web App Finding | `qualys_web_app_finding` | `Finding`       |

### Relationships

The following relationships are created/mapped:

| Source Entity `_type` | Relationship `_class` | Target Entity `_type`    |
| --------------------- | --------------------- | ------------------------ |
| `qualys_host_finding` | **IS**                | `qualys_vuln`            |
| `qualys_host`         | **HAS**               | `qualys_host_finding`    |
| `qualys_host_finding` | **IS**                | `qualys_vuln`            |
| `qualys_web_app`      | **HAS**               | `qualys_web_app_finding` |

<!--
********************************************************************************
END OF GENERATED DOCUMENTATION AFTER BELOW MARKER
********************************************************************************
-->
<!-- {J1_DOCUMENTATION_MARKER_END} -->
