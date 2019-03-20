# Carbon Black Defense

## Overview

JupiterOne provides a managed integration with Carbon Black (Cb) Defense. The
integration connects directly to CbDefense APIs to obtain configuration about
its device sensors/agents. Customers authorize access by creating a Connector
and an API Key in their target CbDefense account and providing that credential
to JupiterOne.

## Integration Instance Configuration

The integration is triggered by an event containing the information for a
specific integration instance.

The integration instance configuration requires the following three parameters
for API authentication:

- **Site** (`site`): The part immediately follows `defense-` in your CbDefense
  account URL. For example, if you access your account at
  `https://defense-prod05.conferdeploy.net/`, the `site` is `prod05`

- **API Key** (`apiKey`): Go to **Settings > Connectors** from the web console
  of your CbDefense account, then click on **Add Connector** button, give it a
  _Name_, select **API** for the _Connector Type_ to create a connector. The
  **API Key** is displayed to you on screen.

- **Connector ID** (`connectorId`): Once a _Connector_ is created, you will see
  the **Connector ID** on the list.

## Entities

The following entity resources are ingested when the integration runs:

| Example Entity Resource | \_type : \_class of the Entity   |
| ----------------------- | -------------------------------- |
| Account                 | `cbdefense_account` : `Account`  |
| Device Sensor Agent     | `cbdefense_sensor` : `HostAgent` |

## Relationships

The following relationships are created/mapped:

| Relationships                                  |
| ---------------------------------------------- |
| `cbdefense_account` **HAS** `cbdefense_sensor` |
