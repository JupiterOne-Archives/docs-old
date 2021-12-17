# Integration with JupiterOne

## Google Workspace + JupiterOne Integration Benefits

- Visualize Google Workspace domain user groups, users, and their authorized
  tokens in the JupiterOne graph.
- Map Google Workspace users to employees in your JupiterOne account.
- Use queries to help perform access reviews, group assignments, OAuth
  application authorizations, and other permission settings
- Workspace users identified as employees are mapped to their managers to
  provide an organization chart in JupiterOne.
- Monitor changes to Google Workspace users using JupiterOne alerts.

## How it Works

- JupiterOne periodically fetches details from Google Workspace to maintain an
  updated graph.
- Additional details stored in Google Workspace users is used to map your
  organization management structure.
- Write JupiterOne queries to review and monitor updates to the graph.
- Configure alerts to take action when JupiterOne graph changes occur.

## Requirements

- A Google Workspace super administrator must grant the JupiterOne Google
  Service Account domain-wide delegation authority.
- A Google Workspace user granted Admin API permissions; this user will be
  impersonated by the Service Account.
- You must have permission in JupiterOne to install new integrations.

## Support

If you need help with this integration, please contact
[JupiterOne Support](https://support.jupiterone.io).

## Integration Walkthrough

### In Google Workspace

The integration will connect to Google Workspace Admin APIs with the following
details:

- The Google Workspace **Customer ID** for the domain to ingest into JupiterOne
- The **email address** of a Google Workspace user created for JupiterOne with
  permissions to read the information ingested into JupiterOne
- The credentials of the JupiterOne Service Account authorized to impersonate
  the user and access necessary **API scopes**

Log into the Google Workspace **Admin Console** as a super administrator to
perform the following actions.

1. Click **Account Settings** > **Profile** and retrieve your **Customer ID**.
   It will have a format similar to `C1111abcd`.

   Alternatively, click **Security** and expand **Setup single sign-on (SSO) for
   SAML applications** and copy the **`idpid`** property value from the **SSO
   URL**. For example, `https://accounts.google.com/o/saml2/idp?idpid=C1111abcd`
   provides the ID `C1111abcd`

   Retain this value for the Account ID field in the JupiterOne integration
   configuration.

2. Return to the **Admin Console** home page. Click **Security** > **API
   controls**.

3. In the **Domain wide delegation** pane, select **Manage Domain Wide
   Delegation**.

4. Click **Add new** and enter the JupiterOne Service Account client ID
   `102174985137827290632` into the **Client ID** field.

5. Add the following **API scopes** (comma separated):

   ```text
   https://www.googleapis.com/auth/admin.directory.domain.readonly, https://www.googleapis.com/auth/admin.directory.user.readonly, https://www.googleapis.com/auth/admin.directory.group.readonly, https://www.googleapis.com/auth/admin.directory.user.security, https://www.googleapis.com/auth/apps.groups.settings, https://www.googleapis.com/auth/admin.directory.rolemanagement.readonly,
   https://www.googleapis.com/auth/admin.directory.device.mobile.readonly
   ```

6. Click **Authorize**.

Continuing in the **Admin console**, create a user the JupiterOne Service
Account will impersonate:

1. Click **Users** > **Add new user**.

2. Enter **First name** "JupiterOne", **Last name** "SystemUser", **Primary
   email** "jupiterone-admin".

   Retain the email address for the Admin Email field in the JupiterOne
   integration configuration.

3. Click **Add new user**.

   Retain the temporary generated password for the next step.

4. In another browser (or using Chrome's Incognito feature), **Log in** as the
   new user to set a complex password and **accept the Google Workspaces Terms
   of Service**.

   You may dispose of the password as it will not be used and may be reset by a
   super administrator in the future if necessary.

Continuing in the **Admin console**, create a new role that will have only the
permissions required by JupiterOne, and which will include only the
`jupiterone-admin` system user.

1. Click **Users**, then click on the **"JupiterOne SystemUser"**.

2. Click **Admin roles and privileges**, then click the icon to **edit the
   user's roles**.

3. Click **Create custom role** > **Create a new role**.

4. **Name** "JupiterOne System", **Description** "Role for JupiterOne user to
   enable read-only access to Google Workspaces Admin APIs."

5. In the **Privileges**, **Admin API Privileges** section, check these
   permissions:

   - Users -> Read
   - Groups -> Read
   - Domain Management
   - User Security Management
   - Mobile Device Management

NOTE: In order to ingest role and role assignment data you will need to grant
this account Super Admin permissions in addition to the custom role listed
above.

#### Adding Scopes and Privileges

Changes to the integration may include additional data ingestion requiring
authorization of new scopes and additional Admin API Privileges granted to the
custom Admin Role.

To authorize additional scopes, log into the Google Workspace **Admin Console**
as a super administrator to perform the following actions.

1. Click **Security** > **API controls**.

2. In the **Domain wide delegation** pane, select **Manage Domain Wide
   Delegation**.

3. Identify the JupiterOne Service Account having the client ID
   `102174985137827290632`. Click **Edit** to add scopes.

4. Click **Authorize**.

To grant additional Admin API Privileges, return to the **Admin console**.

1. Click **Admin roles**, then click on the **"JupiterOne System"** role.

2. Click **Privileges** to add additional privileges to enable JupiterOne to
   fetch new data.

3. Click **Save**.

### In JupiterOne

1. From the configuration **Gear Icon**, select **Integrations**.
2. Scroll to the **Google** integration tile and click it.
3. Click the **Add Configuration** button.
4. Enter the **Account Name** by which you'd like to identify this Google
   Workspace account in JupiterOne. Ingested entities will have this value
   stored in `tag.AccountName` when **Tag with Account Name** is checked.
5. Enter a **Description** that will further assist your team when identifying
   the integration instance.
6. Select a **Polling Interval** that you feel is sufficient for your monitoring
   needs. You may leave this as `DISABLED` and manually execute the integration.
7. Enter the **Customer ID** collected during setup of Google Workspace.
8. Enter the **email address** of the user created during setup of Google
   Workspace.
9. Click **Create Configuration** once all values are provided.

### Integration Jobs Events

A common log when running the integration job is `list_token_error`. Although it
appears to be an error, this is actually just a warning returned from Google
APIs because the **"JupiterOne SystemUser"** configured for integration purposes
does not have the right permissions to list the tokens for users with higher
privileges, such as the "Super Admin" Role. These tokens are not necessary for
the job to complete and all other data will still be retrieved.

# How to Uninstall

1. From the configuration **Gear Icon**, select **Integrations**.
2. Scroll to the **Google** integration tile and click it.
3. Identify and click the **integration to delete**.
4. Click the **trash can** icon.
5. Click the **Remove** button to delete the integration.
6. Revoke JupiterOne from **Domain wide delegation** in Google Workspace.
7. Delete the "JupiterOne SystemUser" user in Google Workspace.
8. Delete the "JupiterOne System" role in Google Workspace.

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

| Resources      | Entity `_type`          | Entity `_class` |
| -------------- | ----------------------- | --------------- |
| Account        | `google_account`        | `Account`       |
| Domain         | `google_domain`         | `Domain`        |
| Group          | `google_group`          | `UserGroup`     |
| Group Settings | `google_group_settings` | `Configuration` |
| Mobile Device  | `google_mobile_device`  | `Device`        |
| Role           | `google_role`           | `AccessRole`    |
| Site           | `google_site`           | `Site`          |
| Token          | `google_token`          | `AccessKey`     |
| User           | `google_user`           | `User`          |

### Relationships

The following relationships are created:

| Source Entity `_type` | Relationship `_class` | Target Entity `_type`          |
| --------------------- | --------------------- | ------------------------------ |
| `google_account`      | **HAS**               | `google_group`                 |
| `google_account`      | **HAS**               | `google_role`                  |
| `google_account`      | **HAS**               | `google_user`                  |
| `google_account`      | **MANAGES**           | `google_mobile_device`         |
| `google_group`        | **HAS**               | `google_group`                 |
| `google_group`        | **HAS**               | `google_group_settings`        |
| `google_group`        | **HAS**               | `google_user`                  |
| `google_site`         | **HAS**               | `google_user`                  |
| `google_token`        | **ALLOWS**            | `mapped_entity (class Vendor)` |
| `google_user`         | **ASSIGNED**          | `google_role`                  |
| `google_user`         | **ASSIGNED**          | `google_token`                 |

<!--
********************************************************************************
END OF GENERATED DOCUMENTATION AFTER BELOW MARKER
********************************************************************************
-->
<!-- {J1_DOCUMENTATION_MARKER_END} -->
