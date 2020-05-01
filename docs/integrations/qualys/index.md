# Integration with JupiterOne

## Setup

The Qualys API requires usage of a username and password associated with a user.
Also, by default, trial users do not have access to the Qualys API so you must
request access to the API.

After testing for quite a bit, this integration was unable to ingest host
findings with the built-in READER role event after adding all of the modules.
This may be related to parts of the Qualys "host detection" feature being
controlled by a license setting.

## Data Model

### Entities

Provide a table that maps concepts from the provider to the `_type` and `_class`
generated.

| Resources       | \_type of the Entity     | \_class of the Entity |
| --------------- | ------------------------ | --------------------- |
| Host            | `qualys_host`            | `Host`                |
| Host Finding    | `qualys_host_finding`    | `Finding`             |
| Web App         | `qualys_web_app`         | `Application`         |
| Web App Finding | `qualys_web_app_finding` | `Finding`             |
| Vulnerability   | `qualys_vuln`            | `Vulnerability`       |

### Relationships

The following relationships are created/mapped:

| From                     | Edge    | To                       |
| ------------------------ | ------- | ------------------------ |
| `qualys_host`            | **HAS** | `qualys_host_finding`    |
| `qualys_host_finding`    | **IS**  | `qualys_vuln`            |
| `qualys_web_app`         | **HAS** | `qualys_web_app_finding` |
| `qualys_web_app_finding` | **IS**  | `qualys_vuln`            |
