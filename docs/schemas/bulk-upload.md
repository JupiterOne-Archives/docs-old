# JupiterOne Bulk Upload Schema

> IMPORTANT: Bulk upload triggers a data synchronization process that
> automatically **updates** or **deletes** entities/relationships as needed.
> Therefore, the upload file should always include the **complete** set of
> entities or relationships within the defined `_scope` to avoid unintended data
> deletion.

To successfully upload entity and relationship data, follow the schema outlined below:

```json
{
  "entities": [
    {
      "_key": "1",
      "_type": "bulk_upload_entity",
      "_class": "EntityClass",
      "_scope": "user-defined-scope",
      "displayName": "Entity's displayName to show in UI",
      "owner": "Owner's name"
      // ...any other properties defined for the given type/class
    },
    {
      "_key": "2",
      "_type": "bulk_upload_entity",
      "_class": "EntityClass",
      "_scope": "user-defined-scope",
      "displayName": "Entity's displayName to show in UI",
      "owner": "Owner's name"
      // ...any other properties defined for the given type/class
    },
  ],
  "relationships": [
    {
      "_key": "a",
      "_type": "bulk_upload_relationship",
      "_class": "VERB",
      "_scope": "user-defined-scope",
      "_fromEntityKey": "1",
      "_toEntityKey": "2"
    },
        {
      "_key": "b",
      "_type": "bulk_upload_relationship",
      "_class": "VERB",
      "_scope": "user-defined-scope",
      "_fromEntityKey": "2",
      "_toEntityKey": "1"
    },
  ]
}
```

## Entity Properties

| Property | Type     | Description                                                                      |
| -------- | -------- | -------------------------------------------------------------------------------- |
| `_key`   | `string` | A unique identifier/key for this entity within the scope defined by `_scope`.    |
| `_type`  | `string` | User defined type for this entity. Value should be in `snake_case`.              |
| `_class` | `string` or `string[]` | The defined class for this entity. Value should be in `TitleCase`. |
| `_scope` | `string` | The scope is used to identity entities to update/delete during diffing. Previously existing entities within the same `_scope` that no longer exist in the latest upload will be marked for deletion. |
| `owner`  | `string` | Identifier for the person/thing responsible for this entity.                     |

> Properties with `_` prefix are reserved as JupiterOne system internal metadata
> properties. Other than `_key`, `_type`, `_class` as listed above, any other
> property beginning with `_` will be ignored when processing the upload.

## Relationship Properties

| Property         | Type     | Description                                                               |
| ---------------- | -------- | ------------------------------------------------------------------------- |
| `_key`           | `string` | Globally unique id for this relationship.                                 |
| `_type`          | `string` | User defined type for this relationship. Value should be in `snake_case`. |
| `_class`         | `string` | Relationship class. Typically a third-person singular verb such as `HAS` or `MANAGES` or `ALLOWS`. Value should be in `CAPS`. |
| `_scope`         | `string` | The scope is used to identity relationships to update/delete during diffing. Previously existing relationships within the same `_scope` that no longer exist in the latest upload will be marked for deletion. |
| `_fromEntityKey` | `string` | The unique key for the entity on the "from" side of this relationship.    |
| `_toEntityKey`   | `string` | The unique key for the entity on the "to" side of this relationship.      |

> Properties with `_` prefix are reserved as JupiterOne system internal metadata
> properties. Other than `_key`, `_type`, `_class`, `_fromEntityKey`, and
> `_toEntityKey` as listed above, any other property beginning with `_` will be
> ignored when processing the upload.
