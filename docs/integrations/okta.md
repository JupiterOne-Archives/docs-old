# Okta Data and Integration Details

## Overview

JupiterOne provides a managed integration with Okta. The integration connects
directly to Okta APIs to obtain account metadata and analyze resource
relationships. Customers authorize access by creating an API token in your
target Okta account and providing that credential to JupiterOne.

## Integration Instance Configuration

The integration is triggered by an event containing the information for a
specific integration instance.

Instructions on creating an API token within your Okta account can be found
[here][1].

[1]: https://developer.okta.com/docs/api/getting_started/getting_a_token

## Entities

The following entity resources are ingested when the integration runs:

| GitHub Entity Resource | _type : _class of the Entity
| -----------            | -----------
| Account                | `okta_account`     : `Account`
| Application            | `okta_application` : `Application`
| Group                  | `okta_group`       : `Group`
| User                   | `okta_user`        : `User`

## Relationships

The following relationships are created/mapped:

### Basic relationships within the integration instance account/resources

|
| --
| `okta_account` **HAS** `okta_application`
| `okta_account` **HAS** `okta_group`
| `okta_group`   **HAS** `okta_user`
| `okta_group` **ASSIGNED** `okta_application`
| `okta_user`  **ASSIGNED** `okta_application`
