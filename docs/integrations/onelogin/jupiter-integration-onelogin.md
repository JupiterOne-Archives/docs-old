# Integration with JupiterOne

## OneLogin + JupiterOne Integration Benefits

- Visualize OneLogin users, groups, roles, devices, applications, 
and services in the JupiterOne graph.
- Map OneLogin users to employees in your JupiterOne account.
- Monitor changes to OneLogin users and access management data using 
JupiterOne alerts.
- Create an employee entity that is used to map users across your 
organization to an employee 
via a matching email property.

## How it Works

- JupiterOne periodically fetches OneLogin users, groups, and access 
management data to update the graph.
- Write JupiterOne queries to review and monitor updates to the graph.
- Configure alerts to take action when the JupiterOne graph changes.

## Requirements

- JupiterOne requires the API client id and API client secret used to 
authenticate with OneLogin.
- You must have permission in JupiterOne to install new integrations.

## Support

If you need help with this integration, please contact
[JupiterOne Support](https://support.jupiterone.io).

## Integration Walkthrough

### In OneLogin

Instructions on creating an API token within your OneLogin account can be found
[here][1].

### In JupiterOne

1. From the configuration **Gear Icon**, select **Integrations**.
2. Scroll to the **OneLogin** integration tile and click it.
3. Click the **Add Configuration** button and configure the following settings:
- Enter the **Account Name** by which you'd like to identify this OneLogin
   account in JupiterOne. Ingested entities will have this value stored in
   `tag.AccountName` when **Tag with Account Name** is checked.
- Enter a **Description** that will further assist your team when identifying
   the integration instance.
- Select a **Polling Interval** that you feel is sufficient for your monitoring
   needs. You may leave this as `DISABLED` and manually execute the integration.
- Enter the **API Client ID** used to authenticate with OneLogin.
- Enter the **API Client Secret** associated with the client ID.
4. Click **Create Configuration** once all values are provided.

## How to Uninstall

1. From the configuration **Gear Icon**, select **Integrations**.
2. Scroll to the **OneLogin** integration tile and click it.
3. Identify and click the **integration to delete**.
4. Click the **trash can** icon.
5. Click the **Remove** button to delete the integration.

## Data Model

### Entities

The following entity resources are ingested when the integration runs:

| OneLogin Entity Resource | \_type : \_class of the Entity                  |
| ------------------------ | ----------------------------------------------- |
| Account                  | `onelogin_account` : `Account`                  |
| Group                    | `onelogin_group` : `UserGroup`                  |
| OneLogin Role            | `onelogin_role` : `AccessRole`                  |
| User                     | `onelogin_user` : `User`                        |
| App                      | `onelogin_application` : `Application`          |
| Personal App             | `onelogin_personal_application` : `Application` |
| Personal Device          | `mfa_device` : `[Key, AccessKey]`               |
| Service (SSO & MFA)      | `onelogin_service` : `['Service', 'Control']`   |

### Relationships

The following relationships are created/mapped:

| From               | Type         | To                              |
| ------------------ | ------------ | ------------------------------- |
| `onelogin_account` | **HAS**      | `onelogin_group`                |
| `onelogin_account` | **HAS**      | `onelogin_role`                 |
| `onelogin_account` | **HAS**      | `onelogin_user`                 |
| `onelogin_account` | **HAS**      | `onelogin_application`          |
| `onelogin_account` | **HAS**      | `onelogin_service`              |
| `onelogin_user`    | **ASSIGNED** | `onelogin_application`          |
| `onelogin_user`    | **ASSIGNED** | `onelogin_group`                |
| `onelogin_user`    | **HAS**      | `onelogin_personal_application` |
| `onelogin_user`    | **ASSIGNED** | `onelogin_role`                 |
| `onelogin_user`    | **ASSIGNED** | `mfa_device`                    |
| `onelogin_group`   | **HAS**      | `onelogin_user`                 |

[1]:
  https://developers.onelogin.com/api-docs/1/getting-started/working-with-api-credentials