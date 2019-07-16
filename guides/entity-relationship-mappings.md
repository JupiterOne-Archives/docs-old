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
according to the mapping's target filter parameters. No relationship is created
when a target is not found.

When more than one entity matches the target filter, a relationship is
established between the source and each target entity.

The target entity will be updated to include properties defined by the mapping
rule. The values of those properties may be static, being explicitly defined in
the rule, or the values may be transferred from the source entity. When multiple
mapping rules resolve to the same target entity, the target entity will
accumulate the properties. This allows for a target to include properties from
any mapped source entity.

The mapper will produce operations to create, update, or delete the target
entities and relationships it manages. The entities produced by the mapper may
themselves match a mapping rule, leading to a cascading effect that builds a
graph of relationships.

Try this J1QL query to see entities produced by the mapper in your J1 account:

`FIND * WITH _source="system-mapper" LIMIT 10`

This query will show some relationships it created:

`FIND * THAT RELATES TO AS r Root WHERE r._source="system-mapper" RETURN r.* LIMIT 10`

Integrations with an identity provider have mapping rules that cause the mapper
to produce a `Person` entity when the users of the IdP have properties that
identify the record as a real person, not a bot or service account. Once that
`Person` entity exists, whenever a `User` entity is produced by any system, the
`User` will be related to the `Person` as well when there are properties that
identify the account with the `Person`, such as an `email` or `username`.

If you have an IdP integration configured, such as Okta or OneLogin, you may
find user accounts that belong to a person:

```
FIND User AS u THAT RELATES TO Person AS p
RETURN u.email, u._type, u.displayName, p.employeeType
LIMIT 5
```

### Relationship Mapping Rules

Mapping rules take this basic form:

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

- `"propertyMappings"`: Declares the properties to assign to target entities and
  provides the values used to search for the target entities

- `"skipTargetCreation"`: Instructs the mapper to avoid creating the target
  entity when it does not already exist

#### Mappings

The mappings are documented here because they are not currently visible in the
system.

[1]: ../docs/jupiterone-data-model.md
