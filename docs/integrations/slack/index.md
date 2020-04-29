# Integration with JupiterOne

## Data Model

### Entities

The following entity resources are ingested when the integration runs:

| Resources | \_type of the Entity | \_class of the Entity |
| --------- | -------------------- | --------------------- |
| User      | `slack_user`         | `User`                |
| Channel   | `slack_channel`      | `Channel`             |

### Relationships

The following relationships are created/mapped:

| From            | Edge    | To           |
| --------------- | ------- | ------------ |
| `slack_channel` | **HAS** | `slack_user` |
