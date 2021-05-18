# Integration with JupiterOne

## Snowflake + JupiterOne Integration Benefits

- Visualize Snowflake cloud resources in the JupiterOne graph.
- Map Snowflake users to employees in your JupiterOne account.
- Monitor visibility and governance of your Snowflake cloud environment by
  leveraging hundreds of out of the box queries.
- Monitor changes to Snowflake cloud resources using JupiterOne alerts.

## How it Works

- JupiterOne periodically fetches Snowflake cloud resources to update the graph.
- Write JupiterOne queries to review and monitor updates to the graph.
- Configure alerts to take action when the JupiterOne graph changes.

## Requirements

- JupiterOne requires the full name of your Snowflake account. JupiterOne also requires
 a user's username and password, and the default security role to assume once connected to the session.
- You must have permission in JupiterOne to install new integrations.

## Support

If you need help with this integration, please contact
[JupiterOne Support](https://support.jupiterone.io).

## Integration Walkthrough

### In Snowflake

The integration ingests resources from tables in the Snowflake system using `SHOW`
commands. The credentials provided to JupiterOne must be configured with the
[read permissions required to perform these commands](https://docs.snowflake.com/en/user-guide/security-access-control-privileges.html#schema-privileges).

### In JupiterOne

1. From the configuration **Gear Icon**, select **Integrations**.
2. Scroll to the **Snowflake** integration tile and click it.
3. Click the **Add Configuration** button and configure the following settings:
- Enter the **Account Name** by which you'd like to identify this Snowflake
   account in JupiterOne. Ingested entities will have this value stored in
   `tag.AccountName` when **Tag with Account Name** is checked.
- Enter a **Description** that will further assist your team when identifying
   the integration instance.
- Select a **Polling Interval** that you feel is sufficient for your monitoring
   needs. You may leave this as `DISABLED` and manually execute the integration.
- Enter the **Snowflake Account Name** or full name of your account.
- Enter the **Username** of a user to authenticate with.
- Enter the **Password** of a user to authenticate with.
- Enter the **Role** or default security role to use for the session after you
authenticate.
4. Click **Create Configuration** once all values are provided.

## How to Uninstall

1. From the configuration **Gear Icon**, select **Integrations**.
2. Scroll to the **Snowflake** integration tile and click it.
3. Identify and click the **integration to delete**.
4. Click the **trash can** icon.
5. Click the **Remove** button to delete the integration.

## Data Model

### Entities

The following entity resources are ingested when the integration runs:

| Resources | \_type of the Entity  | \_class of the Entity   |
| --------- | --------------------- | ----------------------- |
| Warehouse | `snowflake_warehouse` | `DataStore`, `Database` |
| Database  | `snowflake_database`  | `DataStore`, `Database` |
| Schema    | `snowflake_schema`    | `DataStore`, `Database` |
| Table     | `snowflake_table`     | `DataStore`, `Database` |
| User      | `snowflake_user`      | `User`                  |

### Relationships

The following relationships are created/mapped:

| From                  | Edge    | To                   |
| --------------------- | ------- | -------------------- |
| `snowflake_warehouse` | **HAS** | `snowflake_database` |
| `snowflake_database`  | **HAS** | `snowflake_schema`   |
| `snowflake_schema`    | **HAS** | `snowflake_table`    |
