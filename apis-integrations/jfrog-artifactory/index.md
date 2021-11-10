# Integration with JupiterOne

## JFrog Artifactory + JupiterOne Integration Benefits

- Visualize Artifactory repository groups, code repositories, code modules,
  builds, keys, permissions, code modules, user groups, and users in the
  JupiterOne graph.
- Monitor Artifactory CI/CD activities across containers and repositories.
- Monitor Artifactory changes to repository groups, code repositories, code
  modules, builds, keys, permissions, code modules, user groups, and users using
  JupiterOne alerts.

## How it Works

- JupiterOne periodically fetches Artifactory users and data across your 
CI/CD pipeline to update the graph.
- Write JupiterOne queries to review and monitor updates to the graph.
- Configure alerts to take action when the JupiterOne graph changes.

## Requirements

- JupiterOne requires the namespace of your Artifactory account. Also required
are a client access token, client pipeline access token, and the client 
administrator name that granted the access tokens.
- You must have permission in JupiterOne to install new integrations.

## Support

If you need help with this integration, please contact
[JupiterOne Support](https://support.jupiterone.io).

## Integration Walkthrough

### In JFrog Artifactory

Configure API access tokens in Artifactory by following the instructions 
in the 
[Access Tokens](https://www.jfrog.com/confluence/display/JFROG/Access+Tokens#AccessTokens-CreateToken)
guide.

### In JupiterOne

1. From the configuration **Gear Icon**, select **Integrations**.
2. Scroll to the **Artifactory** integration tile and click it.
3. Click the **Add Configuration** button and configure the following settings:
- Enter the **Account Name** by which you'd like to identify this Artifactory
   account in JupiterOne. Ingested entities will have this value stored in
   `tag.AccountName` when **Tag with Account Name** is checked.
- Enter a **Description** that will further assist your team when identifying
   the integration instance.
- Select a **Polling Interval** that you feel is sufficient for your monitoring
   needs. You may leave this as `DISABLED` and manually execute the integration.
- Enter the **Client Namespace** of your Artifactory account.
- Enter the **Client Access Token** configured in your Artifactory account.
- Enter the **Client Pipeline Access Token** configured in your Artifactory account.
- Enter the **Client Administrator Name**, or username of the administrator that
granted the Artifactory access tokens.
4. Click **Create Configuration** once all values are provided.

## How to Uninstall

1. From the configuration **Gear Icon**, select **Integrations**.
2. Scroll to the **Artifactory** integration tile and click it.
3. Identify and click the **integration to delete**.
4. Click the **trash can** icon.
5. Click the **Remove** button to delete the integration.

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

| Resources          | Entity `_type`                    | Entity `_class`    |
| ------------------ | --------------------------------- | ------------------ |
| AccessToken        | `artifactory_access_token`        | `Key`, `AccessKey` |
| Account            | `artifactory_account`             | `Account`          |
| ArtifactCodeModule | `artifactory_artifact_codemodule` | `CodeModule`       |
| Build              | `artifactory_build`               | `Configuration`    |
| Group              | `artifactory_group`               | `UserGroup`        |
| Permission         | `artifactory_permission`          | `AccessPolicy`     |
| PipelineSource     | `artifactory_pipeline_source`     | `CodeRepo`         |
| Repository         | `artifactory_repository`          | `Repository`       |
| RepositoryGroup    | `artifactory_repository_group`    | `Group`            |
| User               | `artifactory_user`                | `User`             |

### Relationships

The following relationships are created/mapped:

| Source Entity `_type`      | Relationship `_class` | Target Entity `_type`             |
| -------------------------- | --------------------- | --------------------------------- |
| `artifactory_access_token` | **ASSIGNED**          | `artifactory_user`                |
| `artifactory_account`      | **HAS**               | `artifactory_access_token`        |
| `artifactory_account`      | **HAS**               | `artifactory_group`               |
| `artifactory_account`      | **HAS**               | `artifactory_pipeline_source`     |
| `artifactory_account`      | **HAS**               | `artifactory_repository`          |
| `artifactory_account`      | **HAS**               | `artifactory_repository_group`    |
| `artifactory_account`      | **HAS**               | `artifactory_user`                |
| `artifactory_build`        | **CREATED**           | `artifactory_artifact_codemodule` |
| `artifactory_group`        | **HAS**               | `artifactory_user`                |
| `artifactory_permission`   | **ALLOWS**            | `artifactory_build`               |
| `artifactory_permission`   | **ALLOWS**            | `artifactory_repository`          |
| `artifactory_permission`   | **ALLOWS**            | `artifactory_repository_group`    |
| `artifactory_permission`   | **ASSIGNED**          | `artifactory_group`               |
| `artifactory_permission`   | **ASSIGNED**          | `artifactory_user`                |
| `artifactory_repository`   | **HAS**               | `artifactory_artifact_codemodule` |

<!--
********************************************************************************
END OF GENERATED DOCUMENTATION AFTER BELOW MARKER
********************************************************************************
-->
<!-- {J1_DOCUMENTATION_MARKER_END} -->
