# GitHub Integration Details

## Overview

JupiterOne provides a managed integration with GitHub. The integration connects
directly to GitHub APIs to obtain account metadata and analyze resource
relationships. Customers authorize access by creating a GitHub OAuth App in
their account and providing the app credentials to JupiterOne.

## Integration Instance Configuration

The integration is triggered by an event containing the information for a
specific integration instance.

The integration instance configuration requires the customer's GitHub OAuth App
`clientId` and `clientSecret` to authenticate requests to the GitHub REST APIs.
[Detailed instructions for creating the OAuth App][1] are provided by GitHub.

[1]: https://developer.github.com/apps/building-oauth-apps/creating-an-oauth-app/

## Entities

The following entity resources are ingested when the integration runs:

| GitHub Entity Resource | _type : _class of the Entity
| -----------            | -----------
| Repository             | `github_repo`: `CodeRepo`
| User                   | `github_user`: `User`

## Relationships

The following relationships are created/mapped:

### Basic relationships within the integration instance account/resources

|
| --
| `github_account` **OWNS** `github_repo`
| `github_account` **HAS** `github_user`
