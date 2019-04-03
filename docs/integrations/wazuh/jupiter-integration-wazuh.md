# Wazuh

## Overview

JupiterOne provides a managed integration with [Wazuh][1]. The integration
connects directly to Wazah Manager APIs to obtain agent information. Customers
authorize access to their self-hosted servers by providing the manager base URL
and a username and password to JupiterOne.

## Integration Instance Configuration

The integration is triggered by an event containing the information for a
specific integration instance.

## Entities

The following entity resources are ingested when the integration runs:

| Example Entity Resource | \_type : \_class of the Entity         |
| ----------------------- | -------------------------------------- |
| Manager                 | `wazuh_manager` : `Service`, `Control` |
| Agent                   | `wazuh_agent` : `HostAgent`            |

## Relationships

The following relationships are created/mapped:

| From            | Type    | To            |
| --------------- | ------- | ------------- |
| `wazuh_manager` | **HAS** | `wazuh_agent` |

[1]: https://wazuh.com
