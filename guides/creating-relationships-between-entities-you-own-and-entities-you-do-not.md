# Creating Relationships Between Assets You Own and Assets You Do Not

## Overview

If you want to form a relationship using a `_key`, you must include the
`_source` and `_scope` of the entity that already exists in the graph.

If the entity you are uploading is the `to`, then the entity that you
are forming a relationship with, which already exists in the graph, is, therefore, the
`from`:

This does _NOT_ work:

```
{
    _fromEntityKey: entityFrom.entity._key,
    _toEntityKey: entityTo.entity._key,
}
```

This works:

```
{
    _fromEntitySource: entityFrom.entity._source,
    _fromEntityScope: entityFrom.entity._integrationInstanceId,
    _fromEntityKey: entityFrom.entity._key,
    _toEntityKey: entityTo.entity._key,
}
```

This guide teaches you how to create relationships between an asset that you own
and one you do not own. Adding new data to the J1 graph and forming relationships 
with that data is a common use case. If you are not specific with how you form relationships, 
you might not see the data in the graph after you have uploaded it.  

The concept of ownership in the J1 platform determines what you see. 
What is not obvious when viewing the graph is that the graph you see is the 
aggregation of many subgraphs. There are subgraphs for the AWS integration, the 
system mapper, and API ingested data among other things. All of these different subgraphs 
provide a cohesive set of results. These subgraphs denote ownership. For example,
if a certain subgraph owns `entity A`, it means that `entity A` is in that subgraph. Ownership
is important because it is how J1 understands the state of everything. 

A subgraph is created by fusing the `source` and the `scope` of an entity together. For example, 
`api:your-api-call` could be a subgraph. These subgraphs provide identity to your data in the J1. 
When interacting with assets that are owned by various subgraphs, you must be
specific in your interactions so the resulting graph is how you expect it to look.


At the end of this guide, you should be able to run this query and see your results:

```
FIND CodeModule
WITH displayName = ('hizurur' OR 'carnud' OR 'vici' OR 'iti' OR 'jifguilo' OR 'kiwoj' OR 'juvhove')
AND from = 'testing'
THAT USES << CodeRepo
```

An example of this use case is available at: https://github.com/JupiterOne/jupiterone-client-nodejs/tree/main/examples/sync-api

This guide assumes that you have run the example above so that you have the necessary
ephemeral data that is owned by an `integration-managed` source. The example 
creates data that is controlled by the `integration-managed` source, creates data that 
is controlled the `api` source, and creates a relationship between those two assets.

## Acquiring Assets in the Graph to Form Relationships

After you have compiled the assets that you want to upload to J1, you still must acquire assets from 
the J1 graph so that you can form relationships with it. Therefore, the first step in this guide is 
to acquire `integration-managed` data from J1. 

If you have run the example scenario above, you should have newly-created [CodeRepos](https://github.com/JupiterOne/jupiterone-client-nodejs/blob/main/examples/sync-api/src/data/code-repos.json) in your graph to query. The example code uploads assets into J1 
in an `integration-managed` scope. This upload enables us to work with assets that is outside of your scope (`api`).

```
FIND github_repository
    WITH from = 'testing'
```

You now have `CodeRepos` that you can form relationships with.

An example query response payload from one of the `CodeRepos`:

```
{
    "_class": [
        "CodeRepo"
    ],
    "_type": [
        "github_repository"
    ],
    "_key": "MDEwOlJlcG9zaXRvcnkxNjkzMzI3NTQ=",
    "displayName": "ibzibid",
    "_integrationType": "github",
    "_integrationClass": [
        "ITS",
        "SCM",
        "VCS",
        "VersionControl"
    ],
    "_integrationDefinitionId": "1babe084-d58d-4ff0-9d98-e0d9bb8499be",
    "_integrationName": "JupiterOne",
    "_beginOn": "2022-01-19T20:26:17.842Z",
    "_id": "2218b983-139b-4447-9889-f04f48761b15",
    "_integrationInstanceId": "40d8cd20-054e-4b77-82bd-f01af7593170",
    "_rawDataHashes": "eyJkZWZhdWx0IjoiMUlKVFNaT00vM2FwQmtWTWt0alYxcml6ZjZsRGFNa1VTRHBvakxIR2sxVT0ifQ==",
    "_version": 18,
    "_accountId": "j1dev",
    "_deleted": false,
    "_source": "integration-managed",
    "_createdOn": "2020-03-23T19:10:09.298Z"
}
```

## Forming the Relationship

The next step is to form relationships between assets you own and assets you do not. 
There are two primary options for creating a relationship:

```
{
    _fromEntityKey: string;
    _toEntityKey: string;
    _fromEntityId: string;
    _toEntityId: string;
}
```

You can form the relationship in the following ways:

- `CodeRepo` `_key` -> `CodeModule` `_key`
- `CodeRepo` `_id` -> `CodeModule` `_key`

Keep in mind that you do not have the `CodeModule` `_id` yet, which
is important because these two options are _NOT_ equal in how they behave.
Forming a relationship using the `_id` of the `CodeRepo` and the `_key` of the
CodeModule works because the `_id` is unique in all of the data in your
account. The `_key` value is _NOT_ globally unique, meaning that two assets can have
the same `_key`.

When you form a relationship with two `_key` values and you do not specify the
`source` and the `scope` of the data that already exists in the graph, J1 does not 
understand which asset you are referencing and, therefore, does not create the 
relationship. Because two assets could have the same `_key`, the software needs more 
information to be able to identify the asset you are referencing.

### How to Get More Information

Use the `source` and `scope` of your J1 data with the `_key`!

```
{
    _fromEntitySource: string;
    _toEntitySource: string;
    _fromEntityScope: string;
    _toEntityScope: string;
}
```

This:

- `CodeRepo` `_key` -> `CodeModule` `_key`
- `CodeRepo` `_id` -> `CodeModule` `_key`

Must actually be:

- `CodeRepo` `_key`, `_source`, `_scope` -> `CodeModule` `_key`
- `CodeRepo` `_id` -> `CodeModule` `_key`

In JSON, it looks like this:

```
{
    _fromEntitySource: entityFrom.entity._source,
    _fromEntityScope: entityFrom.entity._integrationInstanceId,
    _fromEntityKey: entityFrom.entity._key,
    _toEntityKey: entityTo.entity._key,
}
```

## Putting It Together

Now that you know how to form relationships with assets that you do not own, here is what 
your [sync api](https://community.askj1.com/kb/articles/786-jupiterone-bulk-upload-schema) payload should look like put together:

```
{
    "entities": [
        {
            "_key": "npm_package:hizurur",
            "_class": "CodeModule",
            "_type": "npm_package",
            "displayName": "hizurur",
            "from": "testing"
        },
        {...}
    ],
    relationships: [
        {
            _key: "codeRepo:USES:codeModule",
            _type: "codeRepo:USES:codeModule",
            _class: "USES",
            displayName: "USES v3.4.3",
            _fromEntitySource: "integration-managed"
            _fromEntityScope: "integration_id"
            _fromEntityKey: "codeRepo_key"
            _toEntityKey: "npm_package:hizurur" 
        },
        {...}
    ]
}
```

After you have uploaded the data, use the query posted earlier in the guide in J1 to view your results:

```
FIND CodeModule
WITH displayName = ('hizurur' OR 'carnud' OR 'vici' OR 'iti' OR 'jifguilo' OR 'kiwoj' OR 'juvhove')
AND from = 'testing'
THAT USES << CodeRepo
```
