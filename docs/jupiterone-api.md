# JupiterOne API

JupiterOne platform exposes a number of public GraphQL endpoints.

**Base URL**: `https://api.us.jupiterone.io`

**Endpoint for query and graph operations**: `/graphql`

**Endpoint for alert and rules operations**: `/rules/graphql`

An experimental [node.js client and CLI][1] can be found on [Github][1].

[1]: https://github.com/JupiterOne/jupiterone-client-nodejs

## Querying Entities and Relationships

**Endpoint:** `/graphql`

This query will allow you to run J1QL queries for fetching data.

```graphql
query J1QL($query: String!, $variables: JSON, $dryRun: Boolean) {
  queryV1(query: $query, variables: $variables, dryRun: $dryRun) {
    type
    data
  }
}
```

Variables:

```json
{
  "query": "find Person with _type=${type}",
  "variables": {
    "type": "employee"
  },
  "dryRun": true
}
```

NOTE: there's also a `queryV1Tree` variant that has nice types for
use when displaying graph data.

```graphql
query J1QL($query: String!, $variables: JSON, $dryRun: Boolean) {
  queryV1Tree(query: $query, variables: $variables, dryRun: $dryRun) {
    type
    data {
      vertices {
        id
        edges {
          id
        }
      }
    }
  }
}
```

Variables:

```json
{
  "query": "find Person with _type=${type} return tree",
  "variables": {
    "type": "employee"
  },
  "dryRun": true
}
```

variables

### Fetching graph data

This query will be used for fetching graph data.

Note: ATM a canned query for IAM Role data is run.
No input variables need to be provided.

```graphql
query testQuery {
  queryGraph {
    vertices {
      id
      entity {
        _id
        _key
        _type
        _accountId
        _integrationName
        _integrationDefinitionId
        _integrationInstanceId
        _version
        _createdOn
        _beginOn
        _endOn
        _deleted
        displayName
      }
      properties
    }
    edges {
      id
      toVertexId
      fromVertexId
      relationship {
        _id
        _key
        _type
        _accountId
        _integrationName
        _integrationDefinitionId
        _integrationInstanceId
        _version
        _createdOn
        _beginOn
        _endOn
        _deleted
        _fromEntityKey
        _toEntityKey
        displayName
      }
      properties
    }
  }
}
```

### Retrieving a single vertex by Id

This query will be used for fetch a vertex by it's id.

```graphql
query VertexQuery($id: String!, $filters: VertexFilters) {
  vertex(id: $id, filters: $filters) {
    id
    entity {
      _id
      _key
      _type
      _accountId
      _integrationName
      _integrationDefinitionId
      _integrationInstanceId
      _version
      _createdOn
      _beginOn
      _endOn
      _deleted
      displayName
    }
    properties
  }
}
```

Variables:

```json
{
  "id": "<a vertex id>",
  "filters": {
    "_id": "<an entity id>",
    "_key": "<an entity key>",
    "_type": ["<a entity type>"],
    "_class": ["<a entity class>"]
  }
}
```

NOTE: Only one of the variables (`id` or `filters`) are required.
Specifying both is allowed but is somewhat redundant
unless you want to assert that the vertex with a specific
`id` exists with a specific entity property.

`filters` is "well defined" right now
(all allowed fields are shown in the variables above)
but can be tweaked to allow
for arbitrary properties in the future.

### Fetching neighbors of a vertex

The `Vertex` type allows vertex and edge neighbors up to a certain
depth to be retrieved using the `neighbors` field.
The return type of the `neighbors` resolver is the same as that of
a graph query.

```graphql
query VertexQuery($id: String!, $depth: Int) {
  vertex(id: $id) {
    id
    entity {
      displayName
    }
    neighbors(depth: $depth) {
      vertices {
        id
        entity {
          displayName
        }
      }
      edges {
        id
        relationship {
          displayName
        }
      }
    }
  }
}
```

Variables:

NOTE: The depth that is supplied must be a value between 1 and 5 (inclusive)

```json
{
  "id": "<a vertex id>",
  "depth": 5
}
```

### Retrieving a edge by Id

This query will be used for fetch a vertex by it's id.

```graphql
query VertexQuery($id: String!) {
  edge(id: $id, label: $id, filters: $id) {
    id
    relationship {
      _id
      _key
      _type
      _accountId
      _integrationName
      _integrationDefinitionId
      _integrationInstanceId
      _version
      _createdOn
      _beginOn
      _endOn
      _deleted
      _fromEntityKey
      _toEntityKey
      displayName
    }
    properties
  }
}
```

Variables:

```json
{
  "id": "<an edge id>",
  "label": "<edge label>",
  "filters": {
    "_id": "<a relationship id>",
    "_key": "<a relationship key>",
    "_type": "<a relationship type>",
    "_class": "<a relationship class>"
  }
}
```

NOTE: Only one of the variables (`id`, `label` or `filters`) are required.
Specifying a `label` and `filters` when an `id` is present
is somewhat redundant
but can be used to assert that the edge with a specific
`id` exists with additional constraints.

Much like with the vertex query, `filters` is "well defined" right now
(all allowed fields are shown in the variables above)
but can be tweaked to allow
for arbitrary properties in the future.

### Fetching the count of entities via a \_type and/or \_class

For fetching the count of the latest entities the
`_id`, `_key`, `_type` and `_class`
fields can be supplied as filters.
This query only counts the latest versions of entities
matching the filter criteria.

```graphql
query testQuery($filters: VertexFilters, $filterType: FilterType) {
  entityCount(filters: $filters, filterType: $filterType)
}
```

Note: Use field aliases to request the counts of
multiple different entities.
Also, the `filterType` argument is optional and
defaults to the value `AND`

```graphql
query testQuery {
  Users: entityCount(filters: { _class: ["User"] }, filterType: "AND")
  Repos: entityCount(filters: { _class: ["CodeRepo"] }, filterType: "OR")
}
```

Example result:

```json
{
  "User": 40,
  "CodeRepo": 153
}
```

### Fetching the count of all types and classes

```graphql
query testQuery {
  allEntityCounts
}
```

Note: This resolver uses the `JSON` scalar as the return type.

Example result:

```json
{
  "typeCounts": {
    "iam_user": 12,
    "iam_managed_policy": 10,
    "iam_role_policy": 10
  },
  "classCounts": {
    "User": 12,
    "AccessPolicy": 20
  }
}
```

### Fetching the count of all types and classes

```graphql
query testQuery ($classes: [String], filterType: FilterType) {
  typeCounts (classes: $classes, filterType: $filterType)
}
```

Note: This resolver uses the `JSON` scalar as the return type.

If `OR` is specified as the filter type, all of the types between the
classes will be returned. By default, the query `AND`s the classes
and returns only the count of entities that have _all_ of the specified
classes.

Example result:

```json
{
  "iam_user": 12,
  "iam_managed_policy": 10,
  "iam_role_policy": 10
}
```

### Vertex full-text search

```graphql
query testQuery($query: String!, $size: Int, $after: String) {
  queryText(query: $query, size: $size, after: $after) {
    vertices {
      id
      entity {
        _source
        _id
        _key
        _type
        _class
        _accountId
        _integrationName
        _integrationDefinitionId
        _integrationInstanceId
        _version
        _createdOn
        _beginOn
        _endOn
        _deleted
        displayName
      }
      properties
    }
    total
    pageInfo {
      endCursor
      hasNextPage
    }
  }
}
```

Variables:

```json
{
  "query": "127.0.0.1"
}
```

### Listing vertices via a \_type and/or \_class

For fetching the count of the latest entities the
`_id`, `_key`, `_type` and `_class`
fields can be supplied as filters.
This query only returns the latest versions of entities
matching the filter criteria.

```graphql
query testQuery($filters: VertexFilters, $filterType: FilterType, $after: String) {
  listVertices(filters: $filters, filterType: $filterType, after: $after) {
    vertices {
      id
      entity {
        // entity details here
      }
      properties
    }
    total
    pageInfo {
      endCursor
      hasNextPage
    }
  }
}
```

Note: the `filterType` argument is optional and
defaults to the value `AND`

Variables:

```json
{
  "filters": {
    "_type": ["<an entity type>"],
    "_class": ["<an entity class>"]
  },
  "filterType": "<AND or OR>",
  "after": "the value of pageInfo.endCursor"
}
```

Example result

```json
{
  "vertices": [
    {
      "id": "some-id",
      "entity": {
        "displayName": "Laptop-2345"
      }
    }
  ],
  "total": 1,
  "pageInfo": {
    "endCursor": "some-base64-cursor",
    "hasNextPage": true
  }
}
```

## Entity Mutations

**Endpoint:** `/graphql`

### Create Entity

```graphql
mutation CreateEntity (
  $entityKey: String!
  $entityType: String!
  $entityClass: String!
  $timestamp: Long
  $properties: JSON
) {
  createEntity (
    entityKey: $entityKey,
    entityType: $entityType,
    entityClass: $entityClass,
    timestamp: $timestamp,
    properties: $properties
  ) {
    entity {
      _id
      ...
    }
    vertex {
      id,
      entity {
        _id
        ...
      }
      properties
    }
  }
}
```

Variables:

```json
{
  "entityKey": "<an entity key>",
  "entityType": "<an entity type>",
  "entityClass": "<an entity class>",
  "timestamp": 1529329792552,
  "properties": {
    // Custom properties on the Entity
    ...
  }
}
```

### Updating Entity

```graphql
mutation UpdateEntity (
  $entityId: String!
  $timestamp: Long
  $properties: JSON
) {
  updateEntity (
    entityId: $entityId,
    timestamp: $timestamp,
    properties: $properties
  ) {
    entity {
      _id
      ...
    }
    vertex {
      id,
      entity {
        _id
        ...
      }
      properties
    }
  }
}
```

Variables:

```json
{
  "entityId": "<an entity Id (entity._id)>",
  "timestamp": 1529329792552,
  "properties": {
    // Custom properties to get updated
    ...
  }
}
```

### Deleting Entity

```graphql
mutation DeleteEntity (
  $entityId: String!
  $timestamp: Long
) {
  deleteEntity (
    entityId: $entityId,
    timestamp: $timestamp,
  ) {
    entity {
      _id
      ...
    }
    vertex {
      id,
      entity {
        _id
        ...
      }
      properties
    }
  }
}
```

Variables:

```json
{
  "entityId": "<an entity Id (entity._id)>",
  "timestamp": 1529329792552
}
```

## Relationship Mutations

**Endpoint:** `/graphql`

### Create Relationship

```graphql
mutation CreateRelationship (
  $relationshipKey: String!
  $relationshipType: String!
  $relationshipClass: String!
  $fromEntityId: String!
  $toEntityId: String!
  $timestamp: Long
  $properties: JSON
) {
  createRelationship (
    relationshipKey: $relationshipKey,
    relationshipType: $relationshipType,
    relationshipClass: $relationshipClass,
    fromEntityId: $fromEntityId,
    toEntityId: $toEntityId,
    timestamp: $timestamp,
    properties: $properties
  ) {
    relationship {
      _id
      ...
    }
    edge {
      id
      toVertexId
      fromVertexId
      relationship {
        _id
        ...
      }
      properties
    }
  }
}
```

Variables:

```json
{
  "relationshipKey": "<a relationship key>",
  "relationshipType": "<a relationship type>",
  "relationshipClass": "<a relationship class>",
  "fromEntityId": "<the _id of the from entity>",
  "toEntityId": "<the _id of the to entity>",
  "timestamp": 1529329792552,
  "properties": {
    // Custom properties on the relationship
    ...
  }
}
```

### Update Relationship

```graphql
mutation UpdateRelationship (
  $relationshipId: String!
  $timestamp: Long
  $properties: JSON
) {
  updateRelationship (
    relationshipId: $relationshipId,
    timestamp: $timestamp,
    properties: $properties
  ) {
    relationship {
      _id
      ...
    }
    edge {
      id
      toVertexId
      fromVertexId
      relationship {
        _id
        ...
      }
      properties
    }
  }
}
```

Variables:

```json
{
  "relationshipId": "<a relationship Id (relationship._id)>",
  "timestamp": 1529329792552,
  "properties": {
    // Custom properties to get updated
    ...
  }
}
```

### Delete Relationship

```graphql
mutation DeleteRelationship (
  $relationshipId: String!
  $timestamp: Long
) {
  deleteRelationship (
    relationshipId: $relationshipId,
    timestamp: $timestamp,
  ) {
    relationship {
      _id
      ...
    }
    edge {
      id
      toVertexId
      fromVertexId
      relationship {
        _id
        ...
      }
      properties
    }
  }
}
```

Variables:

```json
{
  "relationshipId": "<a relationship Id (relationship._id)>",
  "timestamp": 1529329792552
}
```

## Building CSV Report

**Endpoint:** `/graphql`

```graphql
mutation BuildCsv(
  $filters: VertexFilters
  $propertyFilters: JSON
  $filterType: FilterType
) {
  buildCsv(
    filters: $filters
    propertyFilters: $propertyFilters
    filterType: $filterType
  ) {
    stateFileUrl
  }
}
```

Variables:

```json
{
  "filters": {
    "_type": ["<an entity type>"],
    "_class": ["<an entity class>"]
  },
  "filterType": "<AND or OR>",
  "propertyFilters": {
    ...
  }
}
```

## Alert and Rules Operations

**Endpoint:** `/rules/graphql`

### Create an alert rule

```graphql
mutation CreateQuestionRuleInstance (
  $instance: CreateQuestionRuleInstanceInput!
) {
  createQuestionRuleInstance (
    instance: $instance
  ) {
    id
    name
    description
    version
    pollingInterval
    question {
      queries {
        query
        version
      }
    }
    operations {
      when
      actions
    }
    outputs
  }
}
```

variables:

```json
{
  "instance": {
    "name": "unencrypted-prod-data",
    "description": "Data stores in production tagged critical and unencrypted",
    "version": "v1",
    "pollingInterval": "ONE_DAY",
    "outputs": [
      "alertLevel"
    ],
    "operations": [
      {
        "when": {
          "type": "FILTER",
          "version": 1,
          "condition": [
            "AND",
            [ "queries.unencryptedCriticalData.total", "!=", 0 ]
          ]
        },
        "actions": [
          {
            "type": "SET_PROPERTY",
            "targetProperty": "alertLevel",
            "targetValue": "CRITICAL"
          },
          {
            "type": "CREATE_ALERT"
          }
        ]
      }
    ],
    "question": {
      "queries": [
        {
          "query": "Find DataStore with (production=true or tag.Production=true) and classification='critical' and encrypted!=true as d return d.tag.AccountName as Account, d.displayName as UnencryptedDataStores, d._type as Type, d.encrypted as Encrypted",
          "version": "v1",
          "name": "unencryptedCriticalData"
        }
      ]
    }
  }
}
```

Note that the recommended interval for query based alert rules (aka a `question`)
is `ONE_DAY`. Supported intervals are `THIRTY_MINUTES`, `ONE_HOUR`, and `ONE_DAY`.

### Update an alert rule

```graphql
mutation UpdateQuestionRuleInstance (
  $instance: UpdateQuestionRuleInstanceInput!
) {
  updateQuestionRuleInstance (
    instance: $instance
  ) {
    id
    name
    description
    version
    pollingInterval
    question {
      queries {
        query
        version
      }
    }
    operations {
      when
      actions
    }
    outputs
  }
}
```

variables:

```json
{
  "instance": {
    "id": "b1c0f75d-770d-432a-95f5-6f59b4239c72",
    "name": "unencrypted-prod-data",
    "description": "Data stores in production tagged critical and unencrypted",
    "version": "v1",
    "pollingInterval": "ONE_DAY",
    "outputs": [
      "alertLevel"
    ],
    "operations": [
      {
        "when": {
          "type": "FILTER",
          "version": 1,
          "condition": [
            "AND",
            [ "queries.unencryptedCriticalData.total", "!=", 0 ]
          ]
        },
        "actions": [
          {
            "type": "SET_PROPERTY",
            "targetProperty": "alertLevel",
            "targetValue": "CRITICAL"
          },
          {
            "type": "CREATE_ALERT"
          }
        ]
      }
    ],
    "question": {
      "queries": [
        {
          "query": "Find DataStore with (production=true or tag.Production=true) and classification='critical' and encrypted!=true as d return d.tag.AccountName as Account, d.displayName as UnencryptedDataStores, d._type as Type, d.encrypted as Encrypted",
          "version": "v1",
          "name": "unencryptedCriticalData"
        }
      ]
    }
  }
}
```

Note that the only difference here for `update` is the `"id"` property
associated with the rule instance. All settings of a rule instance can be
modified.

### Trigger an alert rule on demand

```graphql
mutation EvaluateRuleInstance ($id: ID!) {
  evaluateRuleInstance (
    id: $id
  ) {
    outputs {
      name
      value
    }
  }
}
```

variables:

```json
{
  "id": "b1c0f75d-770d-432a-95f5-6f59b4239c72"
}
```
