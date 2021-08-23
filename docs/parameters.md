# JupiterOne Parameter Service

Previously, some use cases of JupiterOne required referencing a *literal* value that is better suited to reference as a *variable* or a **parameter**.  
Some common values that could be better stored and retrieved at runtime instead of saved literally include:

 - Long or unwieldy values (such as a long URL)
 - Sensitive values (such as a private key or API token)
 - Common values (such as dates, keys) that you may want to change in many places at one time

 A better alternative exists in the form of parameters that can be stored and referenced in rules and queries with a special syntax.

<br>
<hr>

## Example

In the use case of a very long URL, which may not be easily human-readable and may be referenced in many rules, queries, or questions, use: 

### Example: Parameters in J1QL

```J1QL
FIND Application WITH loginUrl = ${ param.longURL }
```

### Example: Parameters in Rules

```json
  "headers": {
    "Authorization": "Bearer {{param.secretApiKey}}"
  }
```

The service hydrates the value of `longUrl` or `secretApiKey` and evaluates it against the 
remote contents instead of the parameter expression.  You can leverage this same pattern for 
different types of parameter types and comparisons, explained below.  As shown above, the 
syntax between rules and queries differs slightly, but is consistent with variables (in the
case of queries) and expressions (in the case of rules).
<hr>
<br>

## Usage: Schema

Currently, the storage of parameters is only accessible from public-facing GraphQL endpoints. 
In the future, a user interface will be available to account users but, currently, only the API exists.

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

You can reference parameters in [rules configurations](./schemas/alert-rule.md) or any [query expression](./jupiterone-query-language.md), although the 
syntax is slightly different. Inside of queries, you can use the dollar-sign-bracket syntax to reference objects. 

'param' is a special keyword in queries that, when invoked, fetches values from the parameter-storing service. In the case of both rules and queries, 
references to parameters that do not exist causes errors and abandons execution.

## Auditing & Security

All changes (including creation and deletion) of parameters is captured by an audit trail providing visibility into the historic usage and access of these values.  In addition, all parameters are encrypted-at-rest and in-transit, subject to log redaction, and are subject to either ABAC or IAM-based fine-grained permissions.

## Secret Parameters

Any parameters set with `isSecret` to be `true` are considered write-only and not readable from the API. Only evaluations of the query can access 
these parameter values.  This usage enables the storage of sensitive parameters such as API keys that JupiterOne users should not be able to see.  All read access to these secret parameters will contain redacted values, but metadata is able to be read.

By design, you cannot update a parameter that has had `isSecret` set to true to `isSecret: false` without also changing the value in the same request.
