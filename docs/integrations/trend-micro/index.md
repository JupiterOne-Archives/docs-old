# Integration with JupiterOne

## Setup

JupiterOne provides a managed integration for Trend Micro Deep Security. The
integration connects directly to Trend Micro REST APIs to obtain configuration
metadata and analyze resource relationships.

## Data Model

### Entities

The following entity resources are ingested when the integration runs:

| Resources          | \_type of the Entity             | \_class of the Entity |
| ------------------ | -------------------------------- | --------------------- |
| Administrator      | `trend_micro_administrator`      | `User`                |
| Administrator Role | `trend_micro_administrator_role` | `AccessRole`          |
| API Key            | `trend_micro_api_key`            | `Key`                 |
| Computer           | `trend_micro_computer`           | `Host`                |
| Computer Group     | `trend_micro_computer_group`     | `Group`               |

### Relationships

The following relationships are created/mapped:

| From                         | Edge         | To                               |
| ---------------------------- | ------------ | -------------------------------- |
| `trend_micro_computer_group` | **HAS**      | `trend_micro_computer`           |
| `trend_micro_administrator`  | **ASSIGNED** | `trend_micro_administrator_role` |
