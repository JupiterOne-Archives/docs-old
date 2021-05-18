# Integration with JupiterOne

## Heroku + JupiterOne Integration Benefits

- Visualize Heroku teams, users, applications, and services in the JupiterOne graph.
- Map Heroku users to employees in your JupiterOne account.
- Monitor changes to your teams, users, applications, and services using JupiterOne alerts.

## How it Works

- JupiterOne periodically fetches Heroku teams, users, applications, and services to update the graph.
- Write JupiterOne queries to review and monitor updates to the graph.
- Configure alerts to take action when the JupiterOne graph changes.

## Requirements

- JupiterOne requires an API key configured for read access in your Heroku account. 
- You must have permission in JupiterOne to install new integrations.

## Support

If you need help with this integration, please contact
[JupiterOne Support](https://support.jupiterone.io).

## Integration Walkthrough

### In Heroku

Users configure the integration by providing an API key obtained from Heroku:
<https://devcenter.heroku.com/articles/platform-api-quickstart#authentication>.

**Please Note**: the integration currently requires a Heroku Enterprise account.

### In JupiterOne

1. From the configuration **Gear Icon**, select **Integrations**.
2. Scroll to the **Herokue** integration tile and click it.
3. Click the **Add Configuration** button and configure the following settings:
- Enter the **Account Name** by which you'd like to identify this Heroku
   account in JupiterOne. Ingested entities will have this value stored in
   `tag.AccountName` when **Tag with Account Name** is checked.
- Enter a **Description** that will further assist your team when identifying
   the integration instance.
- Select a **Polling Interval** that you feel is sufficient for your monitoring
   needs. You may leave this as `DISABLED` and manually execute the integration.
- Enter the **API Key** configured for read access.
4. Click **Create Configuration** once all values are provided.

## How to Uninstall

1. From the configuration **Gear Icon**, select **Integrations**.
2. Scroll to the **Heroku** integration tile and click it.
3. Identify and click the **integration to delete**.
4. Click the **trash can** icon.
5. Click the **Remove** button to delete the integration.

## Data Model

### Entities

The following entity resources are ingested when the integration runs.

| Resources           | \_type of the Entity    | \_class of the Entity |
| ------------------- | ----------------------- | --------------------- |
| Enterprise Accounts | `heroku_account`        | `Account`             |
| Team                | `heroku_team`           | `Team`                |
| User                | `heroku_account_member` | `User`                |
| Application         | `heroku_application`    | `Application`         |
| Addon               | `heroku_addon`          | `Service`             |

### Relationships

| From                 | Edge     | To                      |
| -------------------- | -------- | ----------------------- |
| `heroku_account`     | **HAS**  | `heroku_team`           |
| `heroku_account`     | **HAS**  | `heroku_account_member` |
| `heroku_team`        | **HAS**  | `heroku_account_member` |
| `heroku_team`        | **OWNS** | `heroku_application`    |
| `heroku_application` | **HAS**  | `heroku_addon`          |
