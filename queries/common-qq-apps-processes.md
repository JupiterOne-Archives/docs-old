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

## What certificates are installed?

_To be added._

## What certificates are used for which service?

_Host level certificates details to be added later. You can query for ACM
certificates in AWS._

```j1ql
// Returns a graph of the resources that uses certificates
Find Certificate that relates to * return tree

// Find certificates that are set to expire within 30 days
Find Certificate with expiresOn < date.now + 30days
```

## What versions of software do I have running?

_To be added._

## What versions of software do I have installed but not used?

_To be added._

## Is Security control type {} installed?

_To be added._

## Where is Security control {} not installed for matching tag {}?

_To be added._

## When was the last time a service or server runtime was refreshed / updated / cycled?

```j1ql
// Returns EC2 instances and the AMI images they are using, and the creation timestamp of the AMI
Find Host as h that uses Image as i
  return
    h.tag.AccountName, h.displayName, h.instanceId,
    i.displayName, i.imageId, i.createdOn
  order by
    h.tag.AccountName

// Returns Lambda functions and when they were last updated
Find Function as f
  return f.tag.AccountName, f.displayName, f.updatedOn, f.lastModified
  order by f.tag.AccountName
```
