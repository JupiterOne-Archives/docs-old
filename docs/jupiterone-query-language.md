# JupiterOne Query Language (J1QL)

The JupiterOne Query Language (aka "J1QL") is a query language for querying data
stored by JupiterOne. The execution of a J1QL query will seamlessly query full
text search, entity-relationship graph, and any other future data stores as
needed. By design, the query language does not intend to make these data store
boundaries obvious to query authors.

## Language Features

- Seamlessly blend full-text search and graph queries
- Language keywords are case-insensitive
- Inspired by SQL and Cypher and aspires to be as close to natural language as possible
- Support for variable placeholders
- Support for bidirectional traversal
- Return **entities**, **relationships**, and/or traversal **tree**
- Support for sorting via `ORDER BY` clause (currently only applies to the starting entities of traversal)
- Support for pagination via `SKIP` and `LIMIT` clauses (currently only applies to the starting entities of traversal)
- Multi-step graph traversals through relationships via `THAT` clause
- Aliasing of selectors via `AS` keyword
- Pre-traversal filtering using property values via `WITH` clause
- Post-traversal filtering using property values or union comparison via `WHERE` clause
- Support aggregates including `COUNT`, `MIN`, `MAX`, `AVG` and `SUM`.

## Basic Keywords

`FIND` is followed by an **Entity** `class` or `type` value.

> The value is case sensitive in order to automatically determine if the query
> needs to search for entities by the `class` or the `type`, without requiring
> authors to specifically call it out.
>
> Entity `class` is stored in `TitleCase` while `type` is stored in
> `snake_case`.
>
> A wildcard `*` can be used to find _any entity_.
>
> For example:
>
> - `FIND User` is equivalent to `FIND * with _class='User'`
> - `FIND aws_iam_user` is equivalent to `FIND * with _type='aws_iam_user'`
>
> Note that using the wildcard at the beginning of the query without any
> pre-traversal filtering -- that is, `FIND * THAT ...` without `WITH` (see
> below) -- may result in long query execution time.

`WITH` is followed by **property name and values** to filter entities.

> Supported operators include:
>
> - `=` or `!=` for **String** value, **Boolean**, **Number**, or **Date**
  comparison.
> - `>` or `<` for **Number** or **Date** comparison.
>
> Note:
>
> - The property names and values are _case sensitive_.
> - **String** values must be wrapped in either single or double quotes -
>   `"value"` or `'value'`.
> - **Boolean**, **Number**, and **Date** values must _not_ be wrapped in quotes.
> - The `undefined` keyword can be used to filter on the absence of a property.
>   For example: `FIND DataStore with encrypted=undefined`
> - If a property name contains special characters (e.g. `-` or `:`), you can
>   wrap the property name in `[]`.
>   For example: `[tag.special-name]='something'`

`AND`, `OR` for multiple property comparisons are supported.

> For example:
>
> ```j1ql
> FIND DataStore WITH encrypted = false AND tag.Production = true
>
> FIND user_endpoint WITH platform = 'darwin' OR platform = 'linux'
> ```

- You can filter multiple property values like this (similar to `IN` in SQL):

  >  ```j1ql
  >  FIND user_endpoint WITH platform = ('darwin' OR 'linux')
  >
  >  Find Host WITH tag.Environment = ('A' or 'B' or 'C')
  >
  >  Find DataStore WITH classification != ('critical' and 'restricted')
  >  ```

- Property filters are evaluated according the following **order of operations**:

  > Parenthesis first, comparisons (`=`, `>=`, `<=`, `!=`) after, `AND` and then
  > `OR`.

`THAT` is followed by a **Relationship verb**.

> The verb is the `class` value of a **Relationship** -- that is, the edge
> between two connected entity nodes in the graph. This relationship verb/class
> value is stored in `ALLCAPS`, however, it is _case insensitive_ in the query,
> as the query language will automatically convert it.
>
> The predefined keyword `RELATES TO` can be used to find _any_ relationship
> between two nodes. For example:
>
> `FIND Service THAT RELATES TO Account`

`( | )` can be used to select entities or relationships of different class/type.

> For example, `FIND (Host|Device) WITH ipAddress='10.50.2.17'` is equivalent to
> and much simpler than the following:
>
> ```j1ql
> FIND * WITH
>   (_class='Host' OR _class='Device') AND ipAddress='10.50.2.17'
> ```
>
> It is fine to mix entity class and type values together. For example:
>
> `FIND (Database|aws_s3_bucket)`
>
> It can be used on Relationship verbs as well. For example:
>
> `FIND HostAgent THAT (MONITORS|PROTECTS) Host`
>
> Or both Entity and Relationships together. For example:
>
> `FIND * THAT (ALLOWS|PERMITS) (Internet|Everyone)`
>

**Relationship verbs** are bidirectional
> 
> `FIND User THAT HAS Device`
>
> and
>
> `Find Device THAT HAS User`
>
> are both acceptable

`AS` is used to define an aliased selector.

> Defines an aliased selector to be used in the `WHERE` or `RETURN` portion of a
> query. For example:
>
> - **Without** selectors: `FIND Firewall THAT ALLOWS *`
> - **With** selectors: `FIND Firewall AS fw THAT ALLOWS * AS n`
>
> Selectors can also be defined on a relationship:
>
> - `FIND Firewall AS fw THAT ALLOWS AS rule * AS n`

`WHERE` is used for post-traversal filtering (requires selector)

> From the example above:
>
> ```j1ql
> FIND Firewall as fw that ALLOWS as rule * as n
>   WHERE rule.ingress=true AND
>     (rule.fromPort=22 or rule.toPort=22)
> ```

`RETURN` is used to return specific entities, relationships, or properties

> By default, the entities and their properties found from the start of the
> traversal is returned. For example, `Find User that IS Person` returns all
> matching `User` entities and their properties, but not the related `Person`
> entities.
>
> To return properties from both the `User` and `Person` entities, define a
> selector for each and use them in the `RETURN` clause:
>
> ```j1ql
> FIND User as u that IS Person as p
>   RETURN u.username, p.firstName, p.lastName, p.email
> ```
>
> If a property name contains special characters (e.g. `-` or `:`), you can
> wrap the property name in `[]`.
> For example: `RETURN p.[special-name]='something'`
>
> Wildcard can be used to
> return all properties. For example:
>
> ```j1ql
> FIND User as u that IS Person as p
>   RETURN u.*, p.*
> ```
>
> A side effect of using wildcard to return all properties is that all metadata
> properties associated with the selected entities are also returned. This may
> be useful when users desire to perform analysis that involves metadata.

`TO` is used after a relationship verb, and with the exception of `RELATES TO`,
is considered a 'filler' word that is ignored by the interpreter.

> The keyword `TO` is supported in J1QL so that the query can be read as a
> natural language question. Although `TO` can be used in a query, if omitted,
> the returned result will be the same.
>
> The following are some example relationship verbs where `TO` could be used:
>
> - `DEPLOYED TO`
> - `CONTRIBUTES TO`
> - `CONNECTS TO`
> - `ASSIGNED TO`
> 
> The following queries will return the same result:
>
> ```j1ql
> FIND User THAT CONTRIBUTES TO CodeRepo
> FIND User THAT CONTRIBUTES CodeRepo
> ```

**REMINDER** J1QL keywords are not case sensitive.

## String Comparisons

J1QL supports the use of the following operators for string comparisons:

- `=` : equal to
- `~=` : contains
- `^=` : starts with
- `$=` : ends with
- `!~=` : does not contain
- `!^=` : does not start with
- `!$=` : does not end with

These operators only work for string comparisons.

**Examples:**

```j1ql
Find Person with firstName^='J'
```

The above query would return all entities of the `Person` class that have a `firstName` beginning with the character 'J'.

```j1ql
Find Host with tag.AccountName~='demo' 
```

The above query would return entities of the `Host` class with any of the following examples of `tag.AccountName`: `xyz_demo`, `demo_xyz`, `abc_demo_xyz`.

*Note: These string evaluations are case-sensitive. So 'Demo' and
'demo' will yield distinct sets of results.*

## Date Comparisons

The query language supports both relative and static data comparisons on any
timestamp property. The timestamp property used for date comparison must be
stored as an epoch number in milliseconds.

### Relative Date Comparison

Relative date comparison allows filtering based on the current datetime.

For example:

```j1ql
Find DataStore with createdOn > date.now - 1 day
```

The following units are supported:

- `hour`, `hr`, `hours`, `hrs`
- `day`, `days`
- `month`, `mo`, `months`, `mos`
- `year`, `yr`, `years`, `yrs`

### Static Date Comparison

Static date comparison allows filtering based on a given datetime.

For example:

```j1ql
Find DataStore with createdOn > date(2019-10-30)
```

The static date must be specified in ISO ISO 8601 format:

- `date(YYYY)`
- `date(YYYY-MM)`
- `date(YYYY-MM-DD)`
- `date(YYYY-MM-DDThhTZD)`
- `date(YYYY-MM-DDThh:mmTZD)`
- `date(YYYY-MM-DDThh:mm:ssTZD)`
- `date(YYYY-MM-DDThh:mm:ss.sTZD)`

## Sorting and Pagination via `ORDER BY`, `SKIP`, and `LIMIT`

`ORDER BY` is followed by a `selector.field` to indicate what to sort.

`SKIP` is followed by a number to indicate how many results to skip.

`LIMIT` is followed by a number to indicate how many results to return.

In the example below, the query sorts users by their username, and returns the
11th-15th users from the sorted list.

```j1ql
FIND Person WITH manager = undefined as u
  ORDER BY u.username SKIP 10 LIMIT 5
```

_Note: query returns up to 250 results by default if LIMIT is not set._

## Aggregation Functions: `COUNT`, `MIN`, `MAX`, `AVG` and `SUM`

It is useful to be able to perform calculations on data that have been returned
from the graph. Being able to perform queries to retrieve a count, min, max or
perform other calculations can be quite valuable and gives users more ways to
understand their data.

The ability to perform aggregations are exposed as **Aggregating Functions**.
These are functions that can be applied to a given set of data that was
requested via the `RETURN` clause.

The following aggregating functions are supported:

- `count(selector)`
- `count(selector.field)` _future development_
- `min(selector.field)`
- `max(selector.field)`
- `avg(selector.field)`
- `sum(selector.field)`

The keywords are _case insensitive_.

A few examples:

```j1ql
find
  bitbucket_team as team
    that relates to
  bitbucket_user as user
return
  team.name, count(user)
```

```j1ql
find
  bitbucket_team as team
    that relates to
  bitbucket_user as user
return
  count(user), avg(user.age)
```

See more details and examples [below](#How-aggregations-are-applied).

_Future development:_

> There are plans to support the following aggregations:
>
> - `count(*)` - for determining the count of all other entities related to a
>   given entity.

## De-duplicate results with `UNIQUE` and `RETURN`

Sometimes a query may generate duplicate results. This occurs if there are
multiple paths of traversals (i.e. relationships) between the vertices (i.e.
entities) referenced in a particular query.

Take the example below:

```j1ql
Find aws_eni with publicIpAddress != undefined as nic
  that relates to aws_instance
  that relates to aws_security_group as sg that allows Internet
where nic.securityGroupIds = sg.groupId
```

This query attempts to find network interfaces that are associated with a
security group that allows public facing AWS EC2 instances. In this case, there
could be multiple security group rules allowing access to/from the Internet,
which may result in duplicate data in the query result because each individual
traversal is a successful match to the query.

You can use a combination of `UNIQUE` and `RETURN` keywords to filter out the
duplicates. The query above can be modified as:

```j1ql
Find UNIQUE aws_eni with publicIpAddress != undefined as nic
  that relates to aws_instance
  that relates to aws_security_group as sg that allows Internet
where
  nic.securityGroupIds = sg.groupId
RETURN
  nic.id, nic.subnetId, nic.attachmentId,
  nic.active, nic.privateIp, nic.publicIp,
  nic.vpcId, nic.securityGroupIds, nic.securityGroupNames,
  nic.tag.AccountName, nic.webLink
```

_Limitation: `UNIQUE` keyword **must** be used together with `RETURN`._

## Math Operations

J1QL supports basic math operations on the return values.

- Supported operations include `+`, `-`, `/`, `*` and parenthesis

- It will evaluate with normal order of operations:

  > parenthesis -> multiplication or division -> addition or subtraction

- The operation only works against number values. It will not work against
  strings or strings that represent numbers:

  > `'1'` will not work, has to be `1`

Example query:

```j1ql
Find (aws_db_cluster_snapshot|aws_db_snapshot) as snapshot
Return
  snapshot.displayName,
  snapshot.allocatedStorage * 0.02 as Cost
```

This can be combined with aggregation functions. For example:

```j1ql
Find (aws_db_cluster_snapshot|aws_db_snapshot) as snapshot
Return
  snapshot.tag.AccountName as Account,
  sum(snapshot.allocatedStorage) * 0.02 as EstimatedCost
```

## Optional traversals (Beta)

Note: This is a beta feature and the syntax for describing optional
traversals may change in the future to help improve clarity.
Any changes made to the language will be
backwards compatible.

In situations where it is useful to optionally find related entities
and include them in the results, J1QL allows for portions of a query to be
wrapped with a `(` and `)?` to mark that section of the query as an optional
traversal. This allows for related entities from a graph
traversal to be combined and for additional constraints to be applied
to the set of entities.

Example query:

```j1ql
Find User (that IS Person)?
```

In the above example, we search for `User` entities
and optionally traverse an `IS` relationship to a `Person` entity.
If the relationship exists, the related `Person` entities are
added to the list of results.

**Relationships can still be chained within an optional traversal.** The query
below will return a list of `Device` entities owned by a `Person` that is a `User`
and `User` entities that do not have the indirect relationship to the `Device`.

```j1ql
Find User (that IS Person that OWNS Device)?
```

**Relationships that come after an optional traversal are processed on the
combined results.** This query searches for Users or UserGroups that directly
assigned an AccessPolicy granting admin permissions to certain resources,
or via an AccessRole assigned to the User/UserGroup.

```j1ql
Find (User | UserGroup)
  (that assigned AccessRole)?
  that assigned AccessPolicy
  that allows as permission *
where permission.admin=true
return TREE
```

**Optional traversals can also be chained.** The combined results from
each previous optional traversal will be used in the next optional
traversal.

The below query will find `User` entities, `Person` entities
that have an `IS` relationship to the `User` and `Device` entites
that are owned by `Person` and `User` entities from the previous
optional traversal.

```j1ql
Find User
  (that is Person)?
  (that owns Device)?
Return User, Person, Device
```

**The optional traversals can also be aliased.** This allows the union set of
entities to be used when returning results and when applying constraints.

```j1ql
Find User
  (that is Person)? as userOrPerson
  that owns Device
Where userOrPerson.email = 'test@jupiterone.com'
Return userOrPerson, Device
```

Traversals performed within the `(` and `)?` function as normal
graph traversals, so `WITH` filters can still be applied
to assist with narrowing results.

```j1ql
Find User with name = 'test'
  (that is Person with email = 'test@jupiterone.com')? as userOrPerson
  that owns Device
return userOrPerson, Device
```

## Examples

More example queries are shown below.

These examples, and same with all packaged queries provided in the JupiterOne
web apps, are constructed in a way to de-emphasize the query keywords (they are
_case insensitive_) but rather to highlight the relationships -- the operational
context and significance of each query.

### Simple Examples

**Find any entity that is unencrypted**

```j1ql
Find * with encrypted = false
```

**Find all entities of class DataStore that are unencrypted**

```j1ql
Find DataStore with encrypted = false
```

**Find all entities of type aws_ebs_volume that are unencrypted**

```j1ql
Find aws_ebs_volume with encrypted = false
```

### Query with relationships

**Return just the Firewall entities that protects public-facing hosts**

```j1ql
Find Firewall that PROTECTS Host with public = true
```

**Return Firewall and Host entities that matched query**

```j1ql
Find Firewall as f that PROTECTS Host with public = true as h RETURN f, h
```

**Return all the entities and relationships that were traversed as a tree**

```j1ql
Find Firewall that PROTECTS Host with public = true RETURN tree
```

### Full-text search

**Find any and all entities with "127.0.0.1" in some property value**

```j1ql
Find "127.0.0.1"
```

**The FIND keyword is optional**

```j1ql
"127.0.0.1"
```

**Find all hosts that have "127.0.0.1" in some property value**

```j1ql
Find "127.0.0.1" with _class='Host'
```

### Negating relationships

It's useful to know if entities do not have a relationship with another entity.
To achieve this, relationships can be negated by prefixing a relationship with
an exclamation point: `!`.

```j1ql
Find User that !IS Person
```

**This also applies to any relationships**

```j1ql
Find User that !RELATES TO Person
```

This finds EBS volumes that are not in use. The query finds relationships
regardless of the edge direction, therefore the `!USES` in the below query
translates more directly as **"is not used by"**.

```j1ql
Find aws_ebs_volume that !USES aws_instance
```

It is important to note that the above query returns `aws_ebs_volume` entities.
If the query were constructed the other way around --

```j1ql
Find aws_instance that !USES aws_ebs_volume
```

-- it would return a list of `aws_instances`, if it does not have an EBS
volume attached.

### More complex queries

Find critical data stored outside of production environments.

This assumes you have the appropriate tags (Classification and Production) on
your entities.

```j1ql
Find DataStore with tag.Classification='critical'
  that HAS * with tag.Production='false'
```

Find all users and their devices without the required endpoint protection agent
installed:

```j1ql
Find Person that has Device that !protects HostAgent
```

Find incorrectly tagged resources in AWS:

```j1ql
Find * as r
  that RELATES TO Service
  that RELATES TO aws_account
  where r.tag.AccountName != r.tag.Environment
```

If your users sign on to AWS via single sign on, you can find out who has access
to those AWS accounts via SSO:

```j1ql
Find User as U
  that ASSIGNED Application as App
  that CONNECTS aws_account as AWS
  RETURN
    U.displayName as User,
    App.tag.AccountName as IdP,
    App.displayName as ssoApplication,
    App.signOnMode as signOnMode,
    AWS.name as awsAccount
```

### Using metadata

Filtering on metadata can often be useful in performing security analysis. The
example below is used to find network or host entities that did _not_ get
ingested by an integration instance. In other words, these are entities that are
likely "external" or "foreign" to the environment.

```j1ql
Find (Network|Host) with _IntegrationInstanceId = undefined
```

The following example finds all brand new code repos created within the last 48
hours:

```j1ql
Find CodeRepo with _beginOn > date.now-24hr and _version=1
```

For more details on metadata properties, see the [JupiterOne Data Model][1]
documentation.

[1]: jupiterone-data-model.md

## Advanced Notes and Use Cases

### How aggregations are applied

There are three different ways for aggregations to be applied

- on the customer's subgraph (determined by the traversal that is run)
- on a portion of the customer's subgraph relative to a set of entities (groupings)
- on data for a single entity

The way aggregations happen are determined by what is requested via
the query language's `return` clause.

#### Aggregations relative to a subgraph

If all selectors are aggregations, then all aggregations will be
scoped to the entire traversal that the user has requested and not
tied to individual entities.

Ex. `return count(acct), count(user)`:

```j1ql
Find Account as acct that has User as user
return count(acct), count(user)
```

#### Aggregations relative to a grouping by entity attribute

If selectors are provided that do not use an aggregation function,
they will be used as a _grouping key_.
This key will be used to apply the aggregations relative to the data chosen.

Ex. `return acct._type, count(user)`:

```j1ql
Find Account as acct that has User as user
return acct._type, count(user)
```

#### Aggregations relative to a grouping by multiple attributes

If multiple attributes of a selector are included the return function, the last
one before the aggregation will be used as the _grouping key_.

Ex. `return acct._type, acct.displayName, count(user)`:

```j1ql
Find Account as acct that has User as user
return acct._type, acct.displayName, count(user)
```

#### Aggregations Examples

##### The Simple Case

For example, with the following query,

```j1ql
find
  bitbucket_team as team
    that relates to
  bitbucket_user as user
return
  team.name, count(user)
```

the result will be:

```json
{
  "type": "table",
  "data": [
    { "team.name": "team1", "count(user)": 25 },
    { "team.name": "team2", "count(user)": 5 }
  ]
}
```

In this case, the `team.name` acts as the key that groups aggregations together.
So `count(user)` finds the count of users relative to each team.

##### Multiple grouping keys

When there are return selectors that are
not aggregating functions, the aggregating functions will be performed
relative to the identifier that it is closer to in the traversal.

Example:

```j1ql
find
  bitbucket_project as project
    that relates to
  bitbucket_team as team
    that relates to
  bitbucket_user as user
return
  project.name, team.name, count(user)
```

The `count(user)` aggregation will be performed relative to
the team, because the `team` traversal is closer to the `user` traversal
in the query.

Example result:

```json
{
  "type": "table",
  "data": [
    { "project.name": "JupiterOne", "team.name": "team1", "count(user)": 25 },
    { "project.name": "JupiterOne", "team.name": "team2", "count(user)": 5 },
    { "project.name": "Windbreaker", "team.name": "team2", "count(user)": 5 }
  ]
}
```

If the `return` statement is changed to this:

```j1ql
return
  project.name, count(user)
```

The `count(user)` aggregation will be performed relative to the project.

Example result:

```json
{
  "type": "table",
  "data": [
    { "project.name": "JupiterOne", "count(user)": 50 },
    { "project.name": "Windbreaker", "count(user)": 5 }
  ]
}
```

##### Examples relative to a single entity

_Future development:_

If a selector is specified and an aggregating function is applied to
that selector's source identifier in some way,
aggregations will happen locally to the element.

Example:

```j1ql
find
  bitbucket_project as project
    that relates to
  bitbucket_team as team
    that relates to
  bitbucket_user as user
return
  project.name, count(project.aliases), team.name, count(user)
```

Example result:

```json
{
  "type": "table",
  "data": [
    {
      "project.name": "JupiterOne",
      "count(project.aliases)": 1,
      "team.name": "team1",
      "count(user)": 25
    },
    {
      "project.name": "JupiterOne",
      "count(project.aliases)": 1,
      "team.name": "team2",
      "count(user)": 5
    },
    {
      "project.name": "Windbreaker",
      "count(project.aliases)": 5,
      "team.name": "team2",
      "count(user)": 5
    }
  ]
}
```
