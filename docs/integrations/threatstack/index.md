# Threat Stack

## Overview

JupiterOne provides a managed integration with Threat Stack. The integration
connects directly to Threat Stack APIs to obtain agents and vulnerability
findings data. Customers authorize access by creating an API Key in their target
Threat Stack account and providing that credential to JupiterOne.

## Integration Instance Configuration

The integration is triggered by an event containing the information for a
specific integration instance.

The integration instance configuration requires the following three parameters
for API authentication:

Go to **Settings > Application Keys** from the web console of your Threat Stack
account, then find the following three values under **REST API Key**, copy/paste
each of them into your integration configuration screen in JupiterOne.

- **Organization Name** (`orgName`)
- **Organization ID** (`orgId`)
- **User ID** (`userId`)
- **API Key** (`apiKey`)

## Entities

The following entity resources are ingested when the integration runs:

| Example Entity Resource | \_type : \_class of the Entity    |
| ----------------------- | --------------------------------- |
| Account                 | `threatstack_account` : `Account` |
| Threat Stack Agent      | `threatstack_agent` : `HostAgent` |

## Relationships

The following relationships are created/mapped:

| Relationships                                     |
| ------------------------------------------------- |
| `threatstack_account` **HAS** `threatstack_agent` |
| `threatstack_agent` **PROTECTS** `aws_instance`   |
| `threatstack_agent` **PROTECTS** `server`         |
| `threatstack_agent` **IDENTIFIED** `cve`          |
