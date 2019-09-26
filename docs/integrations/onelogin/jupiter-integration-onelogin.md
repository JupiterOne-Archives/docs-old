# OneLogin

## Overview

JupiterOne provides a managed integration with OneLogin. The integration
connects directly to OneLogin APIs to obtain account metadata and analyze
resource relationships. Customers authorize access by creating an API token in
your target OneLogin account and providing that credential to JupiterOne.

## Integration Instance Configuration

The integration is triggered by an event containing the information for a
specific integration instance.

Instructions on creating an API token within your OneLogin account can be found
[here][1].

## Entities

The following entity resources are ingested when the integration runs:

| OneLogin Entity Resource | \_type : \_class of the Entity                  |
| ------------------------ | ----------------------------------------------- |
| Account                  | `onelogin_account` : `Account`                  |
| Group                    | `onelogin_group` : `UserGroup`                  |
| OneLogin Role            | `onelogin_role` : `AccessRole`                  |
| User                     | `onelogin_user` : `User`                        |
| App                      | `onelogin_application` : `Application`          |
| Personal App             | `onelogin_personal_application` : `Application` |
| Personal Device          | `mfa_device` : `[Key, AccessKey]`               |
| Service (SSO & MFA)      | `onelogin_service` : `['Service', 'Control']`   |

## Relationships

The following relationships are created/mapped:

| From               | Type         | To                              |
| ------------------ | ------------ | ------------------------------- |
| `onelogin_account` | **HAS**      | `onelogin_group`                |
| `onelogin_account` | **HAS**      | `onelogin_role`                 |
| `onelogin_account` | **HAS**      | `onelogin_user`                 |
| `onelogin_account` | **HAS**      | `onelogin_application`          |
| `onelogin_account` | **HAS**      | `onelogin_service`              |
| `onelogin_user`    | **ASSIGNED** | `onelogin_application`          |
| `onelogin_user`    | **ASSIGNED** | `onelogin_group`                |
| `onelogin_user`    | **HAS**      | `onelogin_personal_application` |
| `onelogin_user`    | **ASSIGNED** | `onelogin_role`                 |
| `onelogin_user`    | **ASSIGNED** | `mfa_device`                    |
| `onelogin_group`   | **HAS**      | `onelogin_user`                 |

[1]:
  https://developers.onelogin.com/api-docs/1/getting-started/working-with-api-credentials
