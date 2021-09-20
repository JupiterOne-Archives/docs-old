# JupiterOne Access Controls

Each JupiterOne account has one of the following two access control
configurations:

- **Standard access control** (default on all accounts)
- **Granular access control** (available upon request to all PLUS/ENTERPRISE
  tier accounts)

## Standard Access Control

**Standard access control** is the default configuration on all JupiterOne
accounts. There are two access levels across all resources:

- Users in the **Administrators** group have **full admin access** to all
  resources

- All other users in other groups have **read-only access** to all
  resources, as well as the permission to **save queries as questions**.

Standard access control is similar to the **Top Level Permissions** in Granular Access Control.

## Granular Access Control

**Granular access control** is available to all PLUS and ENTERPRISE tier
accounts. It allows more fine grain access configuration at each user group
level to achieve role-based access control (RBAC).

When enabled, to configure access permissions, go to Settings:

**Settings** ![settings](../assets/icons/gear.png" style="zoom:75%;") -> **Users & Access**  and select the user group you want to edit. Then, click the <img src="../assets/icons/shield.png" style="zoom:67%;" />.

  ![app-permissions](../assets/app-permissions.png)

### Query Permissions

Enterprise customers can set query permissions for a user group. A query 
permission applies the filter constraints on the data that users in the group are 
allowed to query. You can configure permission filters by:

- Entity class
- Entity type
- Integration class
- Integration type
- Integration configuration instance

You can add as many filters as you want to the permission set. To configure 
query permissions:

1. Go to **Settings** ![settings](../assets/icons/gear.png" style="zoom:75%;") -> **Users & Access**.
2. Select the user group you want to edit and click the <img src="../assets/icons/shield.png" style="zoom:67%;" />. 
3. In the permission set modal, select and add the type and values for each 
   filter you want in the set. 

J1 enables queries on data that meet ALL of the filters in the permission set. In this
example, J1 enables queries on data that is in GitHub AND in Jira issues AND linked to 
digital certificate users. 

![](../assets/user-edit-query-permiss.png)





If you want to set up queries based on sets of filters that you want to then link by OR logic, create 
separate permission sets.

### App Permissions

Permissions are configured per group, and any users in a group can
perform the actions assigned by the permissions editor.  Permissions may take up
to five minutes to propagate.

Each **app level category** has two permissions: **Read-only** and **Admin**.
**Admin** permissions will allow all actions included in the **Read-only**
permissions for each app.

Each **shared permission** has two permissions: **Read** and **Write**. **Read**
permissions will allow access to retrieving the resource, while **Write** will
allow mutating / editing of the resource. **Write** permission **does not**
implicitly grant **Read** permission in this case, unlike how admin permissions
grant read-only permissions implicitly in the case of app level permissions.

### Top Level Permissions

**Top level permissions** applies to all apps and pages.

- If a group is assigned **top level Admin** access, users in that group will be
  allowed to perform any action in any app as well as on shared resources.

- If a group is assigned **top level Read-only** access, the users in that group
  will be allowed to access all apps and read all data including on shared
  resources, however they will not be able to perform actions that require write
  level permissions (e.g. creating a rule in the Alerts app).

### Global Shared Permissions

**Shared permissions** are not bound to a specific app, but are relevant to
resources that span different apps.

List of shared permissions:

- **Graph Data** (used anywhere entity and relationship data is retrieved on
  demand or when entities / relationships are mutated directly; also used for
  raw data associated with entities)

- **Questions** (saved J1 queries used in the Landing page Questions Library and
  in Compliance app for mapping to compliance requirements)
  

Some of these permissions are needed for an app to function fully. For
example, you are not able to use the Insights app without read
permissions for Graph Data because the dashboards and widgets cannot load
the data.

### App Level Permissions

**App level permissions** such as Alerts Read or Alerts Admin apply to the
application pages shown primarily on the app switcher. However, a few other
categories have been added including Integrations and Endpoint Compliance Agent
despite that they are not strictly apps, they function as one and it was easy to
group their responsibilities together.

Admin permissions for each app allows certain administrative actions unique to
each app. For example, add a new standard / questionnaire in Compliance app;
save board layout as default in Insights app; etc. Certain actions also require
shared permissions to global resources to be enabled.

Users not assigned any access at either top level or app level permissions will
receive an "Access Denied" error message when attempting to navigate to the app.

The full list of the apps is here, along with shared permissions that may be
used by features in each app:

!!! note 
    You may see a subset of these apps in your settings based on your account subscription level.

- Landing (the base/root page - `/`)
  
  > Shared permissions used by this app: **Read / Write Questions** and
  > **Read Graph Data** for access to Questions Library and running J1QL queries
  > respectively. Optionally **Write Graph Data** for editing entities from
  > query results.

- Assets Inventory (URL ending with `/inventory`)
  
  > Shared permissions used by this app: **Read / Write Graph Data**
  > (app is unusable without Read Graph Data, Write Graph Data used for editing
  > entities)

- Policies (URL ending with `/policies`)
  
  > Shared permissions used by this app: **Read Graph Data** for loading the
  > policy elements and raw data, and **Write Graph Data** for saving changes to
  > the policy entities.

- Alerts (URL ending with `/alerts`)
  
  > Shared permissions used by this app: **Read Graph Data** (need only for the
  > Vulnerability Findings view, the Alerts view will load results from a
  > historical snapshot and does _not_ need Read Graph Data permission)

- Compliance (URL ending with `/compliance`)
  
  > Shared permissions used by this app: **Read Graph Data** for expanding
  > queries used as evidence to view results, **Read / Write Questions** for
  > editing the questions used in this app.

- Graph Viewer (URL ending with `/galaxy`)
  
  > Shared permissions used by this app: **Read Graph Data**. App will not
  > function without this permission as it is focused on graph exploration.

- Insights (URL ending with `/insights`)
  
  > Shared permissions used by this app: **Read Graph Data**. Dashboards and
  > widgets will not load without this permission.

- Integrations (URL ending with `/integrations`)

  > Shared permissions used by this app: none

- Endpoint Compliance Agent "Power up" (URL ending with `/powerups/endpoint-agent`)

  > Shared permissions used by this app: **Read Graph Data**, used to
  > fetch users and devices.
