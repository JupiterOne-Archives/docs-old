# Integration with JupiterOne

## Overview

JupiterOne provides a managed integration with Jira. The integration connects
directly to Jira APIs to obtain project information and issues.

## Setup

### Integration Configuration

The integration is triggered by an event containing the information for a
specific integration instance.

Customers must install the JupiterOne Slack app and specify which
[Slack OAuth scopes](https://api.slack.com/legacy/oauth-scopes) the app should
request. Once the app is installed, the JupiterOne integration can begin
ingesting relevant information and send notification via the
[JupiterOne Rules and Alerting feature](https://jupiterone.com/features/rules-alerting/).

1. Navigate to the JupiterOne Slack integration configuration page (e.g.
   https://apps.us.jupiterone.io/integrations/slack/configure)
1. Fill out relavant integration instance form information and OAuth scopes. All
   read scopes are used to ingest data into the JupiterOne graph and the write
   scopes are used for enabling the ability to send notifications to channels in
   the configured Slack team. NOTE:
   [`chat:write`](https://api.slack.com/scopes/chat:write) is required to post
   messages in channels & conversations that the `@JupiterOne` bot is a member
   of. and [`chat:write.public`](https://api.slack.com/scopes/chat:write.public)
   is required to post messages to channels that the `@JupiterOne` bot isn't a
   member of. Without one or both of `chat:write` and `chat:write.public`
   scopes, users _will not_ be able to configure JupiterOne alert rules with a
   Slack notification.
1. Once the relevant form information has been filled out, submitting the form
   will redirect the user to Slack to authorize the requested scopes.
1. Click "Allow" and you will be redirected back to JupiterOne.

### JupiterOne Alert Rule Slack Notification

NOTE: For detailed instructions on how to configure JupiterOne Alert Rules,
please see the (JupiterOne Alert Rule configuration
documentation)[https://support.jupiterone.io/hc/en-us/articles/360022720474-6-9-Alerts-and-Alert-Rules].
Additionally, see the
[JupiterOne Alert Rule Schema documentation](https://support.jupiterone.io/hc/en-us/articles/360039711354-Alert-Rule-Schema)
for technical details on alert rule/action properties.

JupiterOne can deliver Slack messages directly to any channel or to specific
users in a Slack team once the JupiterOne slack integration has been configured
and the Slack app installed in the team.

Once the integration has been configured, copy the integration ID from the
integration instance page. For example, if the integration instance URL looks
like this:

`https://apps.dev.jupiterone.io/integrations/slack/configuration/d1549f40-b9fd-447a-bec5-4360c9ca7e8c`

Then the integration instance ID is `d1549f40-b9fd-447a-bec5-4360c9ca7e8c`.

Steps to configuring a rule

1. Navigate to the JupiterOne alert rule configuration page (e.g.
   https://apps.us.jupiterone.io/alerts/edit)
1. Click create rule
1. Click "Show Advanced" to open the advanced rule editor
1. Configure a rule with the `SEND_SLACK_MESSAGE` action and specify the
   `integrationInstanceId` property with the value being the ID specified in the
   URL above. Example alert rule configuration with the `SEND_SLACK_MESSAGE`
   action:

```json
{
  "name": "slack-alert-test",
  "description": "Testing Slack Messages",
  "specVersion": 1,
  "pollingInterval": "ONE_DAY",
  "templates": {
    "slackBody": "JupiterOne Account: {{item.displayName}}\n\n"
  },
  "question": {
    "queries": [
      {
        "name": "query0",
        "query": "Find Root",
        "version": "v1"
      }
    ]
  },
  "operations": [
    {
      "when": {
        "type": "FILTER",
        "specVersion": 1,
        "condition": "{{queries.query0.total > 0}}"
      },
      "actions": [
        {
          "targetValue": "HIGH",
          "type": "SET_PROPERTY",
          "targetProperty": "alertLevel"
        },
        {
          "type": "CREATE_ALERT"
        },
        {
          "integrationInstanceId": "d1549f40-b9fd-447a-bec5-4360c9ca7e8c",
          "channels": ["#random"],
          "type": "SEND_SLACK_MESSAGE",
          "body": "{{queries.query0.data|mapTemplate('slackBody')|join(' ')}}"
        }
      ]
    }
  ],
  "outputs": ["queries.query0.total", "alertLevel"]
}
```

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
