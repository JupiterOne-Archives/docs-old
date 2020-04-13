# JupiterOne Access Controls

Access controls can be configured by navigating to the cogwheel -> Users & Access -> Selecting the group to be edited -> Then clicking on the Shield Icon.

  ![app-permissions](../assets/app-permissions.png)

Permissions are configured per group, and any users in a group will be able to perform the actions assigned by the permissions editor.  Permissions take about 5 minutes to propagate.

Each app level category has two permissions: Read-only and Admin, Admin permissions will allow all actions included in the Read-only permissions for each app.

Each shared permission has two permissions: Read and Write, read permissions will allow access to retrieving the resource, while write will allow mutating / editing the resource.  The write permission does not implicitly grant the read permission in this case, unlike how admin permissions grant read-only permissions implicitly in the case of app level permissions.

Permissions can be edited by administrators navigating to Users & Access, choosing which group the change the permissions for, then clicking on the Shield icon.

## Top level permissions

**Top level permissions** traverse all apps and pages, if a group is given top level Admin access, users in that group will be allowed to perform any action in any app as well as on shared resources. If a group is given top level Read-only access, the users in that group will be allowed to access all apps and read all data including on shared resources, however they will not be able to perform actions that require write level permissions. E.G. Creating a rule on the alerts app.

## Shared permissions

**Shared permissions** are not bound to a specific app, but are relevant to resources that span different apps, I.E. Questions (used in the landing page questions library and compliance) and Graph data (used anywhere entity and relationship data is retrieved on demand or when entities / relationships are mutated directly).  Some of these permission will be needed for an app to function fully, E.G. you will not have much luck using the Insights app without read permissions for Graph Data as the dashboards & widgets won't be able to load the data!

List of shared permissions:
- Graph Data (retrieving and mutating entities and relationships as well as raw data associated with entities)
- Questions (saved j1 queries used in the questions library on landing as well as in the compliance app)

## App level permissions

**App level permissions** such as Alerts Read or Alerts Admin apply to the application pages shown primarily on the app switcher, however a few other categories have been added including Integrations and Endpoint Compliance despite that they are not strictly apps, they function as one and it was easy to group their responsibilities together.

Some of the app level permissions are non functional at this point (I.E. Policies Admin), but are added as a future proofing mechanism for users to configure to help prevent disruption of service.

The full list of the apps is here, along with shared permissions that can be used by features in this app:
- Landing (the base page that is loaded when navigating to JupiterOne)
  - Shared permissions that can be used by this app: Read / Write Questions & Read Graph Data (for questions library and running J1QL queries respectively)
- My Security (url ending with `/mysecurity`) NOTE: This may not be enabled for your account yet as it is still in beta.
  - Shared permissions that can be used by this app: Read Graph Data (used for populating table / widgets)
- Assets Inventory (url ending with `/inventory`)
  - Shared permissions that can be used by this app: Read / Write Graph Data (app is unusable without Read Graph Data, Write Graph Data used for editing entities)
- Policies (url ending with `/policies`)
  - Shared permissions that can be used by this app: Read / Write Graph Data (for loading the policy elements and raw data, and saving changes to the policy entities)
- Alerts (url ending with `/alerts`)
  Shared permissions that can be used by this app: Read Graph Data (specifically for the finding view, the alerts view will load results from a historical snapshot)
- Compliance (url ending with `/compliance`)
  - Shared permissions that can be used by this app: Read Graph Data for expanding queries used as evidence, Read / Write Questions for editing the questions used in this app.
- Graph Viewer (url ending with `/galaxy`)
  - Shared permissions that can be used by this app: Read Graph Data, app will not function without this permission as it is focused on graph exploration.
- Insights (url ending with `/insights`)
  - Shared permissions that can be used by this app: Read Graph Data, dashboards and widgets will not load without this permission.
- Integrations (url ending with `/integrations`)
  - Shared permissions that can be used by this app: none!
- Endpoint Compliance (url ending with `/powerups/endpoint-agent`)
  - Shared permissions that can be used by this app: Read Graph Data, used to fetch users and devices.
