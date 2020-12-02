# KnowBe4

## Overview

JupiterOne provides a managed integration with KnowBe4. The integration connects
directly to KnowBe4 APIs to obtain account metadata and analyze resource
relationships. You authorize access by providing an API token to the **KnowBe4 Reporting API**.

## Acquiring an API Token
You can generate a new key in your [KnowBe4 Account Settings][] under the API section.
Be sure to request a key for the **Reporting API** not the **User Event API**
KnowBe4 APIs are available to Platinum and Diamond customers.


## Integration Instance Configuration

The integration is triggered by an event containing the information for a
specific integration instance.

## Entities

The following entity resources are ingested when the integration runs:

| Example Entity Resource | \_type : \_class of the Entity           |
| ----------------------- | ---------------------------------------- |
| Account                 | `knowbe4_account` : `Account`            |
| User                    | `knowbe4_user` : `User`                  |
| User Group              | `knowbe4_user_group` : `UserGroup`       |
| Training Campaign       | `training_campaign` : `Training`         |
| Training Module         | `training_module` : `Training`, `Module` |

_Note a training module from KnowBe4 can be either a "Store Purchase" or an
"Uploaded Policy"._

## Relationships

The following relationships are created/mapped:

| From                 | Edge          | To                   |
| -------------------- | ------------- | -------------------- |
| `knowbe4_account`    | **HAS**       | `knowbe4_user`       |
| `knowbe4_account`    | **HAS**       | `knowbe4_user_group` |
| `knowbe4_user_group` | **HAS**       | `knowbe4_user`       |
| `training_campaign`  | **HAS**       | `training_module`    |
| `training_campaign`  | **ASSIGNED**  | `knowbe4_user_group` |
| `training_module`    | **ASSIGNED**  | `knowbe4_user`       |
| `knowbe4_user`       | **COMPLETED** | `training_module`    |

[KnowBe4 Account Settings]: https://training.knowbe4.com/account/info