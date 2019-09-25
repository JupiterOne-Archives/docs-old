# Hardware/software inventory and configuration

## What Workloads are in my environment?

```j1ql
Find Workload
```

```j1ql
Find Workload with tag.AccountName='{accountName}'
```

## What are my production systems and servers?

_(and what are those systems there to do?)_

```j1ql
Find (Host|Database) with tag.Production=true
```

```j1ql
Find (Host|Database) with tag.AccountName='{accountName}'
```

## What are my production resources?

```j1ql
Find (Application|CodeRepo|Workload|Function|Task|Host|Device|Database|DataStore)
  with tag.Production=true
```

```j1ql
Find (Application|CodeRepo|Workload|Function|Task|Host|Device|Database|DataStore)
  with tag.AccountName='{accountName}'
```

_You can also use `Find *` but that query might be slower._

## What are my production data stores and databases?

```j1ql
Find (DataStore|Database) with tag.Production=true
```

```j1ql
Find (DataStore|Database) with tag.AccountName='{accountName}'
```

## What are my production applications?

```j1ql
Find Application with tag.Production = true
```

```j1ql
Find Application with tag.AccountName='{accountName}'
```

## What are my network assets?

```j1ql
Find Network with _type!='mapped_entity'
```

_Entities that are of type `'mapped_entity'` are resources that are not directly
from the integrations._

You can use `_type='mapper_entity'` or `_source='system-mapper'` to find
"external" resources:

```j1ql
Find Network with _source='system-mapper'
```

```j1ql
Find (Gateway|Firewall) with category='network'
```

## Which devices are/are not auto-scaling?

```j1ql
Find aws_instance that has aws_autoscaling_group
```

```j1ql
Find aws_instance that !has aws_autoscaling_group
```

## What are the tiers of infrastructure?

_TBD_

## How many devices are in each service priority?

_TBD_

## What are the TTL of devices in each service priority or architectural tier or with tag type {}?

_TBD_

## What information assets are missing metadata for data classification, tier of service or architectural tier?

```j1ql
Find (Host|DataStore|Workload|Task) with tag.Classification = undefined
```

## What applications and operating systems are in use?

```j1ql
Find Host as h return h.platform
```

_A 'Group By' capability will be added to J1QL soon to return objects or count
by unique property values._

## Who owns a production system in account/zone/tier/layer/VPC/SG?

```j1ql
Find (Host|DataStore|Workload|Task|Application)
  with tag.AccountName = '{accountName}' as system
  return system.displayName, system.owner
```

```j1ql
Find (Host|DataStore|Workload|Task|Application) as system
  that relates to aws_vpc with vpcId='{vpcId}' or name='{vpcName}'
  return system.displayName, system.owner
```

```j1ql
Find (Host|DataStore|Workload|Task|Application) as system
  that relates to aws_security_group with groupId='{sgId}' or name='{sgName}'
  return system.displayName, system.owner
```

## How many systems were added to environment {} in last time period?

Example for last 24 hours time period:

```j1ql
Find * with _tag.AccountName='{accountName}' and _createdOn > date.now - 24hrs
```

## How many systems were added to environment {} interactively vs automated?

_TBD_

## What container images, VM images, and software packages are available in my production environments?

_Container entities/relationships are to be added when we support ECS, EKS, ECR
and Fargate._

## What are the tags assigned to any inventory asset?

_This is best viewed in the Asset Inventory app by selecting an entity and going
to the "Tags" tab in the properties panel._
