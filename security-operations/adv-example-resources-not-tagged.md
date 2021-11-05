# Query resources that do _not_ have a certain tag

Tagging is highly recommended for resources in cloud environments such as AWS,
Azure, and GCP. For example, it is common to use tags to track `cost-center` or
`project`. And it is recommended to assign `classification` tag to all databases
and data stores (e.g. buckets, blobs, disks).

## TL;DR

Use this example query:

```j1ql
Find (Host|Function|DataStore) with [tag.cost-center] = undefined
```

## More detailed walk-through

**To find resources that do _not_ have a certain tag, do the following:**

```j1ql
Find * with _integrationType = 'aws' and tag.project = undefined
```

> From the above, `undefined` means the property does not exist on the entity.
> And `_integrationType = 'aws'` filters only resources from AWS. Change it to
> `azure` or something else as appropriate.

**For tags with special characters such as `-`, use `[ ]` around the tag property:**

```j1ql
Find * with _integrationType = 'aws' and [tag.cost-center] = undefined
```

**Why not just use `Find *` to cover everything?**

`Find *` searches across all resources, including all integrations, mapped
entities, and those pushed via API or created via the UI. This will return
_many_ false positives, and makes the query slow.

**More fine tuning to reduce noise:**

Many entities such as `Account`, `Service`, `AccessPolicy` (e.g.
`aws_iam_policy`) etc. will likely not have these custom tags applied, so even
querying with `_integrationType = 'aws'` will generate some noise. However, it
will be painful to write a query for each resource type -- there could be 100 of
them!

This is where leveraging the `class` and combination syntax in the query becomes
extremely helpful. For example:

```j1ql
Find (Host|Function|DataStore) with [tag.cost-center] = undefined
```

Still a single query, without the noise. The three classes `Host`, `Function`,
and `DataStore` in includes a couple dozens of types, and covers resources you
are not using today but may start using in the future that are of those classes.
You can add additional classes to the query as needed.
