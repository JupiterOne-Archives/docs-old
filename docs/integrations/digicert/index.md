# JupiterOne Managed Integration for DigiCert

## Overview

JupiterOne provides a managed integration for DigiCert. The integration connects
directly to DigiCert REST APIs to obtain certificate details.

## Integration Instance Configuration

The integration is triggered by an event containing the information for a
specific integration instance. Users configure the integration by providing API
credentials obtained through the DigiCert CertCentral account.

DigiCert documentation provides detailed [instructions to enable API access][1].

## Entities

The following entity resources are ingested when the integration runs.

| DigiCert Resources | \_type of the Entity          | \_class of the Entity |
| ------------------ | ----------------------------- | --------------------- |
| Account            | `digicert_account`            | `Account`             |
| Domain Certificate | `digicert_domain_certificate` | `Certificate`         |

## Relationships

The following relationships are created:

| From               | Relationship | To                            |
| ------------------ | ------------ | ----------------------------- |
| `digicert_account` | **HAS**      | `digicert_domain_certificate` |

The following relationships are mapped:

| From     | Relationship | To            |
| -------- | ------------ | ------------- |
| `Domain` | **HAS**      | `Certificate` |

[1]: https://www.digicert.com/rest-api/
