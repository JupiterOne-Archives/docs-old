# VMWware AirWatch

## Overview

The integration connects directly to AirWatch APIs to obtain account metadata
and analyze resource relationships. Customers authorize access by creating API
credentials in their AirWatch account and providing those credentials when
setting up an instance of the integration in JupiterOne.

## API Authentication

AirWatch provides
[detailed instructions on creating an API credentials](https://resources.workspaceone.com/view/zv5cgwjrcv972rd6fmml/en).
(Page: 32/1240).

## Entities

These entities are ingested when the integration runs:

| Example Entity Resource | \_type : \_class of the Entity        |
| ----------------------- | ------------------------------------- |
| Account                 | `airwatch_account` : `Account`        |
| Admin                   | `airwatch_user` : `User`              |
| OrganizationGroup       | `airwatch_group` : `Group, UserGroup` |
| Device                  | `user_endpoint` : `Device`            |
| User                    | `device_user` : `User`                |

## Relationships

These relationships are created/mapped:

| From               | Type        | To               |
| ------------------ | ----------- | ---------------- |
| `airwatch_account` | **HAS**     | `airwatch_group` |
| `airwatch_account` | **MANAGES** | `user_endpoint`  |
| `airwatch_group`   | **HAS**     | `airwatch_user`  |
| `user_endpoint`    | **HAS**     | `device_user`    |