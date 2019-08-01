# JupiterOne Managed Integration for Microsoft Azure

## Overview

JupiterOne provides a managed integration for Microsoft Azure. The integration
connects directly to Azure APIs to obtain account metadata and analyze resource
relationships. Customers authorize access by ... and providing that credential
to JupiterOne.

## Integration Instance Configuration

The integration is triggered by an event containing the information for a
specific integration instance.

The integration instance configuration requires credentials of the App which is
registered with Azure AD. You need:

1. Go to your Azure portal
2. Navigate to  
   [App registrations](https://portal.azure.com/#blade/Microsoft_AAD_IAM/ActiveDirectoryMenuBlade/RegisteredAppsPreview)
3. Create a new app
4. Navigate to `Overview` page of the new app.
5. Get `Application (client) ID` and pass it as a
   `AZURE_CLOUD_LOCAL_EXECUTION_CLIENT_ID` environment variable
6. Get `Directory (tenant) ID` and pass it as
   `AZURE_CLOUD_LOCAL_EXECUTION_DIRECTORY_ID` environment variable
7. Navigate to the `Certificates & secrets` section.
8. Create a new client secret.
9. Store generated token and pass it as
   `AZURE_CLOUD_LOCAL_EXECUTION_CLIENT_SECRET` environment variable
10. Navigate to `API permissions` section
11. Grant `Group.Read.All` and `User.Read.All` permissions
12. Grant admin consent for this directory for the permissions above.

Check this instruction for additional information:
https://docs.microsoft.com/en-us/graph/auth-v2-service

## Entities

The following entity resources are ingested when the integration runs:

| Azure Resource | \_type of the Entity | \_class of the Entity |
| -------------- | -------------------- | --------------------- |
| Account        | `azure_account`      | `Account`             |
| Group          | `azure_user_group`   | `UserGroup`           |
| User           | `azure_user`         | `User`                |

## Relationships

The following relationships are created/mapped:

| From               | Edge         | To                 |
| ------------------ | ------------ | ------------------ |
| `azure_account`    | **HAS**      | `azure_user_group` |
| `azure_account`    | **HAS**      | `azure_user`       |
| `azure_user`       | **ASSIGNED** | `azure_user_group` |
| `azure_user_group` | **HAS**      | `azure_user`       |
| `azure_user_group` | **HAS**      | `azure_user_group` |
