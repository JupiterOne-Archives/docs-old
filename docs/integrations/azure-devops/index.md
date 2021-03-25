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

| Resources            | Entity `_type`           | Entity `_class` |
| -------------------- | ------------------------ | --------------- |
| ADO Project          | `azure_devops_project`   | `Project`       |
| ADO Team             | `azure_devops_team`      | `UserGroup`     |
| ADO User             | `azure_devops_user`      | `User`          |
| ADO WorkItem         | `azure_devops_work_item` | `Record`        |
| Azure Devops Account | `azure_devops_account`   | `Account`       |

### Relationships

The following relationships are created/mapped:

| Source Entity `_type`  | Relationship `_class` | Target Entity `_type`    |
| ---------------------- | --------------------- | ------------------------ |
| `azure_devops_account` | **HAS**               | `azure_devops_project`   |
| `azure_devops_account` | **HAS**               | `azure_devops_team`      |
| `azure_devops_account` | **HAS**               | `azure_devops_user`      |
| `azure_devops_project` | **HAS**               | `azure_devops_team`      |
| `azure_devops_project` | **HAS**               | `azure_devops_work_item` |
| `azure_devops_team`    | **HAS**               | `azure_devops_user`      |
| `azure_devops_user`    | **ASSIGNED**          | `azure_devops_work_item` |
| `azure_devops_user`    | **CREATED**           | `azure_devops_work_item` |

<!--
********************************************************************************
END OF GENERATED DOCUMENTATION AFTER BELOW MARKER
********************************************************************************
-->
<!-- {J1_DOCUMENTATION_MARKER_END} -->
