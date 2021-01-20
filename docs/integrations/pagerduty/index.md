# Integration with JupiterOne

## PagerDuty + JupiterOne Integration Benefits

- Visualize PagerDuty services, teams, and users in the JupiterOne graph.
- PagerDuty users will be mapped to employees in your JupiterOne account.
- Monitor changes to PagerDuty users using JupiterOne alerts.
- Produce compliance evidence of system/service monitoring and on-call escalation.

## How it Works

- JupiterOne periodically fetches services, teams, and users from PagerDuty to
  update the graph.
- Write JupiterOne queries to review and monitor updates to the graph.
- Configure alerts to take action when JupiterOne graph changes.

## Requirements

- JupiterOne requires a PagerDuty General Access REST API key

## Support

If you need help with this integration, please contact
[JupiterOne Support](https://support.jupiterone.io).

## Integration Walkthrough

### In PagerDuty

- [Generate a General Access REST API key](https://support.pagerduty.com/docs/generating-api-keys#section-generating-a-general-access-rest-api-key)

### In JupiterOne

1. From the configuration **Gear Icon**, select **Integrations**.
2. Scroll to the **PagerDuty** integration tile and click it.
3. Click the **Add Configuration** button.
4. Enter the **Account Name** by which you'd like to identify this PagerDuty
   account in JupiterOne. Ingested entities will have this value stored in
   `tag.AccountName` when **Tag with Account Name** is checked.
5. Enter a **Description** that will help your team further identify
6. Select a **Polling Interval** that you feel is sufficient for your monitoring
   needs. You may leave this as `DISABLED` and manually execute the integration.
7. Enter the **PagerDuty API Key** generated for use by JupiterOne.
8. Click **Create Configuration** once all values are provided.

# How to Uninstall

1. From the configuration **Gear Icon**, select **Integrations**.
2. Scroll to the **PagerDuty** integration tile and click it.
3. Identify and click the **integration to delete**.
4. Click the **trash can** icon.
5. Click the **Remove** button to delete the integration.

## Data Model

### Entities

The following entity resources are ingested when the integration runs.

| Resources | \_type of the Entity | \_class of the Entity |
| --------- | -------------------- | --------------------- |
| Teams     | `pagerduty_team`     | `Team`                |
| User      | `pagerduty_user`     | `User`                |
| Service   | `pagerduty_service`  | `Service`             |

### Relationships

| From             | Edge         | To                  |
| ---------------- | ------------ | ------------------- |
| `pagerduty_team` | **HAS**      | `pagerduty_user`    |
| `pagerduty_team` | **ASSIGNED** | `pagerduty_service` |
| `pagerduty_user` | **ONCALL**   | `pagerduty_service` |
