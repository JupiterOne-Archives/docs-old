# SentinelOne

## Overview

JupiterOne provides a managed integration with SentinelOne. The integration
connects directly to SentinelOne APIs to obtain account metadata and analyze
resource relationships. Customers authorize access by creating an API token in
their target SentinelOne account and providing that credential to JupiterOne.

## Integration Instance Configuration

The integration is triggered by an event containing the information for a
specific integration instance.

SentinelOne provides Every API call requires authentication. The recommended
authentication is API Token. If SSO or Two-Factor Authentication is mandatory
for your username, you must use a Token.

Generating an API Token from your account WebUI:

1.  In your Management Console, click Settings > USERS.
1.  Click your username.
1.  Click the edit button.
1.  In Edit User > API Token, click Generate. If you see Revoke and Regenerate,
    you already have a token. If you revoke or regenerate it, scripts that use
    that token will not work. There is no confirmation. Revoke removes the token
    authorization. Regenerate revokes the token and generates a new token. If
    you click Generate or Regenerate, a message shows the token string and the
    date that the token expires.
1.  Click DOWNLOAD.

## Entities

The following entity resources are ingested when the integration runs:

| Example Entity Resource | \_type : \_class of the Entity    |
| ----------------------- | --------------------------------- |
| Account                 | `sentinelone_account` : `Account` |
| Group                   | `sentinelone_group` : `Group`     |
| Agent                   | `sentinelone_agent` : `HostAgent` |

## Relationships

The following relationships are created/mapped:

| From                  | Type    | To                  |
| --------------------- | ------- | ------------------- |
| `sentinelone_account` | **HAS** | `sentinelone_group` |
| `sentinelone_group`   | **HAS** | `sentinelone_agent` |
