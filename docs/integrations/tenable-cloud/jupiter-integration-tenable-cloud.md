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

| Tenable Entity Resource | \_type : \_class of the Entity                   |
| ----------------------- | ------------------------------------------------ |
| Account                 | `tenable_account` : `Account`                    |
| User                    | `tenable_user` : `User`                          |
| Scan                    | `tenable_scan` : `Assessment`                    |
| Asset                   | `tenable_asset` : `Application`                  |
| WebApp vulnerability    | `tenable_webapp_vulnerability` : `Vulnerability` |
| Container               | `tenable_container` : `Image`                    |
| Report                  | `tenable_report` : `Assessment`                  |
| Finding                 | `tenable_finding` : `Vulnerability`              |
| Malware                 | `tenable_malware` : `Vulnerability`              |
| Unwanted program        | `tenable_unwanted_program` : `Vulnerability`     |

## Relationships

The following relationships are created/mapped:

| From                | Type           | To                             |
| ------------------- | -------------- | ------------------------------ |
| `tenable_account`   | **HAS**        | `tenable_user`                 |
| `tenable_user`      | **OWNS**       | `tenable_scan`                 |
| `tenable_scan`      | **HAS**        | `tenable_asset`                |
| `tenable_scan`      | **IDENTIFIED** | `tenable_webapp_vulnerability` |
| `tenable_asset`     | **HAS**        | `tenable_webapp_vulnerability` |
| `tenable_account`   | **HAS**        | `tenable_container`            |
| `tenable_container` | **HAS**        | `tenable_report`               |
| `tenable_report`    | **IDENTIFIED** | `tenable_finding`              |
| `tenable_report`    | **IDENTIFIED** | `tenable_malware`              |
| `tenable_report`    | **IDENTIFIED** | `tenable_unwanted_program`     |

[1]: https://www.tenable.com/products/tenable-io
[2]: https://developer.tenable.com
