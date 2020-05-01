# Integration with JupiterOne

## Setup

JupiterOne provides a managed integration for Duo. The integration connects
directly to Duo REST APIs to obtain configuration metadata and analyze resource
relationships.

You will need to create an API key (`integration key` + `secret key`) from your
Duo Admin Panel. You may need to contact Duo Support to request API access. See
instructions in [Duo Support Docs][1].

Configure JupiterOne Duo integration with the `api hostname`, `integration key`,
and `secret key`.

## Data Model

### Entities

The following entity resources are ingested when the integration runs:

| Resources | \_type of the Entity | \_class of the Entity |
| --------- | -------------------- | --------------------- |
| Account   | `duo_account`        | `Account`             |
| Admin     | `duo_admin`          | `User`                |
| Group     | `duo_group`          | `UserGroup`           |
| User      | `duo_user`           | `User`                |
| MFA Token | `mfa_device`         | `AccessKey`           |

### Relationships

The following relationships are created/mapped:

| From          | Relationship | To           |
| ------------- | ------------ | ------------ |
| `duo_account` | **HAS**      | `duo_group`  |
| `duo_account` | **HAS**      | `duo_admin`  |
| `duo_account` | **HAS**      | `duo_user`   |
| `duo_group`   | **HAS**      | `duo_user`   |
| `duo_user`    | **ASSIGNED** | `mfa_device` |

[1]: https://duo.com/docs/adminapi
