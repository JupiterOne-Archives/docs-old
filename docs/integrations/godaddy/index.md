# Integration with JupiterOne

## Setup

JupiterOne provides a managed integration for GoDaddy. The integration connects
directly to GoDaddy APIs to obtain domain related data.

To conigure this integration you should have an account in GoDaddy and create an
**API Key**. You will also need the **API Key Secret** and the **Customer Number
(Shopper ID)**.

- The **API Key** and **Secret** can be created from
  https://developer.godaddy.com/keys

- The **Customer Number (Shopper ID)** can be obtained for your account on the
  GoDaddy web console.

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

| Resources    | Entity `_type`          | Entity `_class` |
| ------------ | ----------------------- | --------------- |
| Account      | `godaddy_account`       | `Account`       |
| Domain       | `godaddy_domain`        | `Domain`        |
| DomainRecord | `godaddy_domain_record` | `DomainRecord`  |

### Relationships

The following relationships are created/mapped:

| Source Entity `_type` | Relationship `_class` | Target Entity `_type`   |
| --------------------- | --------------------- | ----------------------- |
| `godaddy_account`     | **HAS**               | `godaddy_domain`        |
| `godaddy_domain`      | **HAS**               | `godaddy_domain_record` |

<!--
********************************************************************************
END OF GENERATED DOCUMENTATION AFTER BELOW MARKER
********************************************************************************
-->
<!-- {J1_DOCUMENTATION_MARKER_END} -->
