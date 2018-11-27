# Bitbucket Integration Details

## Overview

JupiterOne provides a managed integration with Bitbucket. The integration
connects directly to Bitbucket APIs to obtain account metadata and analyze
resource relationships. Customers authorize access by creating a Bitbucket OAuth
App in their account and providing the app credentials to JupiterOne.

## Integration Instance Configuration

The integration is triggered by an event containing the information for a
specific integration instance.

The integration instance configuration requires the customer's Bitbucket OAuth
App `clientId` and `clientSecret` to authenticate requests to the Bitbucket REST
APIs. The integration requires Read access to the target Account, Team
Membership, Projects, and Repositories. See the following screenshot for an
example configuration within a Bitbucket Team Settings, note the required and
optional settings.

![BitBucket OAuth Example Config][1]

[1]: ../assets/integration-bitbucket-oauth-consumer-settings.png

## Entities

The following entity resources are ingested when the integration runs:

| Bitbucket Entity Resource | _type : _class of the Entity
| -----------               | -----------
| Team                      | `bitbucket_team`   : `Account`
| Project                   | `bitbucket_project`: `Project`
| Repository                | `bitbucket_repo`   : `CodeRepo`
| User                      | `bitbucket_user`   : `User`

## Relationships

The following relationships are created/mapped:

### Basic relationships within the integration instance account/resources

|
| --
| `bitbucket_team` **HAS** `bitbucket_project`
| `bitbucket_team` **HAS** `bitbucket_user`
| `bitbucket_project` **HAS** `bitbucket_repo`