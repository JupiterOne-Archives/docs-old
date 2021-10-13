# Get Started with Search

You can quickly search and get insight across your entire digital environment
integrated with JupiterOne, from the Search for Anything landing page. 
There are three modes of search:

1. **Ask questions** by entering any keywords to search across all packaged 
   and saved questions.
2. Perform a **full-text search** across all assets based on their property values.
3. Use the **JupiterOne query language (J1QL)** for detailed querying of 
   assets and relationships

You can toggle results in four different display modes: **Table**, **Graph**, **Raw JSON**, 
or **Pretty JSON**.

_Note that for performance reasons, search results are limited to return up to
250 items. If you believe something is missing from a large result set, try
tuning the query to generate more precise results._

## Ask Questions

Just start typing any keyword (or combination of keywords) such as these
(without quotes):

- compliance
- access
- traffic
- ssh
- data encrypted
- production

Or ask a question like:

- Who are my vendors?
- What lambda functions do I have in AWS?
- What is connected to the Internet?
- Who has access to ...?

## Full Text Search

Put your keywords in quotes (e.g. "keyword") to start a full text search.
Or simply type in your keywords and hit "Enter".
For example,

- "sg-123ab45c" will find an AWS EC2 Security Group with that group ID
- "Charlie" will find a Person and/or User with that first name, and potentially
  other resources related to that person/user
- "jupiterone database" will find Database entities with property values that
  include the keyword "jupiterone"

## JupiterOne Query Language (J1QL)

The JupiterOne Query Language (J1QL) is used here for searching for anything
across all of your entities and relationships.

Here's the basic query structure:

- Start with an entity:

  `FIND {class or type of an Entity}`

- Optionally add some property filters:

  `WITH {property}={value} AND|OR {property}={value}`

- Get its relationships:

  `THAT {relationship_verb}|RELATES TO {class/type of another Entity}`

For example:

```j1ql
FIND * WITH tag.Production='true'
```

(note the wildcard `*` above to include everything)

```j1ql
FIND User THAT IS Person
```

If you don't know the exact relationship, you can just use the keyword
`RELATES TO` to cover any/all relationship:

```j1ql
FIND User THAT RELATES TO Person
```

You can name an entity or relationship with an alias with the `AS {something}`.
The alias can then be used in `WHERE` for additional filtering or comparison, or
in `RETURN` for returning specific properties.

For example:

```j1ql
FIND Firewall AS fw
  THAT ALLOWS AS rule (Network|Host) AS n
WHERE
  rule.ingress=true and rule.fromPort=22
RETURN
  fw._type, fw.displayName, fw.tag.AccountName,
  n._type, n.displayName, n.tag.AccountName
```

The query language is case insensitive except for the following:

- `TitleCase` Entity keyword after `Find` and the `{relationship verb}` will
  search for entities of that **Class**. (e.g. `CodeRepo`)
- `lowercase` Entity keyword after `Find` and the `{relationship verb}` will
  search for entities of that **Type**. An entity type with more than one word
  is generally in `snake_case`. (e.g. `github_repo`)
- Entity property names and values, and alias names defined as part of the query,
  are case sensitive.

Checkout the [J1QL query tutorial][1] and the [complete J1QL documentation][2]
with more advanced examples.

[1]: ./tutorial-j1ql.md
[2]: ../docs/jupiterone-query-language.md

## Combining full text search with J1QL

You can also start with a full text search and then use J1QL to further filter
the results from the initial search. For example:

```j1ql
Find "Administrator" with _class='AccessPolicy' that ASSIGNED (User|AccessRole)
```

```j1ql
Find 'security officer' with _type='employee'
```

```j1ql
Find 'roles responsibilities' with _class=('Policy' or 'Procedure')
```

Note that either single quotes (`'`) or double quotes (`"`) will work for both
full text search keywords and property string values.
