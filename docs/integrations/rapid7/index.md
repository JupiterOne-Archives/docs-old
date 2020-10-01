# Integration with JupiterOne

## Setup

In this section, please provide details about how to set up the integration with
JupiterOne. This may require provisioning some resources on the provider's side
(perhaps a role, app, or api key) and passing information over to JupiterOne.

## Data Model

Provide an overview here of the resources collected from the integration. Please
provide a mapping of how the resources collected map to the JupiterOne Data
Model. The tables below were taken from the Azure integration to provide an
example of how to display that information.

When you start developing an integration, please clear out the tables below. As
you add support for new entities and relationships, please update the tables and
document the addition in the [CHANGELOG.md](../CHANGELOG.md) file at the root of
the project.

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

| Resources | Entity `_type` | Entity `_class` |
| --------- | -------------- | --------------- |
| Account   | `acme_account` | `Account`       |

### Relationships

The following relationships are created/mapped:

| Source Entity `_type` | Relationship `_class` | Target Entity `_type` |
| --------------------- | --------------------- | --------------------- |
| `acme_account`        | **HAS**               | `acme_user`           |
| `acme_account`        | **HAS**               | `acme_group`          |
| `acme_group`          | **HAS**               | `acme_user`           |

<!--
********************************************************************************
END OF GENERATED DOCUMENTATION AFTER BELOW MARKER
********************************************************************************
-->
<!-- {J1_DOCUMENTATION_MARKER_END} -->
