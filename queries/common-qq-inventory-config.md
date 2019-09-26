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

Filter using production tag:

```j1ql
Find (Application|CodeRepo|Workload|Function|Task|Host|Device|Database|DataStore)
  with tag.Production=true
```

Filter using account name:

```j1ql
Find (Application|CodeRepo|Workload|Function|Task|Host|Device|Database|DataStore)
  with tag.AccountName='{accountName}'
```

_You can also use `Find *` to cover everything but the results could be overwhelming._

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

_To be added._

## How many devices are in each service priority?

_To be added._

## What are the TTL of devices in each service priority or architectural tier or with tag type {}?

_To be added._

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

## How many systems were added to a source environment (e.g. AWS account) interactively vs automated?

_To be added._

## How many resources were added to manually vs automated?

Count entities added by its source:

```j1ql
Find * as e return e._source, count(e)
```

Source (`_source`) can be one of the following:

- `integration-managed`: added via a provider integration
- `powerup-managed`: added via a JupiterOne Powerup (currently endpoint compliance stethoscope agent)
- `system-mapper`: added by the JupiterOne mapper (derived entities or external entities)
- `api`: added manually by a JupiterOne user from either the webapp or API

## What container images, VM images, and software packages are available in my production environments?

_Container entities/relationships are to be added when we support ECS, EKS, ECR
and Fargate._

## What are the tags assigned to a particular inventory asset?

_This is best viewed in the Asset Inventory app by selecting an entity and going
to the "Tags" tab in the properties panel._
