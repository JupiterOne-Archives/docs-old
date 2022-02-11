# Integration with JupiterOne

## Signal Sciences + JupiterOne Integration Benefits

- Visualize Signal Sciences corps and users in the JupiterOne graph.
- Monitor changes to Signal Sciences users and corps using JupiterOne alerts.

## How it Works

- JupiterOne periodically fetches users from Signal Sciences to update the
  graph.
- Write JupiterOne queries to review and monitor updates to the graph, or
  leverage existing queries.
- Configure alerts to take action when JupiterOne graph changes, or leverage
  existing alerts.

## Requirements

- JupiterOne requires an API access token. You need access to a user in Signal
  Sciences that has permissions to create an access token.
- You must have permission in JupiterOne to install new integrations.

## Support

If you need help with this integration, please contact
[JupiterOne Support](https://support.jupiterone.io).

## Integration Walkthrough

### In Signal Sciences

1. [Add API access token](https://dashboard.signalsciences.net/corps/jupiterone/user/apitokens#add).
   The access token generated will have the same role as the logged in user. The
   role of **Observer** is sufficient for the ingestion of corps and users.
2. Save the provided token in a secure location. You will need it to configure
   Signal Sciences in JupiterOne.

### In JupiterOne

1. From the configuration **Gear Icon**, select **Integrations**.
2. Scroll to the **Signal Sciences** integration tile and click it.
3. Click the **Add Configuration** button and configure the following settings:

- Enter the **Account Name** by which you'd like to identify this Signal
  Sciences account in JupiterOne. Ingested entities will have this value stored
  in `tag.AccountName` when **Tag with Account Name** is checked.
- Enter a **Description** that will further assist your team when identifying
  the integration instance.
- Select a **Polling Interval** that you feel is sufficient for your monitoring
  needs. You may leave this as `DISABLED` and manually execute the integration.
- Enter the **Signal Sciences user** to be used by JupiterOne. This is most like
  the email associated with the account that was used to generate the API access
  token.
- Enter the **Signal Sciences API access token** generated for use by
  JupiterOne. This was created within the Signal Sciences web app in a previous
  step (see above).

4. Click **Create Configuration** once all values are provided.

# How to Uninstall

1. From the configuration **Gear Icon**, select **Integrations**.
2. Scroll to the **Signal Sciences** integration tile and click it.
3. Identify and click the **integration to delete**.
4. Click the **trash can** icon.
5. Click the **Remove** button to delete the integration.

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

| Resources    | Entity `_type` | Entity `_class` |
| ------------ | -------------- | --------------- |
| Organization | `sigsci_corp`  | `Organization`  |
| User         | `sigsci_user`  | `User`          |

### Relationships

The following relationships are created:

| Source Entity `_type` | Relationship `_class` | Target Entity `_type` |
| --------------------- | --------------------- | --------------------- |
| `sigsci_corp`         | **HAS**               | `sigsci_user`         |

<!--
********************************************************************************
END OF GENERATED DOCUMENTATION AFTER BELOW MARKER
********************************************************************************
-->
<!-- {J1_DOCUMENTATION_MARKER_END} -->
