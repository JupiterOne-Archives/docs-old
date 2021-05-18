# Integration with JupiterOne

## NPM + JupiterOne Integration Benefits

- Visualize NPM users, groups, and packages in the JupiterOne graph.
- Map NPM users to employees in your JupiterOne account.
- Monitor changes to NPM users, groups, and packages using JupiterOne alerts.

## How it Works

- JupiterOne periodically fetches users and packages from NPM to update 
the graph.
- Write JupiterOne queries to review and monitor updates to the graph, or leverage
 existing queries.
- Configure alerts to take action when the JupiterOne graph changes, or leverage 
existing alerts.

## Requirements

- JupiterOne requires the name of your NPM organization and an access token API 
to interact with the API.
- You must have permission in JupiterOne to install new integrations.

## Support

If you need help with this integration, please contact
[JupiterOne Support](https://support.jupiterone.io).

## Integration Walkthrough

### In NPM

To create an NPM token with **Read Only** access, follow the instructions in the
[NPM documentation][1].

### In JupiterOne

1. From the configuration **Gear Icon**, select **Integrations**.
2. Scroll to the **NPM** integration tile and click it.
3. Click the **Add Configuration** button and configure the following settings:
- Enter the **Account Name** by which you'd like to identify this NPM
   account in JupiterOne. Ingested entities will have this value stored in
   `tag.AccountName` when **Tag with Account Name** is checked.
- Enter a **Description** that will further assist your team when identifying
   the integration instance.
- Select a **Polling Interval** that you feel is sufficient for your monitoring
   needs. You may leave this as `DISABLED` and manually execute the integration.
- Enter the **NPM Organization** of your NPM account.
- Enter the **Access Token** generated in your NPM account, configured for 
read access.
4. Click **Create Configuration** once all values are provided.

## How to Uninstall

1. From the configuration **Gear Icon**, select **Integrations**.
2. Scroll to the **NPM** integration tile and click it.
3. Identify and click the **integration to delete**.
4. Click the **trash can** icon.
5. Click the **Remove** button to delete the integration.

## Data Model

### Entities

The following entity resources are ingested when the integration runs.

| NPM Resources | \_type of the Entity | \_class of the Entity |
| ------------- | -------------------- | --------------------- |
| Organization  | `npm_organization`   | `Organization`        |
| Team          | `npm_team`           | `UserGroup`           |
| User          | `npm_user`           | `User`                |
| Package       | `npm_package`        | `CodeModule`          |

### Relationships

The following relationships are created:

| From               | Relationship | To            |
| ------------------ | ------------ | ------------- |
| `npm_organization` | **HAS**      | `npm_package` |
| `npm_organization` | **HAS**      | `npm_team`    |
| `npm_organization` | **HAS**      | `npm_user`    |
| `npm_team`         | **HAS**      | `npm_user`    |

The following relationships are mapped:

| From       | Relationship  | To           |
| ---------- | ------------- | ------------ |
| `CodeRepo` | **PUBLISHED** | `CodeModule` |

[1]: https://docs.npmjs.com/creating-and-viewing-authentication-tokens
