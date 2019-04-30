# Okta

## Overview

JupiterOne provides a managed integration with Okta. The integration connects
directly to Okta APIs to obtain account metadata and analyze resource
relationships. Customers authorize access by creating an API token in your
target Okta account and providing that credential to JupiterOne.

## Integration Instance Configuration

The integration is triggered by an event containing the information for a
specific integration instance.

Instructions on creating an API token within your Okta account can be found
[here][1].

## Entities

The following entity resources are ingested when the integration runs:

| Okta Entity Resource  | \_type : \_class of the Entity        |
| --------------------- | ------------------------------------- |
| Account               | `okta_account` : `Account`            |
| Service (SSO & MFA)\* | `okta_service` : `Service`, `Control` |
| Application           | `okta_application` : `Application`    |
| Application Group     | `okta_app_user_group` : `UserGroup`   |
| MFA Factor            | `mfa_device` : `[Key,AccessKey]`      |
| Okta Group            | `okta_user_group` : `UserGroup`       |
| User                  | `okta_user` : `User`                  |

_Note: the `Service` entities can later be connected to security policy
procedures as control providers. This mapping establishes evidence that your
organization security policies, procedures and controls are fully implemented,
monitored, and managed._

## Relationships

The following relationships are created/mapped:

|                                                   |
| ------------------------------------------------- |
| `okta_account` **HAS** `okta_application`         |
| `okta_account` **HAS** `okta_service`             |
| `okta_account` **HAS** `okta_user_group`          |
| `okta_user` **ASSIGNED** `okta_application`       |
| `okta_user` **ASSIGNED** `mfa_device`             |
| `okta_user_group` **ASSIGNED** `okta_application` |
| `okta_user_group` **HAS** `okta_user`             |

## Tips

All Okta users are automatically mapped to a `Person` entity as an employee. If
you have service accounts or generic users in Okta, set their `userType`
attribute to `generic` or `service` or `bot` in Okta user profile to skip this
mapping.

This allows you to find non-interactive users with a query like

```j1ql
Find User that !is Person
```

[1]: https://developer.okta.com/docs/api/getting_started/getting_a_token
