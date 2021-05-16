# Integration with JupiterOne

## Slack + JupiterOne Integration Benefits

- Visualize Slack teams, channels, and users in the JupiterOne graph.
- Map Slack users to employees in your JupiterOne account.
- Map Slack users to the channels they have access to.
- Monitor changes to Slack teams, channels, and users using JupiterOne alerts.
- Create issues within Slack channels or directly to Slack users from JupiterOne
  alerts.

## How it Works

- JupiterOne periodically fetches Slack teams, channels, and users to update the graph.
- Write JupiterOne queries to review and monitor updates to the graph.
- Configure alerts to use the Slack workflow option to notify a channel or user.
- Configure alerts to take action when the JupiterOne graph changes.

## Requirements

- JupiterOne requires the JupiterOne Slack app be installed in your Slack 
account with the requested OAuth scopes selected. 
- You must have permission in JupiterOne to install new integrations.

## Support

If you need help with this integration, please contact
[JupiterOne Support](https://support.jupiterone.io).

## Integration Walkthrough

Customers must install the JupiterOne Slack app and specify which
[Slack OAuth scopes](https://api.slack.com/legacy/oauth-scopes) the app should
request. Once the app is installed, the JupiterOne integration can begin
ingesting relevant information and send notifications via the
[JupiterOne Rules and Alerting feature](https://jupiterone.com/features/rules-alerting/).

### In Slack

1. First navigate to the JupiterOne Slack integration configuration page (see
detailed steps in the **In JupiterOne** section below)
2. Fill out relavant integration instance form information and OAuth scopes that
   you'd like the Slack app to request. All read scopes are used to ingest data
   into the JupiterOne graph and the write scopes are used for enabling the
   ability to send notifications to channels in the configured Slack team. NOTE:
   [`chat:write`](https://api.slack.com/scopes/chat:write) is required to post
   messages in channels & conversations that the `@JupiterOne` bot is a member
   of and [`chat:write.public`](https://api.slack.com/scopes/chat:write.public)
   is required to post messages to channels that the `@JupiterOne` bot isn't a
   member of. Without one or both of `chat:write` and `chat:write.public`
   scopes, users _will not_ be able to configure JupiterOne alert rules with a
   Slack notification.
3. Once the relevant form information has been filled out, submitting the form
   will redirect the user to Slack to authorize the requested scopes.
4. Review the request scopes, click "Allow", and then you will be redirected
   back to JupiterOne.

### In JupiterOne

1. From the configuration **Gear Icon**, select **Integrations**.
2. Scroll to the **Slack** integration tile and click it.
3. Click the **Add Configuration** button and configure the following settings:
- Enter the **Account Name** by which you'd like to identify this Slack
   account in JupiterOne. Ingested entities will have this value stored in
   `tag.AccountName` when **Tag with Account Name** is checked.
- Enter a **Description** that will further assist your team when identifying
   the integration instance.
- Select a **Polling Interval** that you feel is sufficient for your monitoring
   needs. You may leave this as `DISABLED` and manually execute the integration.
- Select the **Slack OAuth Scopes** or permissions the JupiterOne Slack app
should request. (See the section **In Slack** above).
4. Click **Create Configuration** once all values are provided.

### JupiterOne Alert Rule Slack Notification

NOTE: For detailed instructions on how to configure JupiterOne Alert Rules,
please see the
[JupiterOne Alert Rule configuration documentation](https://support.jupiterone.io/hc/en-us/articles/360022720474-6-9-Alerts-and-Alert-Rules).
Additionally, see the
[JupiterOne Alert Rule Schema documentation](https://support.jupiterone.io/hc/en-us/articles/360039711354-Alert-Rule-Schema)
for technical details on alert rule/action properties.

JupiterOne can deliver Slack messages directly to any channel or to specific
users in a Slack Channel once the JupiterOne Slack integration has been configured
via the JupiterOne web app. This will prompt the JupiterOne Slack app to be installed
in your Workspace.

Be sure to include specify the channel in the format `#channel`.
You can alert to private channels as well if you have invited the JupiterOne Slack app to the private channel as well.

## How to Uninstall

1. From the configuration **Gear Icon**, select **Integrations**.
2. Scroll to the **Slack** integration tile and click it.
3. Identify and click the **integration to delete**.
4. Click the **trash can** icon.
5. Click the **Remove** button to delete the integration.

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

| Resources | Entity `_type`  | Entity `_class` |
| --------- | --------------- | --------------- |
| Channel   | `slack_channel` | `Channel`       |
| Team      | `slack_team`    | `Account`       |
| User      | `slack_user`    | `User`          |

### Relationships

The following relationships are created/mapped:

| Source Entity `_type` | Relationship `_class` | Target Entity `_type` |
| --------------------- | --------------------- | --------------------- |
| `slack_channel`       | **HAS**               | `slack_user`          |
| `slack_team`          | **HAS**               | `slack_user`          |

<!--
********************************************************************************
END OF GENERATED DOCUMENTATION AFTER BELOW MARKER
********************************************************************************
-->
<!-- {J1_DOCUMENTATION_MARKER_END} -->