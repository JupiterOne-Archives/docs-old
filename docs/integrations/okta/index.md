# Integration with JupiterOne

## Okta + JupiterOne Integration Benefits

- Visualize Okta users, groups, devices, applications, and services in the
  JupiterOne graph.
- Map Okta users to employees in your JupiterOne account.
- Monitor changes to Okta users and access management data using JupiterOne
  alerts.
- Create an employee entity that is used to map users across your organization
  to an employee via a matching email property.

## How it Works

- JupiterOne periodically fetches Okta users, groups, and access management data
  to update the graph.
- Write JupiterOne queries to review and monitor updates to the graph.
- Configure alerts to take action when the JupiterOne graph changes.

## Requirements

- JupiterOne requires the organization URL and an API key used to authenticate
  with Okta.
- You must have permission in JupiterOne to install new integrations.

## Support

If you need help with this integration, please contact
[JupiterOne Support](https://support.jupiterone.io).

## Integration Walkthrough

### In Okta

Create an [Okta API Token][1] with `Read-Only Admin` permission.

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

## Data Model

### Entities

The following entity resources are ingested when the integration runs:

| Okta Entity Resource  | \_type : \_class of the Entity        |
| --------------------- | ------------------------------------- |
| Account               | `okta_account` : `Account`            |
| Service (SSO & MFA)\* | `okta_service` : `Service`, `Control` |
| Application           | `okta_application` : `Application`    |
| Application Group     | `okta_app_user_group` : `UserGroup`   |
| MFA Factor            | `mfa_device` : `[Key,AccessKey]`      |
| Okta Group            | `okta_user_group` : `UserGroup`       |
| User                  | `okta_user` : `User`                  |

_Note: the `Service` entities can later be connected to security policy
procedures as control providers. This mapping establishes evidence that your
organization security policies, procedures and controls are fully implemented,
monitored, and managed._

### Relationships

The following relationships are created/mapped:

|                                                   |
| ------------------------------------------------- |
| `okta_account` **HAS** `okta_application`         |
| `okta_account` **HAS** `okta_service`             |
| `okta_account` **HAS** `okta_user_group`          |
| `okta_user` **ASSIGNED** `okta_application`       |
| `okta_user` **ASSIGNED** `mfa_device`             |
| `okta_user_group` **ASSIGNED** `okta_application` |
| `okta_user_group` **HAS** `okta_user`             |

## Tips

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
directives by leveraging the API client provided by Okta. However, there is more
work to be done to make the integration more proactive by using the headers of
every response.

The Okta integration currently ingests users, groups, applications, and MFA
devices. The number of calls works out to be:

- `((numUsers / 200) * listUsers) + (numUsers * (listFactors(user) + listGroups(user)))`
- `listApplications + (numApplications * (listApplicationGroupAssignments(app) + listApplicationUsers(app)))`

[1]: https://developer.okta.com/docs/api/getting_started/getting_a_token
[2]: https://developer.okta.com/docs/reference/rate-limits/
