# JupiterOne Managed Integration for NPM

## Overview

JupiterOne provides a managed integration for NPM. The integration connects
directly to NPM REST APIs to obtain details on organizations, teams, users, and
packages.

## Integration Instance Configuration

Customers authorize access by creating an API token in your target NPM account
and providing that credential and the organization name to JupiterOne.

To create an NPM token with **Read Only** access, follow the instructions in the
[NPM documentation][1].

## Entities

The following entity resources are ingested when the integration runs.

| NPM Resources | \_type of the Entity | \_class of the Entity |
| ------------- | -------------------- | --------------------- |
| Organization  | `npm_organization`   | `Organization`        |
| Team          | `npm_team`           | `UserGroup`           |
| User          | `npm_user`           | `User`                |
| Package       | `npm_package`        | `CodeModule`          |

## Relationships

The following relationships are created:

| From               | Relationship | To            |
| ------------------ | ------------ | ------------- |
| `npm_organization` | **HAS**      | `npm_package` |
| `npm_organization` | **HAS**      | `npm_team`    |
| `npm_organization` | **HAS**      | `npm_user`    |
| `npm_team`         | **HAS**      | `npm_user`    |

The following relationships are mapped:

| From       | Relationship  | To           |
| ---------- | ------------- | ------------ |
| `CodeRepo` | **PUBLISHED** | `CodeModule` |

[1]: https://docs.npmjs.com/creating-and-viewing-authentication-tokens
