# Integration with JupiterOne

## Okta + JupiterOne Integration Benefits

- Visualize Okta users, groups, devices, applications, and services in the
  JupiterOne graph.
- Map Okta users to employees in your JupiterOne account.
- See Okta rules which are automatically adding users to groups. Write queries
  to determine which users were added via rules.
- Monitor changes to Okta users and access management data using JupiterOne
  alerts.
- Create an employee entity that is used to map users across your organization
  to an employee via a matching email property.

## How it Works

- JupiterOne periodically fetches Okta users, groups, user rules, and access
  management data to update the graph.
- Write JupiterOne queries to review and monitor updates to the graph.
- Configure alerts to take action when the JupiterOne graph changes.

## Requirements

- JupiterOne requires the organization URL and an API key to authenticate with
  Okta. You need permission to create an Admin user in Okta that will be used to
  [create the API key](https://developer.okta.com/docs/api/getting_started/getting_a_token).
- You must have permission in JupiterOne to install new integrations.

## Support

If you need help with this integration, please contact
[JupiterOne Support](https://support.jupiterone.io).

## Integration Walkthrough

### In Okta

1. Login to Okta at https://yoursubdomain.okta.com, using an account with Admin
   privileges. It is important to note that the token inherits the privileges of
   the user that creates the token, "API tokens are generated with the
   permissions of the user that created the token. If a user’s permissions
   changes, then so does that of the token. Okta recommends generating API
   tokens from a service account with permissions that do not change."
2. Go to Admin mode by pressing the Admin button in the top right corner. You
   should now be at https://yoursubdomain-admin.okta.com.
3. On the left-side menu, select Security, and then API.
4. On the screen which appears, select Tokens. You should now be at
   https://yoursubdomain-admin.okta.com/admin/access/api/tokens.
5. Press the Create Token button and name the token.
6. Copy the token value which appears to a safe location, because it will not be
   available after closing this screen. Note that, per the Okta website, "API
   tokens are valid for 30 days and automatically renew every time they are used
   with an API request. When a token has been inactive for more than 30 days it
   is revoked and cannot be used again. Tokens are also only valid if the user
   who created the token is also active."

### In JupiterOne

1. From the configuration **Gear Icon**, select **Integrations**.
2. Scroll to the **Okta** integration tile and click it.
3. Click the **Add Configuration** button and configure the following settings:

- Enter the **Account Name** by which you'd like to identify this Okta account
  in JupiterOne. Ingested entities will have this value stored in
  `tag.AccountName` when **Tag with Account Name** is checked.
- Enter a **Description** that will further assist your team when identifying
  the integration instance.
- Select a **Polling Interval** that you feel is sufficient for your monitoring
  needs. You may leave this as `DISABLED` and manually execute the integration.
- Enter the **Organization URL** unique to your Okta organization.
- Enter the **API Key** used to authenticate with Okta.

4. Click **Create Configuration** once all values are provided.

## How to Uninstall

1. From the configuration **Gear Icon**, select **Integrations**.
2. Scroll to the **Okta** integration tile and click it.
3. Identify and click the **integration to delete**.
4. Click the **trash can** icon.
5. Click the **Remove** button to delete the integration.

# Tips

All Okta users are automatically mapped to a `Person` entity as an employee. If
you have service accounts or generic users in Okta, set their `userType`
attribute to `generic` or `service` or `bot` in Okta user profile to skip this
mapping.

This allows you to find non-interactive users with a query like

```j1ql
Find User that !is Person
```

## Okta API Rate Limits

[Okta API rate limits][2] are sophisticated, depending on a number of factors
including the particular endpoint, organization-wide limits, and subscription
level. Responses include a few headers to guide a system into conformance, and
will deliver `429` responses that indicate a backoff delay when the rate limits
are exceeded. The integration is implemented to respect these `429` response
directives by leveraging the API client provided by Okta.

The Okta integration currently ingests users, groups, applications, and MFA
devices. The number of calls works out to be:

- `((numUsers / 200) * listUsers) + (numUsers * (listFactors(user) + listGroups(user)))`
- `listApplications + (numApplications * (listApplicationGroupAssignments(app) + listApplicationUsers(app)))`

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

| Resources          | Entity `_type`        | Entity `_class`      |
| ------------------ | --------------------- | -------------------- |
| Okta Account       | `okta_account`        | `Account`            |
| Okta App UserGroup | `okta_app_user_group` | `UserGroup`          |
| Okta Application   | `okta_application`    | `Application`        |
| Okta Factor Device | `mfa_device`          | `Key`, `AccessKey`   |
| Okta Rule          | `okta_rule`           | `Configuration`      |
| Okta Service       | `okta_service`        | `Service`, `Control` |
| Okta User          | `okta_user`           | `User`               |
| Okta UserGroup     | `okta_user_group`     | `UserGroup`          |

### Relationships

The following relationships are created/mapped:

| Source Entity `_type`                  | Relationship `_class` | Target Entity `_type` |
| -------------------------------------- | --------------------- | --------------------- |
| `okta_account`                         | **HAS**               | `okta_application`    |
| `okta_account`                         | **HAS**               | `okta_user_group`     |
| `okta_account`                         | **HAS**               | `okta_rule`           |
| `okta_account`                         | **HAS**               | `okta_service`        |
| `okta_account`                         | **HAS**               | `okta_user`           |
| `okta_user_group, okta_app_user_group` | **ASSIGNED**          | `okta_application`    |
| `okta_user_group`                      | **HAS**               | `okta_user`           |
| `okta_rule`                            | **MANAGES**           | `okta_user_group`     |
| `okta_user`                            | **ASSIGNED**          | `okta_application`    |
| `okta_user`                            | **ASSIGNED**          | `aws_iam_role`        |
| `okta_user`                            | **ASSIGNED**          | `mfa_device`          |
| `okta_user_group`                      | **ASSIGNED**          | `aws_iam_role`        |

<!--
********************************************************************************
END OF GENERATED DOCUMENTATION AFTER BELOW MARKER
********************************************************************************
-->
<!-- {J1_DOCUMENTATION_MARKER_END} -->

!!! note

    The `Service` entities can later be connected to security policy
    procedures as control providers. This mapping establishes evidence that your
    organization security policies, procedures and controls are fully implemented,
    monitored, and managed._

[1]: https://developer.okta.com/docs/api/getting_started/getting_a_token
[2]: https://developer.okta.com/docs/reference/rate-limits/
