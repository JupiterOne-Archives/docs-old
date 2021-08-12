# JupiterOne Parameter Service

Previously, some JupiterOne use cases required referencing as a *literal* value that is more suited to reference as a *variable* or a **parameter**.  Some common values that could be better stored and retrieved at runtime instead of saved literally include:

 - Long or unwieldy values (such as a long URL)
 - Sensitive values (such as a private key or API token)
 - Common values (such as dates, keys) that you may want to change in many places at one time

 A better alternative exists as parameters that can be stored and referenced in rules and queries with a special syntax.

<br>
<hr>

## Example

In the use case of a very long URL, which may not be easily human-readable and may be referenced in many rules, queries, or questions, use: 

```
FIND Application WITH loginUrl = ${ param.longURL }
```
The service hydrates the value of `longUrl` and the query is evaluated with the remote contents instead of the parameter expression.  You can leverage this same pattern for different types of parameters and comparisons, explained below.
<hr>
<br>

## Usage: Schema

Currently, the storage of parameters is only accessible from public-facing GraphQL endpoints.  In the future, a user interface will be available to account users but, currently, only the API exists.

A parameter is an object stored in the parameter-service which uses the following schema:


| Property           | Type              | Description                                                                                                                                                         |
| ------------------ | ----------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `name`               | `string`          | The parameter **key** or "name" |
| `value`          | `string` \| `number` \| `boolean` \| `list`[*](#listtypes)          | The parameter **value** to be stored/retrieved 
| `isSecret`[*](#secretparameters)              | `boolean`          | **Flag** to treat value as sensitive data |
| `lastUpdatedOn`               | `date`          | **Date** which indicates last update  |

#### List Types 
Lists are considered to be arrays of `string`, `number`, or `boolean` types

<br>

<hr>

## Usage: API Operations and Queries

|Queriable fields:||
|--|--|
| [parameter](#queryparameter)|Individual `QUERY` for one parameter|
|[parameterList](#queryparameterlist)|Bulk `QUERY` for parameters|

|Mutations:||
|--|--|
| [setParameter](#mutationsetparameter)|Create/update a remote parameter|
|[deleteParameter](#mutationdeleteparameter)|Remove a parameter from the remote store|

<br>


## GraphQL API

### Query: `parameter`


|*Argument*|*Type*|*Required?*|
|--|--|--|
| name | `string` | Yes |

***Returns***: [Parameter](#usageschema)

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

|*Argument*|*Type*|*Required?*|*Default*|
|--|--|--|--|
| limit | `number` | No | 100 |
| cursor | `string` | No (unless paginating) | n/a |

***Returns***: Paginated<[Parameter](#usageschema)>

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
| value | `string` \| `number` \| `boolean` \| `list`[*](#listtypes)  | Yes | n/a
| isSecret | `boolean` |No| `false` |

### ***Returns***
```ts
{ success: boolean }

```
***Example*** 

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

#### ***Returns***
```ts
{ success: boolean }
```
***Example***

```gql
mutation Mutation($name: String!) {
    deleteParameter(name: $name) {
        success
    }
}
```
<br>

## Parameter References

You can reference parameters in [rules configurations](./schemas/alert-rule.md) or any [query expression](./jupiterone-query-language.md), although the syntax is slightly different.  Inside of queries, you can use the dollar-sign-bracket syntax to reference objects. The `param` object is a special member which, when invoked, fetches values from the parameter-storing service.  In the case of both rules and queries, references to parameters which do not exist causes errors and abandons execution.

## Secret Parameters

Any parameters set with `isSecret` to be `true` are considered write-only and not readable from the API. Only evaluations of the query can access these parameter values.  This usage enables the storage of sensitive parameters such as API keys that  JupiterOne users should not be able to see.

By design, you cannot update a parameter that has had `isSecret` set to true to `isSecret: false` without also changing the value in the same request.