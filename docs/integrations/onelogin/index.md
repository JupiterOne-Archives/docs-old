# Integration with JupiterOne

## OneLogin + JupiterOne Integration Benefits

- Visualize OneLogin users, groups, roles, devices, applications, and services
  in the JupiterOne graph.
- Map OneLogin users to employees in your JupiterOne account.
- Map OneLogin users to their AWS IAM Roles where applicable.
- Monitor changes to OneLogin users and access management data using JupiterOne
  alerts.
- Create an employee entity that is used to map users across your organization
  to an employee via a matching email property.

## How it Works

- JupiterOne periodically fetches OneLogin users, groups, and access management
  data to update the graph.
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

1. Log in to OneLogin as an administrator.
2. Navigate to **Administration** > **Developers** > **API Credentials**
3. Create a new API credential with the **Read All** scope.

Further instructions on creating an API token within your OneLogin account can
be found [here][1].

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
- Enter your **Organization URL** in the format YOURDOMAIN.onelogin.com.

4. Click **Create Configuration** once all values are provided.

### Troubleshooting

#### Authentication Errors

This integration's authentication is achieved by fetching an OAuth token from
OneLogin. You can reproduce this authentication strategy by running the
following curl, replacing `<CLIENT_ID>` and `<CLIENT_SECRET>` with your own.
`<API_HOSTNAME>` defaults to `https://api.us.onelogin.com`:

```
curl --request POST \
  --url <API_HOSTNAME> \
  --header 'authorization: client_id:<CLIENT_ID>, client_secret:<CLIENT_SECRET>' \
  --header 'content-type: application/json' \
  --data '{
	"grant_type":"client_credentials"
}'
```

## How to Uninstall

1. From the configuration **Gear Icon**, select **Integrations**.
2. Scroll to the **OneLogin** integration tile and click it.
3. Identify and click the **integration to delete**.
4. Click the **trash can** icon.
5. Click the **Remove** button to delete the integration.

## Notes on mapping to AWS IAM roles

The integration assumes that users who map to AWS IAM Roles do so via Role ARNs
included in the SAML Role parameter. It is further assumed that these ARNs are
mapped to the user by a Rule in the OneLogin AWS application. Currently, the
integration supports mapping by Rule conditions based on OneLogin Roles, Group,
or MemberOf properties.

[1]:
  https://developers.onelogin.com/api-docs/1/getting-started/working-with-api-credentials

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

| Resources                     | Entity `_type`                  | Entity `_class`      |
| ----------------------------- | ------------------------------- | -------------------- |
| Onelogin Account              | `onelogin_account`              | `Account`            |
| Onelogin Application          | `onelogin_application`          | `Application`        |
| Onelogin Application Rule     | `onelogin_application_rule`     | `Configuration`      |
| Onelogin Group                | `onelogin_group`                | `UserGroup`          |
| Onelogin Personal Application | `onelogin_personal_application` | `Application`        |
| Onelogin Personal Device      | `mfa_device`                    | `Key`, `AccessKey`   |
| Onelogin Role                 | `onelogin_role`                 | `AccessRole`         |
| Onelogin Service              | `onelogin_service`              | `Service`, `Control` |
| Onelogin User                 | `onelogin_user`                 | `User`               |

### Relationships

The following relationships are created/mapped:

| Source Entity `_type`  | Relationship `_class` | Target Entity `_type`           |
| ---------------------- | --------------------- | ------------------------------- |
| `onelogin_account`     | **HAS**               | `onelogin_application`          |
| `onelogin_account`     | **HAS**               | `onelogin_group`                |
| `onelogin_account`     | **HAS**               | `onelogin_role`                 |
| `onelogin_account`     | **HAS**               | `onelogin_service`              |
| `onelogin_account`     | **HAS**               | `onelogin_user`                 |
| `onelogin_application` | **HAS**               | `onelogin_application_rule`     |
| `onelogin_group`       | **HAS**               | `onelogin_user`                 |
| `onelogin_user`        | **ASSIGNED**          | `onelogin_application`          |
| `onelogin_user`        | **ASSIGNED**          | `aws_iam_role`                  |
| `onelogin_user`        | **ASSIGNED**          | `onelogin_group`                |
| `onelogin_user`        | **ASSIGNED**          | `mfa_device`                    |
| `onelogin_user`        | **ASSIGNED**          | `onelogin_role`                 |
| `onelogin_user`        | **HAS**               | `onelogin_personal_application` |

<!--
********************************************************************************
END OF GENERATED DOCUMENTATION AFTER BELOW MARKER
********************************************************************************
-->
<!-- {J1_DOCUMENTATION_MARKER_END} -->
