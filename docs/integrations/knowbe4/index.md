# Integration with JupiterOne

## KnowBe4 + JupiterOne Integration Benefits

- Visualize KnowBe4 user groups, users, training campaigns, and modules in the
  JupiterOne graph.
- Map KnowBe4 users and their associated trainings to the JupiterOne employee.
- Monitor changes to user groups, users, training campaigns, and modules using
  JupiterOne alerts.

## How it Works

- JupiterOne periodically fetches KnowBe4 groups, users, and trainings to update
  the graph.
- Write JupiterOne queries to review and monitor updates to the graph.
- Configure alerts to take action when the JupiterOne graph changes.

## Requirements

- JupiterOne requires the site for where your account is located and an API
  key/token.
- You must have permission in JupiterOne to install new integrations.

## Support

If you need help with this integration, please contact
[JupiterOne Support](https://support.jupiterone.io).

## Integration Walkthrough

### In KnowBe4

You can generate a new key in your
[KnowBe4 Account Settings](https://training.knowbe4.com/account/info) under the
API section. Be sure to request a key for the **Reporting API** not the **User
Event API**. KnowBe4 APIs are available to Platinum and Diamond customers. See
the [KnowBe4 API Reference Guide](https://developer.knowbe4.com/reporting/) for
more info.

### In JupiterOne

1. From the configuration **Gear Icon**, select **Integrations**.
2. Scroll to the **KnowBe4** integration tile and click it.
3. Click the **Add Configuration** button and configure the following settings:

- Enter the **Account Name** by which you'd like to identify this KnowBe4
  account in JupiterOne. Ingested entities will have this value stored in
  `tag.AccountName` when **Tag with Account Name** is checked.
- Enter a **Description** that will further assist your team when identifying
  the integration instance.
- Select a **Polling Interval** that you feel is sufficient for your monitoring
  needs. You may leave this as `DISABLED` and manually execute the integration.
- Enter the **Site** of your KnowBe4 account, either US or EU.
- Enter the **API Key** configured in your KnowBe4 account.

4. Click **Create Configuration** once all values are provided.

## How to Uninstall

1. From the configuration **Gear Icon**, select **Integrations**.
2. Scroll to the **KnowBe4** integration tile and click it.
3. Identify and click the **integration to delete**.
4. Click the **trash can** icon.
5. Click the **Remove** button to delete the integration.

[knowbe4 account settings]: https://training.knowbe4.com/account/info

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

| Resources                 | Entity `_type`       | Entity `_class`      |
| ------------------------- | -------------------- | -------------------- |
| KnowBe4 Account           | `knowbe4_account`    | `Account`            |
| KnowBe4 Group             | `knowbe4_user_group` | `UserGroup`          |
| KnowBe4 Training Campaign | `training_campaign`  | `Training`           |
| KnowBe4 Training Module   | `training_module`    | `Training`, `Module` |
| KnowBe4 User              | `knowbe4_user`       | `User`               |

### Relationships

The following relationships are created/mapped:

| Source Entity `_type` | Relationship `_class` | Target Entity `_type` |
| --------------------- | --------------------- | --------------------- |
| `knowbe4_account`     | **HAS**               | `knowbe4_user`        |
| `knowbe4_account`     | **HAS**               | `knowbe4_user_group`  |
| `knowbe4_user_group`  | **HAS**               | `knowbe4_user`        |
| `training_campaign`   | **ASSIGNED**          | `knowbe4_user_group`  |
| `training_campaign`   | **HAS**               | `training_module`     |
| `training_module`     | **ASSIGNED**          | `knowbe4_user`        |
| `knowbe4_user`        | **COMPLETED**         | `training_module`     |

<!--
********************************************************************************
END OF GENERATED DOCUMENTATION AFTER BELOW MARKER
********************************************************************************
-->
<!-- {J1_DOCUMENTATION_MARKER_END} -->
