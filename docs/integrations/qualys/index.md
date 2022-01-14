# Integration with JupiterOne

## Qualys + JupiterOne Integration Benefits

- Visualize Qualys scanners and findings in the JupiterOne graph.
- Monitor Checkmarx findings within the alerts app.
- Monitor changes to Checkmarx scanners using JupiterOne alerts.

## How it Works

- JupiterOne periodically fetches Qualys scanners to update the graph.
- Write JupiterOne queries to review and monitor updates to the graph.
- Configure alerts to reduce the noise of findings.

## Requirements

- JupiterOne requires the username and password of a Qualys user that has
  permission to access to the API. JupiterOne also requires the url of the API.
- You must have permission in JupiterOne to install new integrations.

## Support

If you need help with this integration, please contact
[JupiterOne Support](https://support.jupiterone.io).

## Integration Walkthrough

### In Qualys

The Qualys API requires usage of a username and password associated with a user.
Also, by default, trial users do not have access to the Qualys API so you must
request access to the API. See
[Qualys API docs](https://debug.qualys.com/qwebhelp/fo_portal/api_doc/scans/index.htm#t=get_started%2Fget_started.htm)
for more information.

After testing for quite a bit, this integration was unable to ingest host
findings with the built-in READER role event after adding all of the modules.
This may be related to parts of the Qualys "host detection" feature being
controlled by a license setting.

### In JupiterOne

1. From the configuration **Gear Icon**, select **Integrations**.
2. Scroll to the **Qualys** integration tile and click it.
3. Click the **Add Configuration** button and configure the following settings:

- Enter the **Account Name** by which you'd like to identify this Qualys account
  in JupiterOne. Ingested entities will have this value stored in
  `tag.AccountName` when **Tag with Account Name** is checked.
- Enter a **Description** that will further assist your team when identifying
  the integration instance.
- Select a **Polling Interval** that you feel is sufficient for your monitoring
  needs. You may leave this as `DISABLED` and manually execute the integration.
- Enter the **Qualys Username** of a user configured for read access.
- Enter the **Qualys Password** of a user configured for read access.
- Enter the **API URL** for your Qualys account.

4. Click **Create Configuration** once all values are provided.

## How to Uninstall

1. From the configuration **Gear Icon**, select **Integrations**.
2. Scroll to the **Qualys** integration tile and click it.
3. Identify and click the **integration to delete**.
4. Click the **trash can** icon.
5. Click the **Remove** button to delete the integration.

## Troubleshooting Qualys User Credentials

If your integration is not running successfully due to insufficient permissions
from your Qualys user, we have provided a bash script that hits the various
endpoints used in this integration. Using the **USERNAME**, **PASSWORD**, and
**HOSTNAME** that are used in your JupiterOne Qualys Integration configuration,
you should be able to determine which endpoints your user does not have the
appropriate permissions to invoke.

The script can be found here:
https://github.com/JupiterOne/graph-qualys/blob/main/docs/troubleshoot-creds.sh

Please note that while you may receive a status 200 for a particular endpoint,
the response may contain a message indicating your lack of permissions.

Example output:

```
< HTTP/1.1 200
< X-Powered-By: Qualys:USPOD03:b3f3a819-7884-e60e-81d0-9725801da546:cbf7331a-292e-f3ed-8231-200b1fb10047
< Content-Type: application/xml
< Transfer-Encoding: chunked
< Vary: Accept-Encoding
< Date: Fri, 14 Jan 2022 03:55:39 GMT
< Server: Apache
<
<?xml version="1.0" encoding="UTF-8"?>
<ServiceResponse xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:noNamespaceSchemaLocation="https://qualysapi.qg3.apps.qualys.com/qps/xsd/2.0/am/hostasset.xsd">
  <responseCode>UNAUTHORIZED</responseCode>
  <responseErrorDetails>
    <errorMessage>You are not authorized to access the application through the API.</errorMessage>
    <errorResolution>If you think this is an error, please contact your account manager.</errorResolution>
  </responseErrorDetails>
* Connection #0 to host qualysapi.qg3.apps.qualys.com left intact
</ServiceResponse>
```

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

| Resources               | Entity `_type`                 | Entity `_class` |
| ----------------------- | ------------------------------ | --------------- |
| Account                 | `qualys_account`               | `Account`       |
| Host Detection          | `qualys_host_finding`          | `Finding`       |
| Vulnerability Manager   | `qualys_vulnerability_manager` | `Service`       |
| Web App Finding         | `qualys_web_app_finding`       | `Finding`       |
| Web Application Scanner | `qualys_web_app_scanner`       | `Service`       |

### Relationships

The following relationships are created:

| Source Entity `_type`          | Relationship `_class` | Target Entity `_type`          |
| ------------------------------ | --------------------- | ------------------------------ |
| `qualys_account`               | **HAS**               | `qualys_vulnerability_manager` |
| `qualys_account`               | **HAS**               | `qualys_web_app_scanner`       |
| `qualys_host_finding`          | **IS**                | `cve`                          |
| `qualys_host_finding`          | **IS**                | `qualys_vuln`                  |
| `qualys_vulnerability_manager` | **SCANS**             | `aws_instance`                 |
| `qualys_vulnerability_manager` | **SCANS**             | `discovered_host`              |
| `qualys_web_app_finding`       | **IS**                | `cve`                          |
| `qualys_web_app_finding`       | **IS**                | `qualys_vuln`                  |
| `qualys_web_app_scanner`       | **IDENTIFIED**        | `qualys_web_app_finding`       |
| `qualys_web_app_scanner`       | **SCANS**             | `web_app`                      |

<!--
********************************************************************************
END OF GENERATED DOCUMENTATION AFTER BELOW MARKER
********************************************************************************
-->
<!-- {J1_DOCUMENTATION_MARKER_END} -->

## ThreatIntel Mappings

There are two global mapping rules defined to map `ThreatIntel` to `Finding` and
`Vulnerability` entities in Qualys using `qid`.

These global mappings are defined as follows:

| Source Entity `_class` | Source Property | Relationship `_class` | Target Entity `_class` | Target Property |
| ---------------------- | --------------- | --------------------- | ---------------------- | --------------- |
| `ThreatIntel`          | `qid`           | **HAS**               | `Finding`              | `qid`           |
| `ThreatIntel`          | `qid`           | **HAS**               | `Vulnerability`        | `qid`           |
