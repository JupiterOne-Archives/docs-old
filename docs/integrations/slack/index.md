# Integration with JupiterOne

## Overview

JupiterOne provides a managed integration with Slack. The integration connects
directly to Slack APIs using the JupiterOne Slack app to obtain information and
allows delivery of Slack messages to specific channels.

## Setup

### Integration Configuration

The integration is triggered by an event containing the information for a
specific integration instance.

Customers must install the JupiterOne Slack app and specify which
[Slack OAuth scopes](https://api.slack.com/legacy/oauth-scopes) the app should
request. Once the app is installed, the JupiterOne integration can begin
ingesting relevant information and send notifications via the
[JupiterOne Rules and Alerting feature](https://jupiterone.com/features/rules-alerting/).

1. Navigate to the JupiterOne Slack integration configuration page (e.g.
   https://apps.us.jupiterone.io/integrations/slack/configure)
1. Fill out relavant integration instance form information and OAuth scopes that
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
1. Once the relevant form information has been filled out, submitting the form
   will redirect the user to Slack to authorize the requested scopes.
1. Review the request scopes, click "Allow", and then you will be redirected
   back to JupiterOne.

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

## Data Model

### Entities

The following entity resources are ingested when the integration runs:

| Resources | \_type of the Entity | \_class of the Entity |
| --------- | -------------------- | --------------------- |
| Team      | `slack_team`         | `Account`             |
| User      | `slack_user`         | `User`                |
| Channel   | `slack_channel`      | `Channel`             |

### Relationships

The following relationships are created/mapped:

| From            | Edge    | To           |
| --------------- | ------- | ------------ |
| `slack_team`    | **HAS** | `slack_user` |
| `slack_channel` | **HAS** | `slack_user` |
