# Data Security

## Show all resources without a data classification tag {}?

```j1ql
Find (Host|DataStore) with classification = undefined
```

Returns a count instead:

```j1ql
Find (Host|DataStore) with classification = undefined as e return count(e)
```

## Show all resources without a data classification tag in VPC with tag {}?

Filter by a tag on the VPC:

```j1ql
Find (Host|DataStore|Workload) with classification = undefined
  that relates to aws_vpc with tag.{tagName} = '{tagValue}'
```

Filter by vpcId or name:

```j1ql
Find (Host|DataStore|Workload) with classification = undefined
  that relates to aws_vpc with vpcId='{vpcId}' or name='{name}'
```

## What are all the resources without encryption with data security tag '{restricted}'?

```j1ql
Find DataStore with encrypted!=true and classification='restricted'
```

Sometimes it is also interesting to find unencrypted data that is non-public:

```j1ql
Find DataStore with encrypted!=true and classification!='Public'
```
