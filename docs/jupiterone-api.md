# JupiterOne API

The JupiterOne platform exposes a number of public GraphQL endpoints.

**Base URL**: `https://api.us.jupiterone.io`

**Endpoint for query and graph operations**: `/graphql`

**Endpoint for alert and rules operations**: `/rules/graphql`

An experimental [node.js client and CLI][1] can be found on Github.

[1]: https://github.com/JupiterOne/jupiterone-client-nodejs

## Entity and Relationship Queries

**Endpoint:** `/graphql`

### Fetching Vertices with J1QL

This query will allow you to run J1QL queries for fetching data. The query
requires three parameters:

- `query`: A query string that describes what data to be returned
- `variables`: A `JSON` list of values to be used as parameters for this query
- `dryRun`: A boolean that determines if the query is a dry run or not.

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
use when displaying graph data. The tree specifies vertices and edges.

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

### Fetching Graph Data

This query will be used for fetching graph data. The returned data includes the
details of all vertices found on the graph as well as the edges that connect the
vertices.

Note: At the moment, a canned query for IAM Role data is run. No input variables
need to be provided.

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

### Retrieving a Single Vertex by ID

This query will be used for fetching a vertex and its properties by its ID. The
query requires one of two parameters:

- `id`: The ID as a string
- `filters`: A set of filters that define the desired vertex.

The example below contains all of the currently available filters.

NOTE: Only one of the variables (`id` or `filters`) is required. Specifying both
is allowed but somewhat redundant unless you want to assert that a vertex with
the specified `id` exists *and* has specific entity properties.

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

### Fetching Neighbors of a Vertex

The `Vertex` type allows you to retrieve vertex and edge neighbors up to a
certain depth using the `neighbors` field. The return type of the `neighbors`
resolver is the same as that of a graph query. This query requires two
parameters:

- `id`: The ID of the vertex as a string
- `depth`: An integer specifying how many "levels" deep the query will go to
  look for neighbors.

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

```json
{
  "id": "<a vertex id>",
  "depth": 5
}
```

NOTE: The depth that is supplied must be a value between 1 and 5 (inclusive)

### Retrieving an Edge by ID

This query allows you to fetch an edge, its properties, and the relationship it
describes by its ID or label and filters. The query requires one or two of three
parameters:

- `id`: The ID as a string.
- `label`: The label displayed on the edge.
- `filters`: A set of filters that define the desired vertex.

The example below contains all of the currently available filters.

NOTE: Only one of the variables (`id`, `label`, or `filters`) is required.
Specifying `label` and `filters` with `id` is allowed but somewhat redundant
unless you want to assert that a vertex with the specified `id` exists *and* has
the specific label and properties.

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

### Fetching the Count of Entities Via a \_type and/or \_class

This query allows you to fetch the count of entities. The `_id`, `_key`,
`_type`, or `_class` fields can be supplied as filters. This query only counts
the latest versions of entities matching the filter criteria. This query
requires two parameters:

- `filters`: A set of vertex filters that describe the entities that are to be
  returned.
- `filterType`: A `FilterType` (`AND` or `OR`).

If `OR` is specified as the filter type, any entity that has any class in the
filter will be included in the count. By default, the query uses `AND`, which
only includes entities that have _all_ of the specified classes in the count.

Note: This resolver uses the `JSON` scalar as the return type.

```graphql
query testQuery($filters: VertexFilters, $filterType: FilterType) {
  entityCount(filters: $filters, filterType: $filterType)
}
```

Note: Use field aliases to request the counts of
multiple different entities.

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

### Fetching the Count of All Types and Classes

This query returns the entity counts for all types and classes.

Note: This resolver uses the `JSON` scalar as the return type.

```graphql
query testQuery {
  allEntityCounts
}
```

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

### Fetching the Count of All Types With a Set of Classes

This query returns all types that have the specified classes. The query requires
two parameters:

- `classes`: An array of strings detailing which classes should be returned.
- `filterType`: A `FilterType` (`AND` or `OR`).

If `OR` is specified as the filter type, any entity that has any class in the
filter will be included in the count. By default, the query uses `AND`, which
only includes entities that have _all_ of the specified classes in the count.

Note: This resolver uses the `JSON` scalar as the return type.

```graphql
query testQuery ($classes: [String], filterType: FilterType) {
  typeCounts (classes: $classes, filterType: $filterType)
}
```

Example result:

```json
{
  "iam_user": 12,
  "iam_managed_policy": 10,
  "iam_role_policy": 10
}
```

### Vertex Full-Text Search

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

### Listing Vertices Via a \_type and/or \_class

For fetching entities with specified filters. The `_id`, `_key`, `_type` and
`_class` fields can be supplied as filters. This query only returns the latest
versions of entities matching the filter criteria. This query accepts three
parameters:

- `filters`: A set of vertex filters that describe the entities to return (required).
- `after`: A string to begin searching after (required).
- `filterType`: A `FilterType` (`AND` or `OR`).

If `OR` is specified as the filter type, any entity that has any class in the
filter will be included in the count. By default, the query uses `AND`, which
only includes entities that have _all_ of the specified classes in the count.

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

This mutation creates a JupiterOne entity with the given specifications. This
mutation requires three parameters (with two optional parameters):

- `entityKey`: A string that gives the key value for the entity so that this entity can be referenced later.
- `entityType`: A string that gives the type of the entity being created.
- `entityClass`: A string that gives the class of the entity being created.
- Optional Parameters
  - `timestamp`:
  - `properties`: A `JSON` list that gives specific properties that the entity will have.

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

This mutation updates an already existing entity (does not create an entity).
You cannot change the `entityKey`, `entityClass`, or `entityType`.
This mutation requires one parameter (with two optional parameters):
- `entityId`: A string specific to the entity that finds the entity.
- Optional Parameters:
  - `timestamp`: 
  - `properties`: A `JSON` list of properties to be changed.


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

This mutation deletes an existing entity.
This mutation requires one parameter (with one optional parameter):
- `entityId`: A string specific to the entity that finds the entity.
- Optional Parameters: 
  - `timestamp`: 

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

### Delete an alert rule

```graphql
mutation DeleteRuleInstance ($id: ID!) {
  deleteRuleInstance (
    id: $id
  ) {
    id
  }
}
```

variables:

```json
{
  "id": "b1c0f75d-770d-432a-95f5-6f59b4239c72"
}
```

Note that deleting an alert rule this way will **not** dismiss active alerts
already triggered by this rule. It is recommended to **Disable** a rule in the
alerts app UI instead of deleting one.

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

## Question Operations

**Endpoint:** `/graphql`

### Create a Question

```graphql
  mutation CreateQuestion($question: CreateQuestionInput!) {
    createQuestion(question: $question) {
      id
      title
      description
      queries {
        name
        query
        version
      }
      variables {
        name
        required
        default
      }
      compliance {
        standard
        requirements
      }
      accountId
      integrationDefinitionId
    }
  }
```

variables:

```json
{
  "question": {
    "title": "What are my production resources?",
    "tags": ["SecOps"],
    "description": "Returns a list of all production entities.",
    "queries": [
      {
        "name": "prodresources",
        "query": "Find * with tag.Production=true"
      }
    ],
    "compliance": [
      {
        "standard": "HITRUST CSF",
        "requirements": ["10.k"]
      }
    ]
  }
}
```

**Notes on "named queries":**

- `name` field is optional
- `name` should be a single word without special characters
- queries named `good`, `bad`, and `unkown` are used to determine gaps/issues and to perform continuous compliance assessment

### Update a question

```graphql
  mutation UpdateQuestion($id: ID!, $update: QuestionUpdate!) {
    updateQuestion(id: $id, update: $update) {
      id
      title
      description
      queries {
        name
        query
        version
      }
      variables {
        name
        required
        default
      }
      compliance {
        standard
        requirements
      }
      accountId
      integrationDefinitionId
    }
  }
```

variables:

```json
{
  "id": "sj3j9f0j2ndlsj300swdjfjs",
  "update": {
    "title": "What are my production resources?",
    "tags": ["SecOps"],
    "description": "Returns a list of all production entities.",
    "queries": [
      {
        "name": "prodresources",
        "query": "Find * with tag.Production=true"
      }
    ],
    "compliance": [
      {
        "standard": "HITRUST CSF",
        "requirements": ["10.k"]
      }
    ]
  }
}
```

Note that the only difference here for `update` is the `"id"` property
associated with the question.

### Delete a question.

```graphql
  mutation DeleteQuestion($id: ID!) {
    deleteQuestion(id: $id) {
      id
      title
      description
      queries {
        query
        name
        version
      }
      variables {
        name
        required
        default
      }
      tags
      accountId
      integrationDefinitionId
    }
  }
}
```

variables:

```json
{
  "id": "slj3098s03j-i2ojd0j2-sjkkdjf"
}
```

## Integration Operations

### Finding an Integration Definition based on a type

This query returns an Integration Definition. This query requires an Integration Type.

```graphql
query testQuery ($integrationType: String!) {
  findIntegrationDefinition (integrationType: $integrationType) {
    id
    name
    type
    title
    integrationType
    integrationClass
    configFields {
      key
      displayName
      description
    }
  }
}
```

### Getting an Integration Definition with an ID

This query returns a Integration Definition. This query requires an ID.

```graphql
query getIntegrationDefinition($id: String) {
  integrationDefinition(id: $id) {
    id
    name
    type
    title
  }
}
```

### List Integration Definitions

This query returns a list of all Integration Definitions.

```
query testQuery {
  integrationDefinitions {
    definitions {
      id
      name
      type
      title
    }
    pageInfo {
      endCursor
      hasNextPage
    }
  }
}
```

###

## Example Usages

**Creating entities and a relationship between them**
NOTE: The following mutations utilize a J1Client.

```
const CREATE_ENTITY = gql`
  mutation createEntity (
    $entityKey: String!
    $entityType: String!
    $entityClass: String!
    $timestamp: Long
    $properties: JSON
  ) {
    createEntity(
      entityKey: $entityKey
      entityType: $entityType
      entityClass: $entityClass
      properties: $properties
    ) {
  .
  .
  .
  }`;

const CREATE_RELATIONSHIP = gql`
  mutation CreateRelationship (
    $relationshipKey: String!
    $relationshipType: String!
    $relationshipClass: String!
    $fromEntityId: String!
    $toEntityId: String!
  ) {
    createRelationship (
      relationshipKey: $relationshipKey
      relationshipType: $relationshipType
      relationshipClass: $relationshipClass
      fromEntityId: $fromEntityId
      toEntityId: $toEntityId
    ) {
    .
    .
    .
  }`;


const entity1 = await j1Client.mutate({
  mutation: CREATE_ENTITY,
  variable: {
    entityKey: 'Example Key',
    entityType: 'ExampleType',
    entityClass: 'ExampleClass',
    properties: {
      'tag.key': 'tagvalue'
    }
  }
});

const entity2 = await j1Client.mutate({
  mutation CREATE_ENTITY,
  variable: {
    entityKey: 'Other Example Key',
    entityType: 'OtherType',
    entityClass: 'OtherClass',
    properties: {
      'tag.key': 'tag'
    }
  }
});

const relationship = await j1Client.mutate({
  mutation: CREATE_RELATIONSHIP,
  variable: {
    relationshipKey: entity1._key + ' |uses| ' + entity2._key,
    relationshipClass: 'entity_uses_entity',
    relationshipType: 'USES',
    toEntityId: entity2._id,
    toEntityKey: entity1._id,
  }
});
```
