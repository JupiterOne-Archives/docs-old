# Get started with search

You can quickly search and get insight across your entire digital environment
integrated with JupiterOne, right here from the Landing Zone. There are three
modes of search:

1. **Keywords search** to ask saved/packaged questions
2. **Full text search** across all entities based on their property values
3. **JupiterOne query language (J1QL)** for precise querying of entities and relationships

Results can be toggled in four different display modes: **Table**, **Graph**,
**Raw JSON**, or **Pretty JSON**.

_Note that for performance reasons, search results are limited to return up to
250 items. If you believe something is missing from a large result set, try
tuning the query to generate more precise results._

## Keywords Search

Just start typing any keyword such as (without quotes):

- compliance
- access
- traffic

Or ask a question like:

- Who are my vendors?
- What lambda functions do I have in AWS?
- What is connected to the Internet?
- Who have access to ...?

## Full Text Search

Put your keywords in quotes ("keyword") to start a full text search. For example,

- "0123456789012" will likely find an AWS Account entity with that account ID
- "sg-123ab45c" will find an AWS EC2 Security Group with that group ID
- "Charlie" will find a Person and/or User with that first name

## JupiterOne Query Language (J1QL)

The JupiterOne Query Language (J1QL) is used here for searching for anything
across all of your entities and relationships.

To start, understand this the basic query structure:

```j1ql
FIND {class or type of Entity1} AS {alias1}
  WITH {property}={value} AND|OR {property}={value}
  THAT {relationship_verb} {class or type of Entity2} AS {alias2}
  WHERE {alias1}.{property} = {alias2}.{property}
```

For example:

- `Find User that IS Person`
- `Find Firewall that ALLOWS as rule (Network|Host) where rule.ingress=truee and rule.fromPort=22`
- `Find * with tag.Production='true'` (note the wildcard `*` here)

The query language is case insensitive except for the following:

- `TitleCase` Entity keyword after `Find` and the `{relationship verb}` will
  search for entities of that **Class**. (e.g. `CodeRepo`)
- `lowercase` Entity keyword after `Find` and the `{relationship verb}` will
  search for entities of that **Type**. An entity type with more than one word
  is generally in `snake_case`. (e.g. `github_repo`)
- Entity property names and values, and alias names defined as part of the query,
  are case sensitive.

The complete J1QL documentation with advanced examples can be found [here][1].

[1]: ../docs/jupiterone-query-language.md

## Combining full text search with J1QL

You can also start with a full text search and then use J1QL to further filter
the results from the initial search. For example:

```j1ql
"Administrator" with _class='AccessPolicy' that ASSIGNED (User|AccessRole)
```