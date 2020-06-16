# Carbon Black Cloud

## Overview

JupiterOne provides a managed integration for Carbon Black Cloud Platform
(formerly the Predictive Security Cloud, or PSC). The integration connects
directly to Carbon Black APIs to obtain details about device sensors/agents and
active alerts. Customers authorize access by creating a Connector and an API Key
in their target PSC account and providing that credential to JupiterOne.

## Integration Instance Configuration

You must [set up an Access Level and API Key][1] in the Carbon Black Cloud
Console to allow access to the Devices and Alerts APIs.

1. **Settings > API Access > Access Levels: Add Access Level**: Name "JupiterOne
   Read Only" (or match your naming patterns), permissions `device: READ`,
   `org.alerts: READ`, `org.retention: READ`,
1. **Settings > API Access > API Keys: Add API Key**: Name "JupiterOne" (or
   match your naming patterns), Access Level Type "Custom", "JupiterOne Read
   Only". Capture the _API Secret Key_ and _API ID_.

With the Access Level and API Key now configured, you'll need to provide these
parameters to the integration instance configuration:

- **Site/Environment** (`site`): The part immediately following `defense-` in
  your Carbon Black Cloud account URL. For example, if you access your account
  at `https://defense-prod05.conferdeploy.net/`, the `site` is `prod05`.
- **Org Key** (`orgKey`): From **Settings > API Access**, capture the _Org Key_.
- **API ID** (`connectorId`): Captured during API Key creation.
- **API Key** (`apiKey`): Captured during API Key creation.

## Entities

The following entity resources are ingested when the integration runs:

| Example Entity Resource | \_type : \_class of the Entity        |
| ----------------------- | ------------------------------------- |
| Account                 | `carbonblack_psc_account` : `Account` |
| Service                 | `cb_endpoint_protection` : `Service`  |
| Device Sensor Agent     | `cbdefense_sensor` : `HostAgent`      |
| Alert                   | `cbdefense_alert` : `Finding`         |

## Relationships

The following relationships are created/mapped:

| Relationships                                              |
| ---------------------------------------------------------- |
| `carbonblack_psc_account` **HAS** `cbdefense_sensor`       |
| `carbonblack_psc_account` **HAS** `cb_endpoint_protection` |
| `cbdefense_sensor` **ASSIGNED** `cb_sensor_policy`         |
| `cbdefense_sensor` **IDENTIFIED** `cbdefense_alert`        |

[1]:
  https://developer.carbonblack.com/reference/carbon-black-cloud/authentication/
