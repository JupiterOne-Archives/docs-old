# Changes and attribution

## What changes were made in environment, SG or VPC in last time period {}?

```j1ql
// Find all changes in the last 24 hours
Find * with _beginOn > date.now - 24 hours

// Changes in the last 24 hours related to a particular VPC
Find * with _beginOn > date.now - 24 hours
  that relates to aws_vpc with vpcId='{vpcId}' or name='{vpcName}'

// Resources with a certain tag that change in the last 24 hours
Find * with _beginOn > date.now - 24 hours
  and (tag.Environment = '{tagValue}' or tag.Project = '{tagValue}')
```

## What changes were made by person with access type {}?

_This will be captured when we start processing cloudtrail events._

## What changes were made by automated tools?

_This will be captured when we start processing cloudtrail events._

## What changes were made with interactive sessions?

_This will be captured when we start processing cloudtrail events._
