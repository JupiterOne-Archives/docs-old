# CrowdStrike Falcon

## Overview

The integration connects directly to CrowdStrike Falcon APIs to obtain account
metadata and analyze resource relationships. Customers authorize access by
creating Client API credentials in their CrowdStrike Falcon account and
providing those credentials when setting up an instance of the integration in
JupiterOne.

## API Authentication

CrowdStrike Falcon provides [detailed instructions on creating an API
credentials][1].

## Entities

These entities are ingested when the integration runs:

| Example Entity Resource | \_type : \_class of the Entity                    |
| ----------------------- | ------------------------------------------------- |
| Account                 | `crowdstrike_account` : `Account`                 |
| Service                 | `crowdstrike_endpoint_protection` : `Service`     |
| Device Sensor Agent     | `crowdstrike_sensor` : `HostAgent`                |
| Prevention Policy       | `crowdstrike_prevention_policy` : `ControlPolicy` |

Only hosts that have been seen within past 30 days are maintained.

## Relationships

The following relationships are created/mapped:

| Relationships                                                                  |
| ------------------------------------------------------------------------------ |
| `crowdstrike_account` **HAS** `crowdstrike_sensor`                             |
| `crowdstrike_account` **HAS** `crowdstrike_endpoint_protection`                |
| `crowdstrike_prevention_policy` **ENFORCES** `crowdstrike_endpoint_protection` |
| `crowdstrike_sensor` **ASSIGNED** `crowdstrike_prevention_policy`              |
| `crowdstrike_sensor` **PROTECTS** `user_endpoint`                              |

[1]: https://www.crowdstrike.com/blog/tech-center/get-access-falcon-apis/