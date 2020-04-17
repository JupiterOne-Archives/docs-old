# JupiterOne Managed Integration for Microsoft Azure

## Overview

JupiterOne provides a managed integration for Microsoft Azure. The integration
connects directly to Microsoft 365 and Azure Resource Manager APIs to obtain
metadata and analyze resource relationships. Customers authorize access by
creating a Service Principal (App Registration) and providing the credentials to
JupiterOne.

## Integration Instance Configuration

The integration is triggered by an event containing the information for a
specific integration instance. Users configure the integration by providing API
credentials obtained through the Azure portal.

Azure Active Directory is authenticated and accessed through the [Microsoft
Graph API][1]. Azure Resource Manager is authenticated and accessed through
[Resource Manager APIs][2].

To create the App Registration:

1. Go to your Azure portal
1. Navigate to **App registrations**
1. Create a new App registration, using the **Name** "JupiterOne", selecting
   **Accounts in this organizational directory only**, with **no** "Redirect
   URI"
1. Navigate to the **Overview** page of the new app
1. Copy the **Application (client) ID**
1. Copy the **Directory (tenant) ID**
1. Navigate to the **Certificates & secrets** section
1. Create a new client secret
1. Copy the generated secret (you only get one chance!)

Grant permission to read Microsoft Graph information:

1. Navigate to **API permissions**, choose **Microsoft Graph**, then
   **Application Permissions**
1. Grant `Directory.Read.All` permissions to allow reading users, groups, and
   members of groups, including organization contacts and Microsoft Intune
   devices
1. Grant admin consent for this directory for the permissions above

Please note that minimally [`User.Read` is required][3] even when AD ingestion
is disabled. The integration will request Organization information to maintain
the `Account` entity.

Grant the `Reader` RBAC subscription role to read Azure Resource Manager
information:

1. Navigate to **Subscriptions**, choose the subscription from which you want to
   ingest resources
1. Copy the **Subscription ID**
1. Navigate to **Access control (IAM)**, then **Add role assignment**
1. Select **Role** "Reader", **Assign access to** "Azure AD user, group, or
   service principal"
1. Search for the App "JupiterOne"

## Entities

The following entity resources are ingested when the integration runs. Note that
ingestion of AD resource can be disabled in the integration configuration,
though the `Account` entity will always be ingested.

| Office 365 / Azure AD Resources | \_type of the Entity | \_class of the Entity |
| ------------------------------- | -------------------- | --------------------- |
| Account                         | `azure_account`      | `Account`             |
| Group                           | `azure_user_group`   | `UserGroup`           |
| Group Member                    | `azure_group_member` | `User`                |
| User                            | `azure_user`         | `User`                |

| Azure Resources      | \_type of the Entity          | \_class of the Entity           |
| -------------------- | ----------------------------- | ------------------------------- |
| Compute              | `azure_vm`                    | `Host`                          |
|                      | `azure_image`                 | `Image`                         |
|                      | `azure_managed_disk`          | `DataStore`, `Disk`             |
| Load Balancer        | `azure_lb`                    | `Gateway`                       |
| Virtual Network      | `azure_vnet`                  | `Network`                       |
| Subnet               | `azure_subnet`                | `Network`                       |
| Security Group       | `azure_security_group`        | `Firewall`                      |
| Network Interface    | `azure_nic`                   | `NetworkInterface`              |
| Public IP Address    | `azure_public_ip`             | `IpAddress`                     |
| Blob (Storage)       | `azure_storage_container`     | `DataStore`                     |
| File Share (Storage) | `azure_storage_share`         | `DataStore`                     |
| Databases            | `azure_mariadb_database`      | `Database`, `DataStore`         |
|                      | `azure_mariadb_server`        | `Database`, `DataStore`, `Host` |
|                      | `azure_mysql_database`        | `Database`, `DataStore`         |
|                      | `azure_mysql_server`          | `Database`, `DataStore`, `Host` |
|                      | `azure_postgresql_database`   | `Database`, `DataStore`         |
|                      | `azure_postgresql_server`     | `Database`, `DataStore`, `Host` |
|                      | `azure_sql_database`          | `Database`, `DataStore`         |
|                      | `azure_sql_server`            | `Database`, `DataStore`, `Host` |
| Cosmos DB            | `azure_cosmosdb_account`      | `Account`                       |
|                      | `azure_cosmosdb_sql_database` | `Database`, `DataStore`         |

## Relationships

The following relationships are created/mapped:

| From                         | Edge         | To                            |
| ---------------------------- | ------------ | ----------------------------- |
| `azure_account`              | **HAS**      | `azure_user`                  |
| `azure_account`              | **HAS**      | `azure_user_group`            |
| `azure_account`              | **HAS**      | `azure_storage_blob_service`  |
| `azure_user_group`           | **HAS**      | `azure_user`                  |
| `azure_user_group`           | **HAS**      | `azure_user_group`            |
| `azure_user_group`           | **HAS**      | `azure_group_member`          |
| `azure_vnet`                 | **CONTAINS** | `azure_subnet`                |
| `azure_subnet`               | **HAS**      | `azure_vm`                    |
| `azure_security_group`       | **PROTECTS** | `azure_subnet`                |
| `azure_security_group`       | **PROTECTS** | `azure_nic`                   |
| `azure_vm`                   | **USES**     | `azure_nic`                   |
| `azure_vm`                   | **USES**     | `azure_managed_disk`          |
| `azure_vm`                   | **USES**     | `azure_public_ip`             |
| `azure_lb`                   | **CONNECTS** | `azure_nic`                   |
| `azure_storage_blob_service` | **HAS**      | `azure_storage_container`     |
| `azure_storage_file_service` | **HAS**      | `azure_storage_share`         |
| `azure_mariadb_server`       | **HAS**      | `azure_mariadb_database`      |
| `azure_mysql_server`         | **HAS**      | `azure_mysql_database`        |
| `azure_postgresql_server`    | **HAS**      | `azure_postgresql_database`   |
| `azure_sql_server`           | **HAS**      | `azure_sql_database`          |
| `azure_cosmosdb_account`     | **HAS**      | `azure_cosmosdb_sql_database` |

[1]: https://docs.microsoft.com/en-us/graph/auth-v2-service
[2]:
  https://docs.microsoft.com/en-us/azure/azure-resource-manager/resource-manager-api-authentication
[3]: https://docs.microsoft.com/en-us/graph/api/organization-get
