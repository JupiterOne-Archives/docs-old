# Secrets and key management

## What SSH keys exist on system {}?

Find all SSH keys in an AWS account:

```j1ql
Find aws_key_pair with tag.AccountName='{accountName}'
```

You can also use the abstract class:

```j1ql
Find AccessKey with usage='ssh' and tag.AccountName='{accountName}'
```

Find key usage and return a graph:

```j1ql
Find aws_key_pair that relates to Host return tree
```

Find key usage and return a table with specific properties:

```j1ql
Find aws_key_pair as key that relates to Host as h
  return key.displayName,
    h.displayName, h.instanceId, h.region, h.classification, h.tag.AccountName
```

## What SSH keys exist on system {} without link to employee?

_The linkage will be mapped when we start processing cloudtrail events._

## What secrets (vault, kms, etc...) can a service access and what is that service able to do with them?

```j1ql
Find aws_kms_key that uses * return tree
```
