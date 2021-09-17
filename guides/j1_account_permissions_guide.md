# JupiterOne Platform Account Management

For additional information relating to SSO account administration, please refer to our [SAML configuration guide](https://support.jupiterone.io/hc/en-us/articles/360022903353-Configure-SAML-SSO-Integration).


## Inviting Users

Inviting users to your JupiterOne account can be performed using through the “Users & Access” menu.
![user-group-menu](../assets/j1acct-user-group-menu.png)


You can then choose which group the user will be invited to.
![menu-add-user](../assets/j1acct-menu-add-user.png)

User's email can entered in the _Email_ field, then press **SEND INVITATION** to invite the user.
![email-add-user](../assets/j1acct-email-add-user.png)


## Creating Groups and Best Practices 

Groups can be created using the **Add Group** button:

![menu-create-group](../assets/j1acct-menu-add-group.png)

The _Group name_ field and _Group description_ field can be filled to name and describe the group.

![menu-group-naming](../assets/j1acct-menu-group-naming.png)

Once a group is created, permissions should be created in the **Access Control** menu.

![group-menu-access-control](../assets/j1acct-group-menu-access-control.png)

### Query Permission Sets

When creating and configuring a group it is highly recommended to configure a _Query Permissions_ set.  If a set is not configured, the default filter allows all assets to be available to group members. 

If a user is a member of multiple groups, they will receive the _Query Permissions_ set for both groups, along with the _App Permissions_

#### Editing Permission Set

Permission Sets can be edited by clicking the **Add query permission set** button.  

![add-query-permission](../assets/j1acct-add-query-permission.png)

The Permission Filter configured will enable access to any assets scoped in the query.  Permission Filters are limited to `_class`,` _type`, `_integrationClass`, `_IntegrationType`, and `_integrationInstanceId` for pre-populating filter values.  A custom filter may be used as well. Make sure to click the **+** button and **Save** to add filters.

![query-set-filter](../assets/j1acct-query-set-filter.png)

Multiple filters can be used to expand or limit scopes for groups.  Each _Filter_ and _Set_ added will provide the disjunction of the sets. 

![query-permission-multiple](../assets/j1acct-query-permission-multiple.png)

### Manage App Permissions

App Permissions are configured in **Manage App Permissions** 

The default **App Permissions** for the _User_ Group does not provide any **App Permissions** to Users

Selection of permissions provide Read-only or Admin access for each App. 

![app-permissions-menu](../assets/j1acct-app-permissions-menu.png)


### Recommended Permissions


#### Default User Group

For the _Users_ group with most limited access, it is recommended to set a minimum **Query Permission Set**. The miminum recommended group is `_class`:`Root`. This permission group will only include the Root organization:

![limited-query-set](../assets/j1acct-limited-query-set.png)

The _Read-only_ permission for **Policies** should be set in **App Permissions** to allow users to _Review & Accept_ organizations policies


#### Compliance and Audit Group

For a group of users focused on Compliance and Audit processes, Integrations in scope for the audit are recommended for **Query Permissions**.  Recommended **App Permissions** for this group include _Admin_ access to _Compliance_ and _Policies_, as well as _Read-only_ access to _Assets_.

#### Integration Service Admin

For a group where configuration of integrated services is necessary, the recommended **App Permissions** for this group include Admin access to _Integrations_. In cases were _Endpoint Compliance_ is utilized, _Admin_ access will be necessary for this **App Permission** as well. The minimum **Query Permission Set**, `_class`:`Root`, is recommended for this group, but may be necessary to expand on special cases.

It may be necessary to expand access for this group in cases where SAML and SSO configuration must be configured.


