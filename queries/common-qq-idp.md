# Identity, People and Privileged access

_Most of these queries depend on proper mapping of custom properties or profile
attributes from your HR system or identity provider to the Person/employee
entities._

## Who are the new hires within the last 12 months?

If you have been using JupiterOne for more than a year:

```j1ql
Find employee with _createdOn > date.now-12months
```

If your employee data source / user identity provider is Okta:

```j1ql
Find okta_user with created > date.now-12months
```

## Who are the contractors?

_Requires mapping from your HR system or IdP to capture the employment type._

```j1ql
Find employee with employment = 'contractor'
```

If you have a user group called 'Contractors':

```j1ql
Find User that (has|assigned) UserGroup
  with displayName='Contractors' or name='Contractors'
```

## Who are remote workers?

If the user or employee entity has a remote flag:

```j1ql
Find (User|employee) with remote=true
```

If you have a user group called 'Remote':

```j1ql
Find User that (has|assigned) UserGroup
  with displayName='Remote' or name='Remote'
```

## Who are the employees missing metadata about role?

```j1ql
Find employee with role=undefined
```

## Who are the employees missing metadata about team or department?

```j1ql
Find employee with department=undefined
```

```j1ql
Find employee that !relates to Team
```

## Who are the employees missing metadata about team or department with access to environment?

```j1ql
Find employee with department=undefined
  that is User
  that relates to (Account|AccessRole|UserGroup|Service)
    with tag.AccountName = '{accountName}'
```

## Who are the employees missing metadata about team or department with privileged access?

```j1ql
Find employee with department=undefined
  that is User
  that assigned (AccessPolicy|AccessRole) with admin=true
```

```j1ql
Find employee with department=undefined
  that is User
  that assigned AccessRole
  that assigned AccessPolicy with admin=true
```

## Who or what service has been assigned permissions with administrator/privileged access?

```j1ql
Find AccessPolicy with admin=true as policy
  that ASSIGNED * as e
  return policy.displayName, policy.webLink, e._type, e.displayName, e.webLink
```

## Who is able to make changes in a production data connected environment, and what changes can they make?

_We plan to do more in-depth analysis of AWS IAM policies to determine access.
In the meantime, we determine admin access based on policy name and you can run
the following query to find them._

```j1ql
Find AccessPolicy with admin=true as policy and tag.AccountName='{accountName}'
  that ASSIGNED (AccessRole|User) as e
return policy.displayName, policy.webLink, e._type, e.displayName, e.webLink
```

## What groups are an employee or contractor a member of?

```j1ql
'Joe Adams' as employee that relates to (Team|Group) as group
return
  employee._type, employee.displayName, employee.email,
  group._type, group.displayName
```

## What service accounts have been granted access to production data services or sources?

_To be added._

## What uses static authentication credentials (people, services) vs grant type credentials (saml, oidc)?

```j1ql
Find (User|UserGroup) that assigned AccessPolicy
```

```j1ql
Find AccessRole that assigned AccessPolicy
```
