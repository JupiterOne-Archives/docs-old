# Veracode

## Overview

JupiterOne provides a managed integration with Veracode. The integration
connects directly to Veracode APIs to obtain Vulnerability and Finding metadata
and analyze resource relationships. Customers authorize access by creating an
API ID and secret in the their target Veracode account and providing those
credentials to JupiterOne.

## Integration Instance Configuration

The integration is triggered by an event containing the information for a
specific integration instance.

The integration instance configuration requires the customer's API ID and secret
to authenticate requests to the Veracode REST APIs. Veracode provides [detailed
instructions for obtaining these credentials][1].

[1]: https://help.veracode.com/reader/lsoDk5r2cv~YrwLQSI7lfw/6UdIc6di0T5_Lo6qTHTpNA

## Entities

The following entity resources are ingested when the integration runs:

| Veracode Entity Resource | \_type : \_class of the Entity             |
| ------------------------ | ------------------------------------------ |
| Account                  | `veracode_account` : `Account`             |
| Scan Type                | `veracode_scan` : `Service`                |
| CWE                      | `cwe` : `Weakness`                         |
| Vulnerability            | `veracode_vulnerability` : `Vulnerability` |
| Finding                  | `veracode_finding` : `Vulnerability`       |

## Relationships

The following relationships are created/mapped:

### Basic relationships within the integration instance account/resources

|
| --
| `veracode_account` **HAS** `veracode_scan`
| `veracode_scan` **IDENTIFIED** `veracode_vulnerability`
| `veracode_vulnerability` **EXPLOITS** `cwe`
| `veracode_finding` **IS** `veracode_vulnerability`

### Connections to broader entity resources

|
| --
| `CodeRepo/Project/Application` **HAS/HAD** `veracode_finding` <br> Note: This is mapped automatically only when the name of the Veracode Application the finding belongs to matches the name of a CodeRepo/Project/Application in JupiterOne.
