# JupiterOne Managed Integration for Cisco AMP

## Overview

JupiterOne provides a managed integration for Cisco AMP for Endpoints. The
integration connects directly to [Cisco AMP for Endpoints REST API][1] to obtain
endpoint protection and configuration information.

Configure the integration by providing the following details:

- API Endpoint (Hostname)
- API Client ID
- API Key

Valid API Endpoints include:

- `api.amp.cisco.com`
- `api.apjc.amp.cisco.com`
- `api.eu.amp.cisco.com`

To generating Client ID and API Key:

- Log in to your **AMP for Endpoints Console**.
- Go to **Accounts** > **API Credentials**.
- Click **New API Credentials** to generate the Client ID and secure API Key.

## Entities

The following entity resources are ingested when the integration runs.

| Cisco AMP Resources | \_type of the Entity | \_class of the Entity |
| ------------------- | -------------------- | --------------------- |
| Account             | `cisco_amp_account`  | `Account`             |
| Computer            | `cisco_amp_endpoint` | `HostAgent`           |

## Relationships

The following relationships are created:

| From                | Relationship | To                   |
| ------------------- | ------------ | -------------------- |
| `cisco_amp_account` | **HAS**      | `cisco_amp_endpoint` |

The following relationships are mapped:

| From                 | Relationship | To              |
| -------------------- | ------------ | --------------- |
| `cisco_amp_endpoint` | **Protects** | `user_endpoint` |

[1]: https://api-docs.amp.cisco.com/
