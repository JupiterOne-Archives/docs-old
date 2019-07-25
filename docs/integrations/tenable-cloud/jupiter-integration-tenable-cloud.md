# Tenable Cloud

## Overview

JupiterOne provides a managed integration with [Tenable.io][1], the Cloud
Managed Tenable Platform. The integration connects directly to [Tenable Cloud
APIs][2] to obtain account metadata, vulnerability information, and application
scan results for ingestion into JupiterOne. Customers authorize access by
providing API keys to JupiterOne.

## Integration Instance Configuration

The integration is triggered by an event containing the information for a
specific integration instance, including the API access key and secret key
provided by the user.

## Entities

The following entity resources are ingested when the integration runs:

| Tenable Entity Resource    | \_type : \_class of the Entity                   |
| -------------------------- | ------------------------------------------------ |
| Account                    | `tenable_account` : `Account`                    |
| User                       | `tenable_user` : `User`                          |
| Scan                       | `tenable_scan` : [`Assessment`,`Service`]        |
| Scan Vulnerability         | `tenable_scan_finding` : `Finding`               |
| Vulnerability              | `tenable_vulnerability` : `Vulnerability`        |
| Asset                      | `tenable_asset` : `Application`                  |
| Container                  | `tenable_container` : `Image`                    |
| Container Finding          | `tenable_container_finding` : `Finding`          |
| Container Report           | `tenable_container_report` : `Assessment`        |
| Container Malware          | `tenable_container_malware` : `Finding`          |
| Container Unwanted Program | `tenable_container_unwanted_program` : `Finding` |

## Relationships

The following relationships are created/mapped:

| From                            | Type           | To                                   |
| ------------------------------- | -------------- | ------------------------------------ |
| `tenable_account`               | **HAS**        | `tenable_user`                       |
| `tenable_account`               | **HAS**        | `tenable_container`                  |
| `tenable_account`               | **HAS**        | `tenable_user`                       |
| `tenable_asset`                 | **HAS**        | `tenable_vulnerability_finding`      |
| `tenable_user`                  | **OWNS**       | `tenable_scan`                       |
| `tenable_scan`                  | **HAS**        | `tenable_asset`                      |
| `tenable_scan`                  | **IDENTIFIED** | `tenable_vulnerability`              |
| `tenable_scan`                  | **IDENTIFIED** | `tenable_vulnerability_finding`      |
| `tenable_vulnerability_finding` | **IS**         | `tenable_vulnerability`              |
| `tenable_container`             | **HAS**        | `tenable_container_report`           |
| `tenable_container_report`      | **IDENTIFIED** | `tenable_container_finding`          |
| `tenable_container_report`      | **IDENTIFIED** | `tenable_container_malware`          |
| `tenable_container_report`      | **IDENTIFIED** | `tenable_container_unwanted_program` |

[1]: https://www.tenable.com/products/tenable-io
[2]: https://developer.tenable.com
