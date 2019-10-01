# Changes and attribution

## What changes were made in environment, SG or VPC in last time period {}?

Find all changes in the last 24 hours:

```j1ql
Find * with _beginOn > date.now - 24 hours
```

Changes in the last 24 hours related to a particular VPC:

```j1ql
Find * with _beginOn > date.now - 24 hours
  that relates to aws_vpc with vpcId='{vpcId}' or name='{vpcName}'
```

Resources with a certain tag that change in the last 24 hours:

```j1ql
Find * with _beginOn > date.now - 24 hours
  and (tag.Environment = '{tagValue}' or tag.Project = '{tagValue}')
```

## What changes were made by person with access type {}?

_This will be captured when we start processing cloudtrail events._

## What changes were made by automated tools?

_This will be captured when we start processing cloudtrail events._

## What changes were made with interactive sessions?

_This will be captured when we start processing cloudtrail events._

## Which developer(s) most likely introduced vulnerabilities in recent code changes?

_Requires integrations with Github or Bitbucket, and code scanning solutions like Veracode or WhiteHat._

```j1ql
Find User
  that OPENED PR with createdOn > date.now-7days
  that RELATES TO CodeRepo
  that HAS (Vulernability|Finding) with _createdOn > date.now-7days
return tree
```
