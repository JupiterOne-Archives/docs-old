# Google

## Overview

JupiterOne provides a managed integration with Google. The integration connects
directly to the G Suite Admin API to obtain account metadata and analyze
resource relationships. Customers authorize read-only to access to a JupiterOne
Service Account.

## Integration Instance Configuration

The integration is triggered by an event containing the information for a
specific integration instance.

The integration instance configuration requires the Organization Account ID and
an administrator email. The JupiterOne Service Account must be added as an
authorized API client with required permission scopes.

### Getting Organization Account ID

From your Google Admin console:

1. Click Security, then expand Setup single sign-on (SSO)
1. Copy the `idpid` property value from the SSO URL. For example,
   `https://accounts.google.com/o/saml2/idp?idpid=C1111abcd` provides the ID
   `C1111abcd`
1. Enter the value into the Account ID field in the JupiterOne integration
   configuration.

### Admin API Enablement

The Admin API is not accessible to the JupterOne Service Account until the API
is enabled in your G Suite organization and permission is granted to the Service
Account.

From your Google Admin console:

1. Click Security, then expand Advanced settings and click on Manage API client
   access
1. Enter the JupiterOne Service Account client ID `102174985137827290632` into
   Client Name
1. Add the following API scopes (comma separated):

```text
https://www.googleapis.com/auth/admin.directory.domain.readonly, https://www.googleapis.com/auth/admin.directory.user.readonly, https://www.googleapis.com/auth/admin.directory.group.readonly
```

1. Click Authorize
1. Return to the Admin console, click Security, then API reference
1. Check Enable API access

## Entities

The following entity resources are ingested when the integration runs:

| Google Entity Resource | \_type : \_class of the Entity |
| ---------------------- | ------------------------------ |
| Account                | `google_account` : `Account`   |
| Group                  | `google_group` : `UserGroup`   |
| User                   | `google_user` : `User`         |

## Relationships

The following relationships are created/mapped:

| From             | Type    | To             |
| ---------------- | ------- | -------------- |
| `google_account` | **HAS** | `google_group` |
| `google_account` | **HAS** | `google_user`  |
| `google_group`   | **HAS** | `google_user`  |
