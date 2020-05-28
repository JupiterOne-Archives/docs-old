# JupiterOne Bulk Upload Schema

To successfully upload entity and relationship data, follow the schema outlined below:

```json
{
  "entities": [
    {
      "_key": "1",
      "_type": "bulk_upload_entity",
      "_class": "any_class",
      "owner": "Owner's name"
      // ...any other properties defined for the given type/class
    },
    {
      "_key": "2",
      "_type": "bulk_upload_entity",
      "_class": "any_class",
      "owner": "Owner's name"
      // ...any other properties defined for the given type/class
    },
  ],
  "relationships": [
    {
      "_key": "a",
      "_type": "bulk_upload_relationship",
      "_fromEntityKey": "1",
      "_toEntityKey": "2"
    },
        {
      "_key": "b",
      "_type": "bulk_upload_relationship",
      "_fromEntityKey": "2",
      "_toEntityKey": "1"
    },
  ]
}
```

## Entity Properties

| Property           | Type              | Description                                                                                                                                                         |
| ------------------ | ----------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `_key`               | `string`          | globally unique id for this entity.                                                                                                        |
| `_type`          | `string`          | User defined type for this entity.                                                                                           |
| `_class`             | `string`          | The defined class for this entity.                                                                                                                   |
| `_owner`     | `string`          | Identifier for the person/thing responsible for this entity.                                                                                                                                         |

## Relationship Properties

| Property           | Type              | Description                                                                                                                                                         |
| ------------------ | ----------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `_key`               | `string`          | Globally unique id for this relationship.                                                                                                        |
| `_type`          | `string`          | User defined type for this relationship.                                                                                             |
| `_fromEntityKey_`             | `string`          | The unique key for the entity on the "from" side of this relationship.                                                                                                                  |
| `_toEntityKey`     | `string`          | The unique key for the entity on the "to" side of this relationship.                                                                                                                                 |
