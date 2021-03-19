# Integration with JupiterOne

## Setup

JupiterOne provides a managed integration for Duo. The integration connects
directly to Duo REST APIs to obtain configuration metadata and analyze resource
relationships.

You will need to create an API key (`Integration Key` + `Secret Key`) from your
Duo Admin Panel. You may need to contact Duo Support to request API access. See
up-to-date instructions in [Duo Support Docs][1].

### Required API Permissions

JupiterOne requires at a minimum the following API permissions be enabled:

- Grant administrators
- Grant settings
- Grant read resource

### JupiterOne Configuration

Configure the Duo integration in JupiterOne by copying over the `API Hostname`,
`Integration Key`, and `Secret Key` from Duo.

[1]: https://duo.com/docs/adminapi

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

| Resources   | Entity `_type`    | Entity `_class` |
| ----------- | ----------------- | --------------- |
| Account     | `duo_account`     | `Account`       |
| Admin       | `duo_admin`       | `User`          |
| Device      | `duo_phone`       | `Device`        |
| Group       | `duo_group`       | `UserGroup`     |
| Integration | `duo_integration` | `Application`   |
| MFA Token   | `mfa_device`      | `AccessKey`     |
| User        | `duo_user`        | `User`          |

### Relationships

The following relationships are created/mapped:

| Source Entity `_type` | Relationship `_class` | Target Entity `_type` |
| --------------------- | --------------------- | --------------------- |
| `duo_account`         | **HAS**               | `duo_admin`           |
| `duo_account`         | **HAS**               | `duo_group`           |
| `duo_account`         | **HAS**               | `duo_integration`     |
| `duo_account`         | **HAS**               | `duo_user`            |
| `duo_group`           | **HAS**               | `duo_user`            |
| `duo_user`            | **ASSIGNED**          | `mfa_device`          |
| `duo_user`            | **USES**              | `duo_phone`           |

<!--
********************************************************************************
END OF GENERATED DOCUMENTATION AFTER BELOW MARKER
********************************************************************************
-->
<!-- {J1_DOCUMENTATION_MARKER_END} -->
