# Carbon Black PSC

## Overview

JupiterOne provides a managed integration with Carbon Black (Cb) Predictive
Security Cloud (PSC). The integration connects directly to Carbon Black PSC APIs
to obtain configuration about its device sensors/agents, starting with Cb
Defense sensors. Customers authorize access by creating a Connector and an API
Key in their target PSC account and providing that credential to JupiterOne.

## Integration Instance Configuration

The integration is triggered by an event containing the information for a
specific integration instance.

The integration instance configuration requires the following three parameters
for API authentication:

- **Site** (`site`): The part immediately follows `defense-` in your Carbon
  Black PSC / CbDefense account URL. For example, if you access your account at
  `https://defense-prod05.conferdeploy.net/`, the `site` is `prod05`

- **API Key** (`apiKey`): Go to **Settings > Connectors** from the web console
  of your Carbon Black account, then click on **Add Connector** button, give it
  a _Name_, select **API** for the _Connector Type_ to create a connector. The
  **API Key** is displayed to you on screen.

- **Connector ID** (`connectorId`): Once a _Connector_ is created, you will see
  the **Connector ID** on the list.

## Entities

The following entity resources are ingested when the integration runs:

| Example Entity Resource | \_type : \_class of the Entity        |
| ----------------------- | ------------------------------------- |
| Account                 | `carbonblack_psc_account` : `Account` |
| Service                 | `cb_endpoint_protection` : `Service`  |
| Device Sensor Agent     | `cbdefense_sensor` : `HostAgent`      |
| Sensor Policy           | `cb_sensor_policy` : `ControlPolicy`  |

## Relationships

The following relationships are created/mapped:

| Relationships                                              |
| ---------------------------------------------------------- |
| `carbonblack_psc_account` **HAS** `cbdefense_sensor`       |
| `carbonblack_psc_account` **HAS** `cb_endpoint_protection` |
| `cb_sensor_policy` **ENFORCES** `cb_endpoint_protection`   |
| `cbdefense_sensor` **ASSIGNED** `cb_sensor_policy`         |
