# Integration with JupiterOne

## Setup

JupiterOne provides a managed integration for Fastly. The integration connects
directly to Fastly APIs to obtain account, access, and services related data. To
conigure this integration you should have an account in Fastly and create an
**API Token** with Read-only access (`global:read`). You will also need the
**Customer ID** from the settings page of your Fastly account.

- The **Customer ID** can be obtained from
  https://manage.fastly.com/account/company

- The **API Token** can be created from
  https://manage.fastly.com/account/personal/tokens

## Data Model

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

| Resources       | Entity `_type`           | Entity `_class`       |
| --------------- | ------------------------ | --------------------- |
| Account         | `fastly_account`         | `Account`             |
| User            | `fastly_user`            | `User`                |
| API Token       | `fastly_api_token`       | `AccessKey`           |
| Service         | `fastly_service`         | `Service`             |
| Service Backend | `fastly_service_backend` | `ApplicationEndpoint` |

### Relationships

The following relationships are created/mapped:

| Source Entity `_type`    | Relationship `_class` | Target Entity `_type`    |
| ------------------------ | --------------------- | ------------------------ |
| `fastly_account`         | **HAS**               | `fastly_user`            |
| `fastly_account`         | **HAS**               | `fastly_api_token`       |
| `fastly_user`            | **HAS**               | `fastly_api_token`       |
| `fastly_account`         | **HAS**               | `fastly_service`         |
| `fastly_service`         | **HAS**               | `fastly_service_backend` |
| `fastly_service_backend` | **CONNECTS**          | `Host or Gateway`        |
| `fastly_service`         | **CONNECTS**          | `DomainRecord`           |

<!--
********************************************************************************
END OF GENERATED DOCUMENTATION AFTER BELOW MARKER
********************************************************************************
-->
<!-- {J1_DOCUMENTATION_MARKER_END} -->
