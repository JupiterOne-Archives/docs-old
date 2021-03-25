# Integration with JupiterOne

## Microsoft 365 + JupiterOne Integration Benefits

- Visualize Microsoft 365 Active Directory users, groups, and members in the JupiterOne graph.
- Map Microsoft 365 users to employees in your JupiterOne account.
- Monitor changes to Microsoft 365 users and groups using JupiterOne alerts.

## How it Works

- JupiterOne requests credentials to periodically fetch acocunt
  information, users, groups, and group members from Microsoft 365 to update the
  graph.
- Write JupiterOne queries to review and monitor updates to the graph.
- Configure alerts to take action when JupiterOne graph changes occur.

## Requirements

- A Microsoft 365 user with the ability to grant admin consent to the JupiterOne
  App (global administrator). Users may configure the allowed scopes in the
  JupiterOne UI before being directed to the Microsoft Idenity Platform to grant
  consent.
- You must have permission in JupiterOne to install new integrations.

## Support

If you need help with this integration, please contact
[JupiterOne Support](https://support.jupiterone.io).

## Integration Walkthrough

### In JupiterOne

1. From the configuration **Gear Icon**, select **Integrations**.

   <img src="https://github.com/JupiterOne/graph-microsoft-365/blob/master/docs/images/LandingPage.png?raw=true" alt="drawing" width="200"/>

2. Scroll to the **Microsoft-365** integration tile and click it.

   <img src="https://github.com/JupiterOne/graph-microsoft-365/blob/master/docs/images/DefinitionsPage.png?raw=true" alt="drawing" width="200"/>

3. Click the **Add Configuration** button.

   <img src="https://github.com/JupiterOne/graph-microsoft-365/blob/master/docs/images/InstancesPage.png?raw=true" alt="drawing" width="200"/>

4. Enter the **Account Name** by which you'd like to identify this Microsoft 365
   account in JupiterOne. Ingested entities will have this value stored in
   `tag.AccountName` when **Tag with Account Name** is checked.
5. Enter a **Description** that will further assist your team when identifying
   the integration instance.
6. Select a **Polling Interval** that you feel is sufficient for your monitoring
   needs. You may leave this as `DISABLED` and manually execute the integration.
7. Select which **Scopes** you would like JupiterOne to be able to pull data
   for.
8. Click **Create Configuration** once all values are provided.

   <img src="https://github.com/JupiterOne/graph-microsoft-365/blob/master/docs/images/CompleteConfiguration.png?raw=true" alt="drawing" width="200"/>
   <img src="https://github.com/JupiterOne/graph-microsoft-365/blob/master/docs/images/IntegrationCreatedDialog.png?raw=true" alt="drawing" width="200"/>

9. When prompted, click "Complete Offsite" in the dialog.

   <img src="https://github.com/JupiterOne/graph-microsoft-365/blob/master/docs/images/OffsiteDialog.png?raw=true" alt="drawing" width="200"/>

10. You will be directed to Microsoft's identity platform, where you must login
    in as an administrator in the Microsoft organization you intend to integrate
    with.

       <img src="https://github.com/JupiterOne/graph-microsoft-365/blob/master/docs/images/PickAnAccount.png?raw=true" alt="drawing" width="200"/>

    NOTE: You must select a business account which are indicated by badge icons.
    If you select a personal account, you will recieve the below error messaage.

       <img src="https://github.com/JupiterOne/graph-microsoft-365/blob/master/docs/images/PersonalAccountError.png?raw=true" alt="drawing" width="200"/>

11. Review requested permissions and grant consent.

      <img src="https://github.com/JupiterOne/graph-microsoft-365/blob/master/docs/images/PickAnAccount.png?raw=true" alt="drawing" width="200"/>

# How to Uninstall

1. From the configuration **Gear Icon**, select **Integrations**.
2. Scroll to the **Microsoft 365** integration tile and click it.
3. Identify and click the **integration to delete**.
4. Click the **trash can** icon.
5. Click the **Remove** button to delete the integration.

## Setup

Authorize access to JupiterOne:

1. Log in to JupiterOne as a user with permission to set up an integration
1. Add a Microsoft 365 integration instance
1. Once you have finished configuring your new instance, you will be directed to
   Microsoft's identity platform, where you must login in as an administrator in
   the organization you intend to integrate
1. Review requested permissions and grant consent

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

| Resources         | Entity `_type`               | Entity `_class`            |
| ----------------- | ---------------------------- | -------------------------- |
| [AD] Account      | `microsoft_365_account`      | `Account`                  |
| [AD] Group        | `microsoft_365_user_group`   | `microsoft_365_user_group` |
| [AD] Group Member | `microsoft_365_group_member` | `User`                     |
| [AD] User         | `microsoft_365_user`         | `User`                     |

### Relationships

The following relationships are created/mapped:

| Source Entity `_type`      | Relationship `_class` | Target Entity `_type`        |
| -------------------------- | --------------------- | ---------------------------- |
| `microsoft_365_user_group` | **HAS**               | `microsoft_365_user_group`   |
| `microsoft_365_user_group` | **HAS**               | `microsoft_365_user`         |
| `microsoft_365_account`    | **HAS**               | `microsoft_365_user_group`   |
| `microsoft_365_account`    | **HAS**               | `microsoft_365_user`         |
| `microsoft_365_user_group` | **HAS**               | `microsoft_365_group_member` |

<!--
********************************************************************************
END OF GENERATED DOCUMENTATION AFTER BELOW MARKER
********************************************************************************
-->
<!-- {J1_DOCUMENTATION_MARKER_END} -->
