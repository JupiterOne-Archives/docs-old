# JumpCloud

## Overview

JupiterOne provides a managed integration with JumpCloud. The integration
connects directly to JumpCloud APIs to obtain account metadata and analyze
resource relationships. Customers authorize access by creating an API token in
your target JumpCloud account and providing that credential to JupiterOne.

## Integration Instance Configuration

The integration is triggered by an event containing the information for a
specific integration instance.

Instructions on creating an API token within your JumpCloud account can be found
[here][1].

## Entities

The following entity resources are ingested when the integration runs:

| JumpCloud Entity Resource | \_type : \_class of the Entity                 |
| ------------------------- | ---------------------------------------------- |
| Account/Organization      | `jumpcloud_account` : `Account`,`Organization` |
| User                      | `jumpcloud_user` : `User`                      |
| User Group                | `jumpcloud_user_group` : `UserGroup`           |

## Relationships

The following relationships are created/mapped:

|                                                 |
| ----------------------------------------------- |
| `jumpcloud_account` **HAS** `jumpcloud_user`    |
| `jumpcloud_user_group` **HAS** `jumpcloud_user` |

## Tips

All JumpCloud users are automatically mapped to a `Person` entity as an
employee. If you have service accounts or generic users in JumpCloud, set their
`employeeType` attribute to `generic` or `service` or `bot` in the user profile
to skip this mapping.

This allows you to find non-interactive users with a query like

```j1ql
Find User that !is Person
```

[1]:
  https://docs.jumpcloud.com/2.0/authentication-and-authorization/authentication-and-authorization-overview
