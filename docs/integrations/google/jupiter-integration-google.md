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
authorized API client with required permission scopes, and a domain email
address that is a member of an Admin Group with read only permissions must be
specified to obtain an OAuth token for API requests.

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
https://www.googleapis.com/auth/admin.directory.domain.readonly, https://www.googleapis.com/auth/admin.directory.user.readonly, https://www.googleapis.com/auth/admin.directory.group.readonly, https://www.googleapis.com/auth/admin.directory.user.security
```

1. Click Authorize
1. Return to the Admin console, click Security, then API Permissions
1. Enable API access

### Admin User Email

From your Google Admin console:

1. Click Users, then Add new user

1. Enter First name "JupiterOne", Last name "SystemUser", Primary email
   "jupiterone-admin"

1. Click Add new user and collect the temporary, generated password

1. Log in as the new user to set a complex password and accept the G Suite Terms
   of Service

1. Enter the new user email into the Admin Email field in the JupiterOne
   integration configuration

You may dispose of the password as it will not be used and may be reset by a
Super Admin in the future if necessary.

Next, create a new role that will have only the permissions required by
JupiterOne, and which will include only the `jupiterone-admin` system user.

From your Google Admin console:

1. Click Users, then click on the "JupiterOne SystemUser"

1. Click Admin roles and privileges, then click the icon to edit the user's
   roles

1. Click Create custom role, then click Create a new role

1. Name "JupiterOne System", Description "Role for JupiterOne user to enable
   read-only access to G Suite Admin APIs."

1. In Privileges, the Admin API Privileges section, check these permissions:

   - Users -> Read
   - Groups -> Read
   - Domain Management
   - User Security Management

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

| Resources | Entity `_type`   | Entity `_class` |
| --------- | ---------------- | --------------- |
| Domain    | `google_domain`  | `Domain`        |
| Account   | `google_account` | `Account`       |
| Group     | `google_group`   | `UserGroup`     |
| User      | `google_user`    | `User`          |
| Site      | `google_site`    | `Site`          |
| Token     | `google_token`   | `AccessKey`     |

### Relationships

The following relationships are created/mapped:

| Source Entity `_type` | Relationship `_class` | Target Entity `_type` |
| --------------------- | --------------------- | --------------------- |
| `google_group`        | **HAS**               | `google_user`         |
| `google_group`        | **HAS**               | `google_group`        |
| `google_account`      | **HAS**               | `google_group`        |
| `google_account`      | **HAS**               | `google_user`         |
| `google_site`         | **HAS**               | `google_user`         |
| `google_user`         | **ASSIGNED**          | `google_token`        |

<!--
********************************************************************************
END OF GENERATED DOCUMENTATION AFTER BELOW MARKER
********************************************************************************
-->
<!-- {J1_DOCUMENTATION_MARKER_END} -->
