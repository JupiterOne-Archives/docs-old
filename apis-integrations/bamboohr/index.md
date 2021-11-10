# Integration with JupiterOne

## BambooHR + JupiterOne Integration Benefits

- Visualize BambooHR users and files in the JupiterOne graph.
- Map BambooHR users to employees in your JupiterOne account.
- Map BambooHR users identified as employees to their managers to provide an
  organization chart in JupiterOne.
- Monitor changes to BambooHR users using JupiterOne alerts.

## How it Works

- JupiterOne periodically fetches users and files from BambooHR to update the
  graph.
- Additional details stored in BambooHR users is used to map your organization
  management structure.
- Write JupiterOne queries to review and monitor updates to the graph.
- Configure alerts to take action when JupiterOne graph changes.

## Requirements

- JupiterOne requires the subdomain of your BambooHR account. For example:
  "mycompany" is the subdomain of `https://mycompany.bamboohr.com`.
- JupiterOne requires a REST API key. You need permission to create a user in
  BambooHR for association with JupiterOne and obtain an API key associated with
  that user.
- You must have permission in JupiterOne to install new integrations.

## Support

If you need help with this integration, please contact
[JupiterOne Support](https://support.jupiterone.io).

## Integration Walkthrough

### In BambooHR

1. [Generate a REST API key](https://documentation.bamboohr.com/docs/getting-started).

   As described in the BambooHR documentation, the API key will have the
   permissions of the associated user. This means the user must have sufficient
   permissions to create an API key,
   [list users metadata](https://www.bamboohr.com/api/documentation/metadata.php),
   and
   [list employee files](https://www.bamboohr.com/api/documentation/employees.php)
   (we do not read the content).

### In JupiterOne

1. From the configuration **Gear Icon**, select **Integrations**.
2. Scroll to the **BambooHR** integration tile and click it.
3. Click the **Add Configuration** button.
4. Enter the **Account Name** by which you'd like to identify this BambooHR
   account in JupiterOne. Ingested entities will have this value stored in
   `tag.AccountName` when **Tag with Account Name** is checked.
5. Enter a **Description** that will further assist your team when identifying
   the integration instance.
6. Select a **Polling Interval** that you feel is sufficient for your monitoring
   needs. You may leave this as `DISABLED` and manually execute the integration.
7. Enter the **Client Namespace** (subdomain) for your BoombooHR account.
8. Enter the BambooHR **API Key** generated for use by JupiterOne.
9. Click **Create Configuration** once all values are provided.

# How to Uninstall

1. From the configuration **Gear Icon**, select **Integrations**.
2. Scroll to the **BambooHR** integration tile and click it.
3. Identify and click the **integration to delete**.
4. Click the **trash can** icon.
5. Click the **Remove** button to delete the integration.
6. Delete the BambooHR user created for use by JupiterOne.

<!-- {J1_DOCUMENTATION_MARKER_START} -->
<!--
********************************************************************************
NOTE: ALL OF THE FOLLOWING DOCUMENTATION IS GENERATED USING THE
"j1-integration document" COMMAND. DO NOT EDIT BY HAND! PLEASE SEE THE DEVELOPER
DOCUMENTATION FOR USAGE INFORMATION:

https://github.com/JupiterOne/sdk/blob/main/docs/integrations/development.md
********************************************************************************
-->

## Data Model

### Entities

The following entities are created:

| Resources | Entity `_type`      | Entity `_class` |
| --------- | ------------------- | --------------- |
| Account   | `bamboohr_account`  | `Account`       |
| Employee  | `bamboohr_employee` | `Record`        |
| File      | `bamboohr_file`     | `DataObject`    |
| User      | `bamboohr_user`     | `User`          |

### Relationships

The following relationships are created:

| Source Entity `_type` | Relationship `_class` | Target Entity `_type` |
| --------------------- | --------------------- | --------------------- |
| `bamboohr_account`    | **HAS**               | `bamboohr_employee`   |
| `bamboohr_account`    | **HAS**               | `bamboohr_file`       |
| `bamboohr_account`    | **HAS**               | `bamboohr_user`       |
| `bamboohr_user`       | **HAS**               | `bamboohr_file`       |
| `bamboohr_user`       | **IS**                | `bamboohr_employee`   |

<!--
********************************************************************************
END OF GENERATED DOCUMENTATION AFTER BELOW MARKER
********************************************************************************
-->
<!-- {J1_DOCUMENTATION_MARKER_END} -->
