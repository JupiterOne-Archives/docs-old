# Integration with JupiterOne

## WordPress Engine + JupiterOne Integration Benefits

- Visualize WordPress Engine accounts, domains, installs, sites, and user in the
  JupiterOne graph.
- Map WordPress Engine users to employees in your JupiterOne account.
- Monitor changes to WordPress Engine accounts, domains, installs, sites, and
  user using JupiterOne alerts.

## How it Works

- JupiterOne periodically fetches accounts, domains, installs, sites, and user
  from WordPress Engine to update the graph.
- Write JupiterOne queries to review and monitor updates to the graph, or
  leverage existing queries.
- Configure alerts to take action when JupiterOne graph changes, or leverage
  existing alerts.

## Requirements

- WordPress Engine supports Basic Auth. You must generate credentials from the
  [WordPress Engine User Portal](https://my.wpengine.com/api_access).
- You must have permission in JupiterOne to install new integrations.

## Support

If you need help with this integration, please contact
[JupiterOne Support](https://support.jupiterone.io).

## Integration Walkthrough

### In [WordPress Engine](https://my.wpengine.com/)

1. From your dashboard, go to your profile page.
2. Navigate to **API Access**.
3. Click **Generate credentials** button.

### In JupiterOne

1. From the configuration **Gear Icon**, select **Integrations**.
2. Scroll to the **WordPress Engine** integration tile and click it.
3. Click the **Add Configuration** button and configure the following settings:

- Enter the **Account Name** by which you'd like to identify this WordPress
  Engine account in JupiterOne. Ingested entities will have this value stored in
  `tag.AccountName` when **Tag with Account Name** is checked.
- Enter a **Description** that will further assist your team when identifying
  the integration instance.
- Select a **Polling Interval** that you feel is sufficient for your monitoring
  needs. You may leave this as `DISABLED` and manually execute the integration.
- Enter the **WordPress API credentials** generated for use by JupiterOne.

4. Click **Create Configuration** once all values are provided.

# How to Uninstall

1. From the configuration **Gear Icon**, select **Integrations**.
2. Scroll to the **WordPress Engine** integration tile and click it.
3. Identify and click the **integration to delete**.
4. Click the **trash can** icon.
5. Click the **Remove** button to delete the integration.

<!-- {J1_DOCUMENTATION_MARKER_START} -->
<!--
********************************************************************************
NOTE: ALL OF THE FOLLOWING DOCUMENTATION IS GENERATED USING THE
"j1-integration document" COMMAND. DO NOT EDIT BY HAND! PLEASE SEE THE DEVELOPER
DOCUMENTATION FOR USAGE INFORMATION:

https://github.com/JupiterOne/sdk/blob/master/docs/integrations/development.md
********************************************************************************
-->

## Data Model

### Entities

The following entities are created:

| Resources | Entity `_type`      | Entity `_class` |
| --------- | ------------------- | --------------- |
| Account   | `wp_engine_account` | `Account`       |
| Domain    | `wp_engine_domain`  | `Domain`        |
| Install   | `wp_engine_install` | `Application`   |
| Site      | `wp_engine_site`    | `Host`          |
| User      | `wp_engine_user`    | `User`          |

### Relationships

The following relationships are created/mapped:

| Source Entity `_type` | Relationship `_class` | Target Entity `_type` |
| --------------------- | --------------------- | --------------------- |
| `wp_engine_account`   | **HAS**               | `wp_engine_install`   |
| `wp_engine_account`   | **HAS**               | `wp_engine_site`      |
| `wp_engine_install`   | **HAS**               | `wp_engine_domain`    |
| `wp_engine_site`      | **HAS**               | `wp_engine_install`   |
| `wp_engine_user`      | **MANAGES**           | `wp_engine_account`   |

<!--
********************************************************************************
END OF GENERATED DOCUMENTATION AFTER BELOW MARKER
********************************************************************************
-->
<!-- {J1_DOCUMENTATION_MARKER_END} -->
