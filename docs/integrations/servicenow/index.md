# Integration with JupiterOne

## Setup

The JupiterOne ServiceNow integration is configured using your target ServiceNow
implementation's `hostname`, such as `my-company.service-now.com`.

The integration authenticates using Basic auth with your administrator
`username` and `password`. Whenever possible, we recommend creating a new admin
user in your ServiceNow implementation to be used strictly for authenticating
with this integration.

### Creating a new user admin

Follow the steps below or the steps provided in the
[ServiceNow Product Documentation](https://docs.servicenow.com/bundle/paris-platform-administration/page/administer/users-and-groups/task/t_CreateAUser.html).

1. Navigate to **User Administration > Users**:
   ![create-new-user](../docs/integrations/servicenow/images/create-new-user.png)

1. Create a new user to be used to authenticate your JupiterOne integration, and
   click Submit: ![create-j1-user](../docs/integrations/servicenow/images/create-j1-user.png)

1. Edit your new user: ![edit-user](../docs/integrations/servicenow/images/edit-user.png)

1. Navigate to **Roles > Edit**: ![edit-user-role](../docs/integrations/servicenow/images/edit-user-role.png)

1. Add the **admin** role to your new user:
   ![add-admin-role](../docs/integrations/servicenow/images/add-admin-role.png)

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

| Resources  | Entity `_type`         | Entity `_class` |
| ---------- | ---------------------- | --------------- |
| Account    | `service_now_account`  | `Account`       |
| Incident   | `service_now_incident` | `Incident`      |
| User       | `service_now_user`     | `User`          |
| User Group | `service_now_group`    | `UserGroup`     |

### Relationships

The following relationships are created/mapped:

| Source Entity `_type`  | Relationship `_class` | Target Entity `_type` |
| ---------------------- | --------------------- | --------------------- |
| `service_now_account`  | **HAS**               | `service_now_group`   |
| `service_now_account`  | **HAS**               | `service_now_user`    |
| `service_now_group`    | **HAS**               | `service_now_group`   |
| `service_now_group`    | **HAS**               | `service_now_user`    |
| `service_now_incident` | **ASSIGNED**          | `service_now_user`    |

<!--
********************************************************************************
END OF GENERATED DOCUMENTATION AFTER BELOW MARKER
********************************************************************************
-->
<!-- {J1_DOCUMENTATION_MARKER_END} -->
