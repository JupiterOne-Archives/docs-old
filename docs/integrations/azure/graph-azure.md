# Integration with JupiterOne

## Azure + JupiterOne Integration Benefits 

- Visualize Azure cloud resources in the JupiterOne graph.
- Map Azure users to employees in your JupiterOne account.
- Monitor visibility and governance of your Azure cloud environment by
  leveraging hundreds of out of the box queries.
- Monitor compliance against the Azure CIS Benchmarks framework and other security
  benchmarks using the JupiterOne compliance app.
- Monitor Azure vulnerabilities and findings from multiple services within the
  alerts app.
- Monitor changes to your Azure cloud resources using multiple JupiterOne alert
  rule packs specific to Azure.

## How it Works

- JupiterOne periodically fetches users and cloud resources from Azure to update the graph.
- Write JupiterOne queries to review and monitor updates to the graph, or leverage existing queries.
- Configure alerts to take action when the JupiterOne graph changes, or leverage existing alerts.

## Requirements

- JupiterOne requires the API credentials for the Azure endpoint, specifically the Directory (tenant) id,
the Application (client) id, and the Application (client) secret with the correct permissions assigned.
- You must have permission in JupiterOne to install new integrations.

## Support

If you need help with this integration, please contact
[JupiterOne Support](https://support.jupiterone.io).

## Integration Walkthrough

Customers authorize access by creating a Service Principal (App Registration) 
and providing the credentials to JupiterOne.

The integration is triggered by an event containing the information for a
specific integration instance. Users configure the integration by providing API
credentials obtained through the Azure portal.

Azure Active Directory is authenticated and accessed through the [Microsoft
Graph API][1]. Azure Resource Manager is authenticated and accessed through
[Resource Manager APIs][2].

### In Azure

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

#### APIPermissions

Grant permission to read Microsoft Graph information:

1. Navigate to **API permissions**, choose **Microsoft Graph**, then
   **Application Permissions**
1. Grant the following permissions to the application:

   **Required**

   - `Directory.Read.All`

   **Optional**

   | Permission        | Endpoint(s)                                                                                                                                                                   |
   | ----------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
   | `Policy.Read.All` | [/policies/identitySecurityDefaultsEnforcementPolicy](https://docs.microsoft.com/en-us/graph/api/identitysecuritydefaultsenforcementpolicy-get?view=graph-rest-1.0&tabs=http) |

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

### In JupiterOne

1. From the configuration **Gear Icon**, select **Integrations**.
2. Scroll to the **Azure** integration tile and click it.
3. Click the **Add Configuration** button and configure the following settings:
- Enter the **Account Name** by which you'd like to identify this Azure
   account in JupiterOne. Ingested entities will have this value stored in
   `tag.AccountName` when **Tag with Account Name** is checked.
- Enter a **Description** that will further assist your team when identifying
   the integration instance.
- Select a **Polling Interval** that you feel is sufficient for your monitoring
   needs. You may leave this as `DISABLED` and manually execute the integration.
- Enter the **Directory (tenant) ID** of the Active Directory to target in Azure
API requests.
- Enter the **Application (client) ID** created for JupiterOne, used to authenticate
with Azure.
- Enter the **Application (client) Secret** associated with the application ID, used
to authenticate with Azure.
- Select the option **Ingest Active Directory** to ingest Directory information. This
  should only be enabled in one integration instance per Directory.
4. Click **Create Configuration** once all values are provided.

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

| Resources                                 | Entity `_type`                               | Entity `_class`                    |
| ----------------------------------------- | -------------------------------------------- | ---------------------------------- |
| [AD] Account                              | `azure_account`                              | `Account`                          |
| [AD] Group                                | `azure_user_group`                           | `UserGroup`                        |
| [AD] Group Member                         | `azure_group_member`                         | `User`                             |
| [AD] Service Principal                    | `azure_service_principal`                    | `Service`                          |
| [AD] User                                 | `azure_user`                                 | `User`                             |
| [RM] API Management API                   | `azure_api_management_api`                   | `ApplicationEndpoint`              |
| [RM] API Management Service               | `azure_api_management_service`               | `Gateway`                          |
| [RM] Advisor Recommendation               | `azure_advisor_recommendation`               | `Finding`                          |
| [RM] Azure Managed Disk                   | `azure_managed_disk`                         | `DataStore`, `Disk`                |
| [RM] Batch Account                        | `azure_batch_account`                        | `Service`                          |
| [RM] Batch Application                    | `azure_batch_application`                    | `Process`                          |
| [RM] Batch Certificate                    | `azure_batch_certificate`                    | `Certificate`                      |
| [RM] Batch Pool                           | `azure_batch_pool`                           | `Cluster`                          |
| [RM] CDN Endpoint                         | `azure_cdn_endpoint`                         | `Gateway`                          |
| [RM] CDN Profile                          | `azure_cdn_profile`                          | `Service`                          |
| [RM] Classic Admin                        | `azure_classic_admin_group`                  | `UserGroup`                        |
| [RM] Container                            | `azure_container`                            | `Container`                        |
| [RM] Container Group                      | `azure_container_group`                      | `Group`                            |
| [RM] Container Registry                   | `azure_container_registry`                   | `DataStore`                        |
| [RM] Container Registry Webhook           | `azure_container_registry_webhook`           | `ApplicationEndpoint`              |
| [RM] Container Volume                     | `azure_container_volume`                     | `Disk`                             |
| [RM] Cosmos DB Account                    | `azure_cosmosdb_account`                     | `Account`, `Service`               |
| [RM] Cosmos DB Database                   | `azure_cosmosdb_sql_database`                | `Database`, `DataStore`            |
| [RM] DNS Record Set                       | `azure_dns_record_set`                       | `DomainRecord`                     |
| [RM] DNS Zone                             | `azure_dns_zone`                             | `DomainZone`                       |
| [RM] Event Grid Domain                    | `azure_event_grid_domain`                    | `Service`                          |
| [RM] Event Grid Domain Topic              | `azure_event_grid_domain_topic`              | `Queue`                            |
| [RM] Event Grid Topic                     | `azure_event_grid_topic`                     | `Queue`                            |
| [RM] Event Grid Topic Subscription        | `azure_event_grid_topic_subscription`        | `Subscription`                     |
| [RM] Image                                | `azure_image`                                | `Image`                            |
| [RM] Key Vault                            | `azure_keyvault_service`                     | `Service`                          |
| [RM] Load Balancer                        | `azure_lb`                                   | `Gateway`                          |
| [RM] Location                             | `azure_location`                             | `Site`                             |
| [RM] MariaDB Database                     | `azure_mariadb_database`                     | `Database`, `DataStore`            |
| [RM] MariaDB Server                       | `azure_mariadb_server`                       | `Database`, `DataStore`, `Host`    |
| [RM] Monitor Activity Log Alert           | `azure_monitor_activity_log_alert`           | `Rule`                             |
| [RM] Monitor Diagnostic Settings Resource | `azure_diagnostic_setting`                   | `Configuration`                    |
| [RM] Monitor Log Profile                  | `azure_monitor_log_profile`                  | `Configuration`                    |
| [RM] MySQL Database                       | `azure_mysql_database`                       | `Database`, `DataStore`            |
| [RM] MySQL Server                         | `azure_mysql_server`                         | `Database`, `DataStore`, `Host`    |
| [RM] Network Azure Firewall               | `azure_network_azure_firewall`               | `Firewall`                         |
| [RM] Network Interface                    | `azure_nic`                                  | `NetworkInterface`                 |
| [RM] Network Watcher                      | `azure_network_watcher`                      | `Resource`                         |
| [RM] Policy Assignment                    | `azure_policy_assignment`                    | `ControlPolicy`                    |
| [RM] PostgreSQL Database                  | `azure_postgresql_database`                  | `Database`, `DataStore`            |
| [RM] PostgreSQL Server                    | `azure_postgresql_server`                    | `Database`, `DataStore`, `Host`    |
| [RM] PostgreSQL Server Firewall Rule      | `azure_postgresql_server_firewall_rule`      | `Firewall`                         |
| [RM] Private DNS Record Set               | `azure_private_dns_record_set`               | `DomainRecord`                     |
| [RM] Private DNS Zone                     | `azure_private_dns_zone`                     | `DomainZone`                       |
| [RM] Public IP Address                    | `azure_public_ip`                            | `IpAddress`                        |
| [RM] Redis Cache                          | `azure_redis_cache`                          | `Database`, `DataStore`, `Cluster` |
| [RM] Redis Firewall Rule                  | `azure_firewall_rule`                        | `Firewall`                         |
| [RM] Resource Group                       | `azure_resource_group`                       | `Group`                            |
| [RM] Role Assignment                      | `azure_role_assignment`                      | `AccessPolicy`                     |
| [RM] Role Definition                      | `azure_role_definition`                      | `AccessRole`                       |
| [RM] SQL Database                         | `azure_sql_database`                         | `Database`, `DataStore`            |
| [RM] SQL Server                           | `azure_sql_server`                           | `Database`, `DataStore`, `Host`    |
| [RM] SQL Server Active Directory Admin    | `azure_sql_server_active_directory_admin`    | `AccessRole`                       |
| [RM] SQL Server Firewall Rule             | `azure_sql_server_firewall_rule`             | `Firewall`                         |
| [RM] Security Assessment                  | `azure_security_assessment`                  | `Assessment`                       |
| [RM] Security Center Subscription Pricing | `azure_security_center_subscription_pricing` | `Configuration`                    |
| [RM] Security Contact                     | `azure_security_center_contact`              | `Resource`                         |
| [RM] Security Group                       | `azure_security_group`                       | `Firewall`                         |
| [RM] Security Group Flow Logs             | `azure_security_group_flow_logs`             | `Logs`                             |
| [RM] Service Bus Namespace                | `azure_service_bus_namespace`                | `Service`                          |
| [RM] Service Bus Queue                    | `azure_service_bus_queue`                    | `Queue`                            |
| [RM] Service Bus Subscription             | `azure_service_bus_subscription`             | `Subscription`                     |
| [RM] Service Bus Topic                    | `azure_service_bus_topic`                    | `Queue`                            |
| [RM] Storage Account                      | `azure_storage_account`                      | `Service`                          |
| [RM] Storage Container                    | `azure_storage_container`                    | `DataStore`                        |
| [RM] Storage File Share                   | `azure_storage_file_share`                   | `DataStore`                        |
| [RM] Storage Queue                        | `azure_storage_queue`                        | `Queue`                            |
| [RM] Storage Table                        | `azure_storage_table`                        | `DataStore`, `Database`            |
| [RM] Subnet                               | `azure_subnet`                               | `Network`                          |
| [RM] Subscription                         | `azure_subscription`                         | `Account`                          |
| [RM] Virtual Machine                      | `azure_vm`                                   | `Host`                             |
| [RM] Virtual Machine Extension            | `azure_vm_extension`                         | `Application`                      |
| [RM] Virtual Network                      | `azure_vnet`                                 | `Network`                          |

### Relationships

The following relationships are created/mapped:

| Source Entity `_type`              | Relationship `_class` | Target Entity `_type`                        |
| ---------------------------------- | --------------------- | -------------------------------------------- |
| `azure_account`                    | **HAS**               | `azure_user_group`                           |
| `azure_account`                    | **HAS**               | `azure_keyvault_service`                     |
| `azure_account`                    | **HAS**               | `azure_user`                                 |
| `azure_api_management_service`     | **HAS**               | `azure_api_management_api`                   |
| `azure_security_assessment`        | **IDENTIFIED**        | `azure_advisor_recommendation`               |
| `azure_batch_account`              | **HAS**               | `azure_batch_application`                    |
| `azure_batch_account`              | **HAS**               | `azure_batch_certificate`                    |
| `azure_batch_account`              | **HAS**               | `azure_batch_pool`                           |
| `azure_cdn_profile`                | **HAS**               | `azure_cdn_endpoint`                         |
| `azure_classic_admin_group`        | **HAS**               | `azure_user`                                 |
| `azure_container_group`            | **HAS**               | `azure_container`                            |
| `azure_container_group`            | **HAS**               | `azure_container_volume`                     |
| `azure_container_registry`         | **HAS**               | `azure_container_registry_webhook`           |
| `azure_container`                  | **USES**              | `azure_container_volume`                     |
| `azure_container_volume`           | **USES**              | `azure_storage_file_share`                   |
| `azure_cosmosdb_account`           | **HAS**               | `azure_cosmosdb_sql_database`                |
| `azure_diagnostic_setting`         | **USES**              | `azure_storage_account`                      |
| `azure_dns_zone`                   | **HAS**               | `azure_dns_record_set`                       |
| `azure_event_grid_domain`          | **HAS**               | `azure_event_grid_domain_topic`              |
| `azure_event_grid_domain_topic`    | **HAS**               | `azure_event_grid_topic_subscription`        |
| `azure_event_grid_topic`           | **HAS**               | `azure_event_grid_topic_subscription`        |
| `azure_user_group`                 | **HAS**               | `azure_user_group`                           |
| `azure_user_group`                 | **HAS**               | `azure_group_member`                         |
| `azure_user_group`                 | **HAS**               | `azure_user`                                 |
| `azure_lb`                         | **CONNECTS**          | `azure_nic`                                  |
| `azure_location`                   | **HAS**               | `azure_network_watcher`                      |
| `azure_mariadb_server`             | **HAS**               | `azure_mariadb_database`                     |
| `azure_monitor_activity_log_alert` | **MONITORS**          | `ANY_SCOPE`                                  |
| `azure_monitor_log_profile`        | **USES**              | `azure_storage_account`                      |
| `azure_mysql_server`               | **HAS**               | `azure_mysql_database`                       |
| `azure_network_watcher`            | **HAS**               | `azure_security_group_flow_logs`             |
| `azure_postgresql_server`          | **HAS**               | `azure_postgresql_database`                  |
| `azure_postgresql_server`          | **HAS**               | `azure_postgresql_server_firewall_rule`      |
| `azure_private_dns_zone`           | **HAS**               | `azure_private_dns_record_set`               |
| `azure_redis_cache`                | **CONNECTS**          | `azure_redis_cache`                          |
| `azure_redis_cache`                | **HAS**               | `azure_firewall_rule`                        |
| `azure_resource_group`             | **HAS**               | `azure_api_management_service`               |
| `azure_resource_group`             | **HAS**               | `azure_batch_account`                        |
| `azure_resource_group`             | **HAS**               | `azure_cdn_profile`                          |
| `azure_resource_group`             | **HAS**               | `azure_container_group`                      |
| `azure_resource_group`             | **HAS**               | `azure_container_registry`                   |
| `azure_resource_group`             | **HAS**               | `azure_cosmosdb_account`                     |
| `azure_resource_group`             | **HAS**               | `azure_dns_zone`                             |
| `azure_resource_group`             | **HAS**               | `azure_event_grid_domain`                    |
| `azure_resource_group`             | **HAS**               | `azure_event_grid_topic`                     |
| `azure_resource_group`             | **HAS**               | `azure_image`                                |
| `azure_resource_group`             | **HAS**               | `azure_keyvault_service`                     |
| `azure_resource_group`             | **HAS**               | `azure_lb`                                   |
| `azure_resource_group`             | **HAS**               | `azure_managed_disk`                         |
| `azure_resource_group`             | **HAS**               | `azure_mariadb_server`                       |
| `azure_resource_group`             | **HAS**               | `azure_monitor_activity_log_alert`           |
| `azure_resource_group`             | **HAS**               | `azure_mysql_server`                         |
| `azure_resource_group`             | **HAS**               | `azure_network_azure_firewall`               |
| `azure_resource_group`             | **HAS**               | `azure_network_watcher`                      |
| `azure_resource_group`             | **HAS**               | `azure_nic`                                  |
| `azure_resource_group`             | **HAS**               | `azure_postgresql_server`                    |
| `azure_resource_group`             | **HAS**               | `azure_private_dns_zone`                     |
| `azure_resource_group`             | **HAS**               | `azure_public_ip`                            |
| `azure_resource_group`             | **HAS**               | `azure_redis_cache`                          |
| `azure_resource_group`             | **HAS**               | `azure_security_group`                       |
| `azure_resource_group`             | **HAS**               | `azure_service_bus_namespace`                |
| `azure_resource_group`             | **HAS**               | `azure_sql_server`                           |
| `azure_resource_group`             | **HAS**               | `azure_storage_account`                      |
| `azure_resource_group`             | **HAS**               | `azure_vm`                                   |
| `azure_resource_group`             | **HAS**               | `azure_vnet`                                 |
| `ANY_SCOPE`                        | **HAS**               | `azure_diagnostic_setting`                   |
| `ANY_SCOPE`                        | **HAS**               | `azure_advisor_recommendation`               |
| `ANY_SCOPE`                        | **HAS**               | `azure_policy_assignment`                    |
| `azure_role_assignment`            | **ALLOWS**            | `azure_api_management_service`               |
| `azure_role_assignment`            | **ALLOWS**            | `azure_container_registry`                   |
| `azure_role_assignment`            | **ALLOWS**            | `azure_cosmosdb_account`                     |
| `azure_role_assignment`            | **ALLOWS**            | `azure_dns_zone`                             |
| `azure_role_assignment`            | **ALLOWS**            | `azure_keyvault_service`                     |
| `azure_role_assignment`            | **ALLOWS**            | `azure_nic`                                  |
| `azure_role_assignment`            | **ALLOWS**            | `azure_private_dns_zone`                     |
| `azure_role_assignment`            | **ALLOWS**            | `azure_public_ip`                            |
| `azure_role_assignment`            | **ALLOWS**            | `azure_resource_group`                       |
| `azure_role_assignment`            | **ALLOWS**            | `azure_security_group`                       |
| `azure_role_assignment`            | **ALLOWS**            | `azure_storage_account`                      |
| `azure_role_assignment`            | **ALLOWS**            | `azure_subscription`                         |
| `azure_role_assignment`            | **ALLOWS**            | `azure_vnet`                                 |
| `azure_role_assignment`            | **ASSIGNED**          | `azure_application`                          |
| `azure_role_assignment`            | **ASSIGNED**          | `azure_directory`                            |
| `azure_role_assignment`            | **ASSIGNED**          | `azure_directory_role_template`              |
| `azure_role_assignment`            | **ASSIGNED**          | `azure_everyone`                             |
| `azure_role_assignment`            | **ASSIGNED**          | `azure_foreign_group`                        |
| `azure_role_assignment`            | **ASSIGNED**          | `azure_msi`                                  |
| `azure_role_assignment`            | **ASSIGNED**          | `azure_service_principal`                    |
| `azure_role_assignment`            | **ASSIGNED**          | `azure_unknown`                              |
| `azure_role_assignment`            | **ASSIGNED**          | `azure_unknown_principal_type`               |
| `azure_role_assignment`            | **ASSIGNED**          | `azure_user`                                 |
| `azure_role_assignment`            | **ASSIGNED**          | `azure_user_group`                           |
| `azure_role_assignment`            | **USES**              | `azure_role_definition`                      |
| `azure_security_group_flow_logs`   | **USES**              | `azure_storage_account`                      |
| `azure_security_group`             | **HAS**               | `azure_security_group_flow_logs`             |
| `azure_security_group`             | **PROTECTS**          | `azure_nic`                                  |
| `azure_security_group`             | **PROTECTS**          | `azure_subnet`                               |
| `azure_security_group`             | **ALLOWS**            | `azure_subnet`                               |
| `azure_service_bus_namespace`      | **HAS**               | `azure_service_bus_queue`                    |
| `azure_service_bus_namespace`      | **HAS**               | `azure_service_bus_topic`                    |
| `azure_service_bus_topic`          | **HAS**               | `azure_service_bus_subscription`             |
| `azure_sql_server`                 | **HAS**               | `azure_sql_server_active_directory_admin`    |
| `azure_sql_server`                 | **HAS**               | `azure_sql_database`                         |
| `azure_sql_server`                 | **HAS**               | `azure_sql_server_firewall_rule`             |
| `azure_storage_account`            | **HAS**               | `azure_storage_container`                    |
| `azure_storage_account`            | **HAS**               | `azure_storage_file_share`                   |
| `azure_storage_account`            | **HAS**               | `azure_storage_queue`                        |
| `azure_storage_account`            | **HAS**               | `azure_storage_table`                        |
| `azure_storage_account`            | **USES**              | `azure_keyvault_service`                     |
| `azure_subnet`                     | **HAS**               | `azure_vm`                                   |
| `azure_subscription`               | **HAS**               | `azure_monitor_log_profile`                  |
| `azure_subscription`               | **HAS**               | `azure_resource_group`                       |
| `azure_subscription`               | **HAS**               | `azure_security_center_contact`              |
| `azure_subscription`               | **HAS**               | `azure_security_center_subscription_pricing` |
| `azure_subscription`               | **PERFORMED**         | `azure_security_assessment`                  |
| `azure_subscription`               | **USES**              | `azure_location`                             |
| `azure_vm`                         | **USES**              | `azure_managed_disk`                         |
| `azure_vm`                         | **USES**              | `azure_nic`                                  |
| `azure_vm`                         | **USES**              | `azure_public_ip`                            |
| `azure_vm`                         | **USES**              | `azure_storage_account`                      |
| `azure_vnet`                       | **CONTAINS**          | `azure_subnet`                               |

<!--
********************************************************************************
END OF GENERATED DOCUMENTATION AFTER BELOW MARKER
********************************************************************************
-->
<!-- {J1_DOCUMENTATION_MARKER_END} -->

<!-- {J1_DOCUMENTATION_DIAGNOSTIC_SETTINGS_MARKER_START} -->
<!--
********************************************************************************
NOTE: ALL OF THE FOLLOWING DOCUMENTATION IS GENERATED USING THE
"j1-azure-integration document-diagnostic-settings" COMMAND. DO NOT EDIT BY HAND!
********************************************************************************
-->

### Diagnostic Settings

Azure Diagnostic Settings are supported on many Azure resources. A list of
supported services / metrics can be found in
[Azure documentation](https://docs.microsoft.com/en-us/azure/azure-monitor/essentials/metrics-supported).

The JupiterOne graph-azure project currently ingests diagnostic settings for the
following entities:

- azure_api_management_service
- azure_batch_account
- azure_cdn_endpoint
- azure_cdn_profile
- azure_container_registry
- azure_event_grid_domain
- azure_event_grid_topic
- azure_keyvault_service
  - Log Categories:
    - AuditEvent
- azure_lb
- azure_mariadb_server
- azure_mysql_server
- azure_network_azure_firewall
- azure_postgresql_server
- azure_public_ip
- azure_security_group
- azure_sql_server
- azure_subscription
  - Log Categories:
    - Administrative
    - Alert
    - Policy
    - Security
- azure_vnet

<!--
********************************************************************************
END OF GENERATED DOCUMENTATION AFTER BELOW MARKER
********************************************************************************
-->
<!-- {J1_DOCUMENTATION_DIAGNOSTIC_SETTINGS_MARKER_END} -->

[1]: https://docs.microsoft.com/en-us/graph/auth-v2-service
[2]:
  https://docs.microsoft.com/en-us/azure/azure-resource-manager/resource-manager-api-authentication
[3]: https://docs.microsoft.com/en-us/graph/api/organization-get