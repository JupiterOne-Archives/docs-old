# JupiterOne Parameter Service

Previously, some use-cases of JupiterOne required referencing a value as a *literal* that is more suited to reference as a *variable* or **parameter**.  Some common values that might be better stored and retrieved at run-time rather than saved literally:

 - Long or unwieldy values (*e.g.* a long URL)
 - Sensitive values (*e.g.* a private key or API token)
 - Common values (*e.g.* dates, keys) we may want to change in many places at once

 Today, a better alternative exists: parameters can be stored and referenced in rules and queries with a special syntax.

<br>
<hr>

## Example:

Consider the use-case of a very long URL which may not be (easily) human-readable and maybe referenced in many rules, queries, or questions: 

```
FIND Application WHERE loginUrl = ${ param.maybeLongURL }
```
Here, the service will hydrate the value of `maybeLongUrl` and the query will be evaluated with the remote contents rather than the parameter expression.  This same pattern can be leveraged for different types of parameters and comparisons, explained below.
<hr>
<br>

## Usage: Schema

Currently, the storage of parameters is only accessible from public-facing GraphQL endpoints.  In the future a user interface will be made available to account users, but currently, only the API exists.

A parameter is an object stored in the parameter-service which follows the following schema:


| Property           | Type              | Description                                                                                                                                                         |
| ------------------ | ----------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `name`               | `string`          | The parameter **key** or "name" |
| `value`          | `string` \| `number` \| `boolean` \| `list`[*](#list-types)          | The parameter **value** to be stored/retrieved 
| `isSecret`               | `boolean`          | **Flag** to treat value as sensitive data |
| `lastUpdatedOn`               | `date`          | **Date** which indicates last update  |

#### List Types: 
Lists are considered to be Arrays of `string`, `number`, or `boolean` types

<br>
<hr>

## Usage: API Operations & Queries

|Queriable fields:||
|--|--|
| [parameter](#graphql-query-parameter)|Individual `QUERY` for one parameter|
|[parameterList](#graphql-query-parameterlist)|Bulk `QUERY` for parameters|

|Mutations:||
|--|--|
| [setParameter](#graphql-mutation-setparameter)|Create/update a remote parameter|
|[deleteParameter](#graphql-mutation-deleteparameter)|Remove a parameter from the remote store|

<br>


## GraphQL API

### Query: `parameter`


|*Argument*|*Type*|*Required?*|
|--|--|--|
| name | `string` | Yes |

***Returns***: [Parameter](#usage-schema)

***Example***: 
```gql
query Query($name: String!) {
    parameter(name: $name) {
        name
        value
        isSecret
        lastUpdatedOn
    }
}
```
<br>

### Query: `parameterList`

|*Argument*|*Type*|*Required?*|
|--|--|--|
| names | `Array<string>` | Yes |

***Returns***: Paginated<[Parameter](#usage-schema)>

***Example***: 
```gql
query Query($limit: Int, $cursor: String) {
    parameterList(limit: $limit, cursor: $cursor) {
        items {
            name
            value
            isSecret
            lastUpdatedOn
        }
        pageInfo {
            endCursor
            hasNextPage
        }
    }
}
```
<br>

### Mutation: `setParameter`

|*Argument*|*Type*|*Required?*|*Default*
|--|--|--|--|
| name | `string` |Yes| n/a |
| value | `string` \| `number` \| `boolean` \| `list`[*](#list-types)  | Yes | n/a
| isSecret | `boolean` |No| `false` |

### ***Returns***: 
```ts
{ success: boolean }

```
***Example***: 
```gql
mutation Mutation($name: String!, $value: ParameterValue!) {
    setParameter(name: $name, value: $value) {
        success
    }
}
```

<br>

#### Mutation: `deleteParameter`

|*Argument*|*Type*|*Required?*|
|--|--|--|
| name | `Array<string>` |Yes|

#### ***Returns***: 
```ts
{ success: boolean }
```
***Example***: 
```gql
mutation Mutation($name: String!) {
    deleteParameter(name: $name) {
        success
    }
}
```
<br>

## Referencing Parameters

Parameters can be referenced in [rules' configurations](./schemas/alert-rule.md) or any [query expression](./jupiterone-query-language.md), though the syntax is slightly different.  Inside of queries, the dollar-sign-bracket syntax can be used to reference objects; the `param` object is a special member, which when invoked, will fetch from the parameter-storing service to retrieve values.  In the case of both rules and queries, references to parameters which don't exist will cause errors and abandon execution.