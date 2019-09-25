# Applications and Processes

_We plan to add deeper integration with endpoint protection and device management
solutions to obtain services and processes information on hosts._

_Note that you can also add custom data by writing a script to call the J1 APIs._

## What are the running services?

_To be added._

## What are the running processes?

_To be added._

## What processes were running in time period {}?

_To be added._

## What certificates are installed/being used?

_Host level certificates details to be added later. You can query for ACM
certificates in AWS._

```j1ql
Find Certificate
```

```j1ql
Find * that (HAS|USES) Certificate return tree
```

## What certificates are used for which service?

_Host level certificates details to be added later. You can query for ACM
certificates in AWS._

Returns a graph of the resources that uses certificates

```j1ql
Find Certificate that relates to * return tree
```

Find certificates that are set to expire within 30 days

```j1ql
Find Certificate with expiresOn < date.now + 30days
```

## What versions of software / applications do I have running?

_Requires integrations that provide application information. For example, SAML
SSO applications from Okta, or macOS apps from Jamf._

```j1ql
Find Application as app
return app._type, app.displayName, app.status
```

_Note: to keep the entity data structure less noisy, different versions of the
same Application are **not** stored as separate entities. Rather, the `version`
data is kept on the relationship between the host or endpoint device that has
installed the application._

```j1ql
Find unique * that (USES|INSTALLED) as installation Application as app
return app._type, app.displayName, installation.version
```

## What software applications are not being used?

```j1ql
Find Application that !(ASSIGNED|USES) *
```

## Is Security control type {} installed?

_To be added._

## Where is Security control {} not installed for matching tag {}?

_To be added._

## When was the last time a service or server runtime was refreshed / updated / cycled?

Returns EC2 instances and the AMI images they are using, and the
creation timestamp of the AMI:

```j1ql
Find Host as h that uses Image as i
  return
    h.tag.AccountName, h.displayName, h.instanceId,
    i.displayName, i.imageId, i.createdOn
  order by
    h.tag.AccountName
```

Returns Lambda functions and when they were last updated:

```j1ql
Find Function as f
  return f.tag.AccountName, f.displayName, f.updatedOn, f.lastModified
  order by f.tag.AccountName
```
