# Integration with JupiterOne

## GoDaddy + JupiterOne Integration Benefits

- Visualize GoDaddy domains and domain records in the JupiterOne graph.
- Monitor changes to GoDaddy domains and domain records using JupiterOne alerts.

## How it Works

- JupiterOne periodically fetches domains and domain records from GoDaddy to
  update the graph.
- Write JupiterOne queries to review and monitor updates to the graph, or
  leverage existing queries.
- Configure alerts to take action when the JupiterOne graph changes, or leverage
  existing alerts.

## Requirements

- JupiterOne requires a GoDaddy customer number (shopper ID), API key, and API
  secret to interact with the API.
- You must have permission in JupiterOne to install new integrations.

## Support

If you need help with this integration, please contact
[JupiterOne Support](https://support.jupiterone.io).

## Integration Walkthrough

### In GoDaddy

To conigure this integration you should have an account in GoDaddy and create an
**API Key**. You will also need the **API Key Secret** and the **Customer Number
(Shopper ID)**.

- The **API Key** and **Secret** can be created from
  https://developer.godaddy.com/keys

- The **Customer Number (Shopper ID)** can be obtained for your account on the
  GoDaddy web console.

### In JupiterOne

1. From the configuration **Gear Icon**, select **Integrations**.
2. Scroll to the **GoDaddy** integration tile and click it.
3. Click the **Add Configuration** button and configure the following settings:

- Enter the **Account Name** by which you'd like to identify this GoDaddy
  account in JupiterOne. Ingested entities will have this value stored in
  `tag.AccountName` when **Tag with Account Name** is checked.
- Enter a **Description** that will further assist your team when identifying
  the integration instance.
- Select a **Polling Interval** that you feel is sufficient for your monitoring
  needs. You may leave this as `DISABLED` and manually execute the integration.
- Enter the **Customer Number / Shopper ID** for your GoDaddy account.
- Enter the **API Key** configured in GoDaddy for API access.
- Enter the **API Key Secret** configured in GoDaddy for API access.

4. Click **Create Configuration** once all values are provided.

## How to Uninstall

1. From the configuration **Gear Icon**, select **Integrations**.
2. Scroll to the **GoDaddy** integration tile and click it.
3. Identify and click the **integration to delete**.
4. Click the **trash can** icon.
5. Click the **Remove** button to delete the integration.

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

| Resources    | Entity `_type`          | Entity `_class` |
| ------------ | ----------------------- | --------------- |
| Account      | `godaddy_account`       | `Account`       |
| Domain       | `godaddy_domain`        | `Domain`        |
| DomainRecord | `godaddy_domain_record` | `DomainRecord`  |

### Relationships

The following relationships are created:

| Source Entity `_type` | Relationship `_class` | Target Entity `_type`   |
| --------------------- | --------------------- | ----------------------- |
| `godaddy_account`     | **HAS**               | `godaddy_domain`        |
| `godaddy_domain`      | **HAS**               | `godaddy_domain_record` |

<!--
********************************************************************************
END OF GENERATED DOCUMENTATION AFTER BELOW MARKER
********************************************************************************
-->
<!-- {J1_DOCUMENTATION_MARKER_END} -->
