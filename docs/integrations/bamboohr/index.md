# Integration with JupiterOne

## Setup

JupiterOne provides a managed integration for BambooHR. The integration connects
directly to BambooHR API to obtain configuration metadata and analyze resource
relationships.

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

| Resources | Entity `_type`     | Entity `_class` |
| --------- | ------------------ | --------------- |
| Account   | `bamboohr_account` | `Account`       |
| User      | `bamboohr_user`    | `User`          |
| File      | `bamboohr_file`    | `DataObject`    |

### Relationships

The following relationships are created/mapped:

| Source Entity `_type` | Relationship `_class` | Target Entity `_type` |
| --------------------- | --------------------- | --------------------- |
| `bamboohr_account`    | **HAS**               | `bamboohr_user`       |
| `bamboohr_user`       | **HAS**               | `bamboohr_file`       |
| `bamboohr_account`    | **HAS**               | `bamboohr_file`       |

<!--
********************************************************************************
END OF GENERATED DOCUMENTATION AFTER BELOW MARKER
********************************************************************************
-->
<!-- {J1_DOCUMENTATION_MARKER_END} -->
