# TL;DR

If you want to form a relationship using a `_key`, you must include the
`_source` and `_scope` of the entity that already exists in the graph.

If the entity you are uploading is the `to` and the entity that you
are forming a relationship with already exists in the graph is, therefore, the
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

# Creating Relationships Between Entities You Own And Entities You Do Not

The goal is to create relationships between an entity that you own
an another that you may not own. 

The concentp of ownership in the J1 platform determines what you see. Without knowing 
how to form relationships, it may be unclear why your data does not appear in the graph.

What is not obvious when viewing the graph is that the graph you see is the 
aggregation of many subgraphs. There are subgraphs for the AWS integration, the 
system mapper, and API ingested data among other things. All of these different subgraphs 
provide a cohesive set of results. These subgraphs denote ownership. For example,
if subgraph 1 owns entity A, it means that entity A is in subgraph 1. Ownership
is important because it is how J1 understands the state of everything.

When interacting with entities that are owned by various sources, you must be
specific in your interactions so the end graph is how you expect it to look.

Try this query:

```
FIND CodeModule
WITH displayName = ('hizurur' OR 'carnud' OR 'vici' OR 'iti' OR 'jifguilo' OR 'kiwoj' OR 'juvhove')
AND from = 'testing'
THAT USES << CodeRepo
```

You can now see your entities in the graph with the expected relationships.

Adding new data to the JupiterOne graph forming relationships with that data is a 
common use case. What this specific case shows is how to form relationships
an ID for your asset.

Therefore, to form a relationship with one sync job, you must utilize the
`_key` property of your entity. The key is to be specific in how
you do so.

## Acquiring Data in the Graph to Form Our Relationships

After you have your prepared your data and are ready to send it to J1, the next
step is to gather the assets that already exist in the JupiterOne graph so that you 
can form relationships with them using this simple query:

```
FIND github_repo
    WITH displayName = ('graph-veracode' OR 'graph-knowbe4' OR 'graph-azure' OR 'graph-wazuh' OR 'graph-enrichment-examples' OR 'graph-whois' OR 'graph-zeit')
```

We have now have `CodeRepos` that you can form relationships with.

An example query response payload:

```
{
    "_class": [
        "CodeRepo"
    ],
    "_type": [
        "github_repo"
    ],
    "_key": "MDEwOlJlcG9zaXRvcnkxNjkzMzI3NTQ=",
    "displayName": "graph-veracode",
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

Looking at the options for creating a relationship, there are two primary
choices:

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
relationship. because two assets could have the same `_key`, the software needs more 
information to be able to identify the asset you are referencing.

### How to Get More Information

Use the `source` and `scope` of your JupiterOne data with the `_key`!

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

## Using This Example

An example of this use case is available at: https://github.com/JupiterOne/jupiterone-client-nodejs/tree/main/examples/sync-api
