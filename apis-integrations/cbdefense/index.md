# Integration with JupiterOne

## Carbon Black Cloud + JupiterOne Integration Benefits

- Visualize Carbon Black endpoint agents and findings on corresponding devices
  in the JupiterOne graph.
- Map Carbon Black endpoint agents to devices and devices to the employee who is
  the owner.
- Monitor Carbon Black findings within the alerts app.
- Monitor changes to Carbon Black endpoints using JupiterOne alerts.

## How it Works

- JupiterOne periodically fetches new findings from Carbon Black to update the
  graph.
- Configure alerts to reduce the noise of findings.

## Requirements

- JupiterOne requires the deployment site and org key of your account as well as
  a configured API key and id with the proper permissions.
- You must have permission in JupiterOne to install new integrations.

## Support

If you need help with this integration, please contact
[JupiterOne Support](https://support.jupiterone.io).

## Integration Walkthrough

JupiterOne provides a managed integration for Carbon Black Cloud Platform
(formerly the Predictive Security Cloud, or PSC). The integration connects
directly to Carbon Black APIs to obtain details about device sensors/agents and
active alerts. Customers authorize access by creating a Connector and an API Key
in their target PSC account and providing that credential to JupiterOne.

### In Carbon Black

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

- **Deployment Site/Environment** (`site`): The part immediately following
  `defense-` in your Carbon Black Cloud account URL. For example, if you access
  your account at `https://defense-prod05.conferdeploy.net/`, the `site` is
  `prod05`.
- **Org Key** (`orgKey`): From **Settings > API Access**, capture the _Org Key_.
- **API ID** (`connectorId`): Captured during API Key creation.
- **API Key** (`apiKey`): Captured during API Key creation.

### In JupiterOne

1. From the configuration **Gear Icon**, select **Integrations**.
2. Scroll to the **Carbon Black PSC** integration tile and click it.
3. Click the **Add Configuration** button and configure the following settings:

- Enter the **Account Name** by which you'd like to identify this Carbon Black
  account in JupiterOne. Ingested entities will have this value stored in
  `tag.AccountName` when **Tag with Account Name** is checked.
- Enter a **Description** that will further assist your team when identifying
  the integration instance.
- Select a **Polling Interval** that you feel is sufficient for your monitoring
  needs. You may leave this as `DISABLED` and manually execute the integration.
- Enter the **Deployent Site** from the URL in the Carbon Black Cloud Console.
- Enter the **Org Key** from the Carbon Black Cloud Console.
- Enter the **API ID** configured for JupiterOne.
- Enter the **API Key** configured for JupiterOne.

4. Click **Create Configuration** once all values are provided.

## How to Uninstall

1. From the configuration **Gear Icon**, select **Integrations**.
2. Scroll to the **Carbon Black PSC** integration tile and click it.
3. Identify and click the **integration to delete**.
4. Click the **trash can** icon.
5. Click the **Remove** button to delete the integration.

[1]:
  https://developer.carbonblack.com/reference/carbon-black-cloud/authentication/

<!-- {J1_DOCUMENTATION_MARKER_START} -->
<!--
********************************************************************************
NOTE: ALL OF THE FOLLOWING DOCUMENTATION IS GENERATED USING THE
"j1-integration document" COMMAND. DO NOT EDIT BY HAND! PLEASE SEE THE DEVELOPER
DOCUMENTATION FOR USAGE INFORMATION:

https://github.com/JupiterOne/sdk/blob/main/docs/integrations/development.md
********************************************************************************
-->

## Data Model

### Entities

The following entities are created:

| Resources           | Entity `_type`            | Entity `_class` |
| ------------------- | ------------------------- | --------------- |
| Account             | `carbonblack_psc_account` | `Account`       |
| Alert               | `cbdefense_alert`         | `Finding`       |
| Device Sensor Agent | `cbdefense_sensor`        | `HostAgent`     |
| Service             | `cb_endpoint_protection`  | `Service`       |

### Relationships

The following relationships are created/mapped:

| Source Entity `_type`     | Relationship `_class` | Target Entity `_type`    |
| ------------------------- | --------------------- | ------------------------ |
| `carbonblack_psc_account` | **HAS**               | `cb_endpoint_protection` |
| `carbonblack_psc_account` | **HAS**               | `cbdefense_sensor`       |
| `cbdefense_sensor`        | **IDENTIFIED**        | `cbdefense_alert`        |

### Mapped Relationships

The following mapped relationships are created:

| Source Entity `_type` | Relationship `_class` | Target Entity `_type` | Direction |
| --------------------- | --------------------- | --------------------- | --------- |
| `cbdefense_sensor`    | **PROTECTS**          | `*user_endpoint*`     | FORWARD   |

<!--
********************************************************************************
END OF GENERATED DOCUMENTATION AFTER BELOW MARKER
********************************************************************************
-->
<!-- {J1_DOCUMENTATION_MARKER_END} -->
