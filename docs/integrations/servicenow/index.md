# Integration with JupiterOne

## Setup

The JupiterOne ServiceNow integration is configured using your target ServiceNow
implementation's `hostname`, such as `my-company.service-now.com`.

The integration authenticates using Basic auth with `username` and `password`
for a read-only account. Whenever possible, we recommend creating a new user in
your ServiceNow implementation to be used strictly for authenticating with this
integration.

### In ServiceNow

In order to allow JupiterOne to fetch data from your ServiceNow account, we
recommend creating a new ServiceNow role with read-only access to your account
and assigning that read-only role to a dedicated ServiceNow user.

1. Follow the ServiceNow documentation to
   [create a new ServiceNow role](https://docs.servicenow.com/bundle/rome-platform-administration/page/administer/roles/task/t_CreateARole.html)
   called `jupiterone_reader`.

2. For each of the ServiceNow tables used in the JupiterOne <-> ServiceNow
   integration,
   [create a new access control rule (ACL)](https://docs.servicenow.com/bundle/rome-it-service-management/page/product/change-management/task/t_CreateNewACL.html)
   to allow access to the `jupiterone_reader` role with `Type: Record`,
   `Operation: Read`, and `Role: jupiterone_reader`. This should be enabled for
   the following tables (found in the `Name` field):

   - `sys_user`
   - `sys_user_group`
   - `sys_user_grmember`
   - `incident`

3. Create a
   [new ServiceNow User](https://docs.servicenow.com/bundle/rome-platform-administration/page/administer/users-and-groups/task/t_CreateAUser.html)
   called `JupiterOne`. Make a note of the new username/password; you'll need it
   when configuring your integration in JupiterOne.

4. Open the `JupiterOne` user and
   [assign the `jupiterone_reader` role](https://docs.servicenow.com/bundle/rome-platform-administration/page/administer/users-and-groups/task/t_AssignARoleToAUser.html)
   to your newly created user.

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
