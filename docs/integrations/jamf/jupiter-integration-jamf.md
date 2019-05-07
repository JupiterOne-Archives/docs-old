# jamf

## Overview

JupiterOne provides a managed integration with jamf. The integration connects
directly to jamf APIs to obtain account metadata and analyze resource
relationships. Customers authorize access by Basic Authentication with their
target jamf account and providing that credential to JupiterOne.

## Integration Instance Configuration

The integration is triggered by an event containing the information for a
specific integration instance.

jamf provides [detailed instructions on creating credentials][1].

## Entities

The following entity resources are ingested when the integration runs:

| Entity Resource | \_type : \_class of the Entity  |
| --------------- | ------------------------------- |
| Account         | `jamf_account` : `Account`      |
| User            | `jamf_user` : `User`            |
| MobileDevice    | `jamf_mobile_device` : `Device` |
| Computer        | `jamf_computer` : `Device`      |

## Relationships

The following relationships are created/mapped:

| From           | Edge    | To                   |
| -------------- | ------- | -------------------- |
| `jamf_account` | **HAS** | `jamf_user`          |
| `jamf_user`    | **HAS** | `jamf_mobile_device` |
| `jamf_user`    | **HAS** | `jamf_computer`      |

[1]: https://developer.jamf.com/documentation#authentication
