# JupiterOne Entity Relationship Mappings

JupiterOne stores [entities and relationships][1] representing your
organization's critical resources, their configurations, and their
relationships. Relationships between entities may be explicitly stated in the
APIs of the systems that manage them, and the integrations with those systems
will leverage that information to build relationships in JupiterOne. In other
cases, relationships need to be inferred from properties common to a set of
related entities. This inference can extend across entities from multiple
systems so that relationships can be automatically mapped, given enough context
about how entities are related through their common properties. In some cases,
entities will be generated to represent a resource that doesn't exist as an
expicit thing in your systems, but is implied, such as the Internet.

Entity relationship mappings provide the context necessary to support this
automatic relationship building.

## How Does It Work

Mapping rules are maintained by the JupiterOne engineering team; they cannot be
modified by customers today. However, it is still important to understand how
the mapping rules work because:

1. Entities and relationships that mappings produce will exist in your data,
   though you will not be billed for these
1. Knowing about mappings allows you to leverage the entities and relationships
   they produce in J1 queries
1. Some mappings require customers to add properties to entities so that
   relationships can be inferred

As entities are created and updated, the system will check to see if the entity
matches a mapping rule. This entity is considered the source of the relationship
to build. The target of the relationship is determined by performing a search
according to the mapping's target filter parameters. When more than one entity
matches the target filter, a relationship is established between the source and
each target entity. No relationship is created when a target is not found. A
single target entity will be created when no existing entities match, unless
`skipTargetCreation: true`.

The mapping specifies the properties to transfer to a target created by the
mapper. The values of those properties may be static, being explicitly defined
in the rule, or the values may be transferred from the source entity. When
multiple mapping rules resolve to the same mapper-created target entity, the
target entity will accumulate the properties. This allows for a target to
include properties from any mapped source entity.

The mapper will produce operations to create, update, or delete the target
entities and relationships it manages. The entities produced by the mapper may
themselves match a mapping rule, leading to a cascading effect that builds a
graph of relationships.

Try this J1QL query to see entities produced by the mapper in your J1 account:

```j1ql
FIND * WITH _source="system-mapper" LIMIT 10
```

This query will show some relationships it created:

```j1ql
FIND * THAT RELATES TO AS r Root
WHERE r._source="system-mapper"
RETURN r.* LIMIT 10
```

## Example Use Cases

### Identifying Accounts That Belong to a Person

Integrations with an identity provider have mapping rules that cause the mapper
to produce a `Person` entity when the users of the IdP have properties that
identify the record as a real person, not a bot or service account. Once that
`Person` entity exists, whenever a `User` entity is produced by any system, the
`User` will be related to the `Person` as well when there are properties that
identify the account with the `Person`, such as an `email` or `username`.

If you have an IdP integration configured, such as Okta or OneLogin, you may
find user accounts that belong to a person:

```j1ql
FIND User AS u THAT RELATES TO Person AS p
RETURN u.email, u._type, u.displayName, p.employeeType
LIMIT 5
```

## Relationship Mapping Rules

Mapping rules are maintained by the JupiterOne engineering team, but it is
instructive to see that rules take this basic form:

```json
{
  "sourceFilter": {
    "_class": "Person"
  },
  "relationshipProperties": {
    "_class": "IS"
  },
  "relationshipDirection": "REVERSE",
  "targetFilterKeys": [["_class", "email"], ["_class", "username"]],
  "propertyMappings": [
    {
      "sourceProperty": "email",
      "targetProperty": "email"
    },
    {
      "sourceProperty": "email",
      "targetProperty": "username"
    },
    {
      "targetValue": "User",
      "targetProperty": "_class"
    }
  ],
  "skipTargetCreation": true
}
```

- `"sourceFilter"`: Declares the properties of the source entity that the rule
  matches

- `"relationshipProperties"`: Declares the properties to place on generated
  relationships

- `"relationshipDirection"`: Declares the directionality of the relationship

- `"targetFilterKeys"`: Declares the properties to query when resolving the
  target entities

- `"propertyMappings"`: Declares the properties to assign to target entities
  created by the mapper and provides the values used to search for the target
  entities

- `"skipTargetCreation"`: Instructs the mapper to avoid creating the target
  entity when none already exist

## Mappings

The current mappings are summarized below. The _Global Mappings_ apply to
entities no matter how they are produced, whether by a managed integration or
through the JupiterOne API. Each managed integration may also specify mappings
that are applied only to entities managed by that integration.

The summaries have a title taking the form `SOURCE RELATIONSHIP TARGET`.

* `SOURCE` is always the entity that triggers the mapping configuration. The
  label is the `_class` or `_type` that will be matched. Other match properties
  are listed in the summary body.
* `RELATIONSHIP` is relative to `SOURCE`, and the label of comes from the
  `_class`. 
  * Forward: `-CLASS->`
  * Reverse: `<-CLASS-`
* `TARGET` is determined by a search, or one will be created when not found
  (unless `skipTargetCreation: true`). The label is the `_class` or `_type` that
  will be matched. Other match properties are listed in the summary body.
  
It is important to remember:

* Mapping rules are triggered when a `SOURCE` entity matches. Rules are NOT
  automatically reversed so that relationships are updated when a `TARGET` is
  created/updated.
* Any change to the `SOURCE` entity triggers the mapping rule to be
  evaluated/re-evaluated.
* The **Source Filters** must match an entity or the rule will not trigger. It
  may be necessary to _add properties to entities_ at the data source so that
  when they are ingested they will match the rule.
* A rule produces relationships to all `TARGET` entities matching the **Target
  filters**. It may be necessary to _add properties to entities_ at the data
  source so that when they are ingested they will match the rule.
* **Transferred Properties** are listed only when the mapper will create a
  target entity if none are found (`skipTargetCreation: false`).

### Mappings Rules

- [Global Mapping Rules](../data-model/mappings-global.md)
- [Integration Specific Mapping Rules](../data-model/mappings-integrations.md)

[1]: ../jupiterone-data-model.md