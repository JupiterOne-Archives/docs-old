# Integration with JupiterOne

## Overview

JupiterOne provides a managed integration for Google Cloud. The integration
connects directly to Google Cloud APIs to obtain metadata and analyze resource
relationships. Customers authorize access by creating a
[Google Cloud service account](https://cloud.google.com/iam/docs/creating-managing-service-accounts)
and providing the service account key to JupiterOne.

## Setup

A
[Google Cloud service account](https://cloud.google.com/iam/docs/creating-managing-service-accounts)
and a
[Google Cloud service account key](https://cloud.google.com/iam/docs/creating-managing-service-account-keys)
must be created in order to run the integration. The service account key is used
to authenticate on behalf of the integration's Google Cloud project and ingest
data into JupiterOne.

Google Cloud has most API services disabled by default. When a Google Cloud
service API is disabled, the JupiterOne integration will not ingest the data
from that API. The following Google Cloud service APIs that must be enabled to
ingest all of the supported data into JupiterOne:

| Service Name                                                                                                     | Service API                         |
| ---------------------------------------------------------------------------------------------------------------- | ----------------------------------- |
| [Service Usage](https://console.developers.google.com/apis/library/serviceusage.googleapis.com)                  | serviceusage.googleapis.com         |
| [Cloud Functions](https://console.developers.google.com/apis/library/cloudfunctions.googleapis.com)              | cloudfunctions.googleapis.com       |
| [Cloud Storage](https://console.developers.google.com/apis/library/storage.googleapis.com)                       | storage.googleapis.com              |
| [Identity and Access Management (IAM)](https://console.developers.google.com/apis/library/iam.googleapis.com)    | iam.googleapis.com                  |
| [Cloud Resource Manager](https://console.developers.google.com/apis/library/cloudresourcemanager.googleapis.com) | cloudresourcemanager.googleapis.com |
| [Cloud Engine](https://console.developers.google.com/apis/library/compute.googleapis.com)                        | compute.googleapis.com              |
| [Cloud Key Management Service (KMS)](https://console.developers.google.com/apis/library/cloudkms.googleapis.com) | cloudkms.googleapis.com             |

Google Cloud service APIs can be enabled using one of the following methods:

### Enabling Google Cloud Service API from Google Cloud Console

1. Click on the service name link that you'd like to enable from the table above
2. Select your Google Cloud project from the project dropdown menu
3. Click the "Enable" button

### Enabling Google Cloud Service API from `gcloud` CLI

Instructions on how to setup the
[`gcloud` CLI](https://cloud.google.com/sdk/gcloud) can be found in the
[JupiterOne Google Cloud integration developer documentation](https://github.com/JupiterOne/graph-google-cloud/blob/master/docs/development.md).

After setting up the [`gcloud` CLI](https://cloud.google.com/sdk/gcloud), you
can run the following command to enable all services that the JupiterOne
integration supports:

```
gcloud services enable \
  serviceusage.googleapis.com \
  cloudfunctions.googleapis.com \
  storage.googleapis.com \
  iam.googleapis.com \
  cloudresourcemanager.googleapis.com \
  compute.googleapis.com \
  cloudkms.googleapis.com \
  sqladmin.googleapis.com \
  bigquery.googleapis.com \
  dns.googleapis.com
```

### Creating Google Cloud project service account

- See the
  [Google Cloud service account documentation](https://cloud.google.com/iam/docs/creating-managing-service-accounts#creating)
  for more information on how to create a service account in the project that
  you would like to ingest data from.

We must assign the correct permissions to the newly created service account for
the integration to be run. We recommend using the following roles managed by
Google Cloud:

- [`roles/iam.securityReviewer`](https://cloud.google.com/iam/docs/understanding-roles#iam.securityReviewer)
- [`roles/iam.roleViewer`](https://cloud.google.com/iam/docs/understanding-roles#iam.roleViewer)

NOTE: You may also create a service account using the
[`gcloud` CLI](https://cloud.google.com/sdk/gcloud). There is documentation on
how to leverage the CLI in the
[JupiterOne Google Cloud integration developer documentation](https://github.com/JupiterOne/graph-google-cloud/blob/master/docs/development.md).

### Generate a service account key

- See the
  [Google Cloud service account key documentation](https://cloud.google.com/iam/docs/creating-managing-service-account-keys#creating_service_account_keys)
  for more information on how to create a service account key for the service
  account that you would like to ingest data using.

NOTE: You may also create a service account key using the
[`gcloud` CLI](https://cloud.google.com/sdk/gcloud). There is documentation on
how to leverage the CLI in the
[Google Cloud integration developer documentation](https://github.com/JupiterOne/graph-google-cloud/blob/master/docs/development.md).

### JupiterOne + Google Cloud Organization

A CLI is exposed from the
[`graph-google-cloud` project on GitHub](https://github.com/JupiterOne/graph-google-cloud)
that can be leveraged to create individual integration instances for every
project that is under a specific Google Cloud organization.

#### Install Dependencies

The following dependencies are needed in order to run the CLI:

- [Node.js](https://nodejs.org/en/)
- [Yarn package manager](https://yarnpkg.com/)
- [gcloud CLI](https://cloud.google.com/sdk/gcloud)

#### Running

The following shows all of the options that are exposed by the CLI.

```
JupiterOne Google Cloud Organization Integration Setup

Usage:
  $ JupiterOne Google Cloud Organization Integration Setup []

Commands:
  []  Default command: Run the organization setup

For more info, run any command with the `--help` flag:
  $ JupiterOne Google Cloud Organization Integration Setup --help

Options:
  --jupiterone-account-id <jupiteroneAccountId>             (Required) JupiterOne Account ID
  --jupiterone-api-key <jupiteroneApiKey>                   (Required) JupiterOne API Key
  --google-access-token <googleAccessToken>                 (Required) Google Cloud Access Token
  --organization-id [organizationId]                        (Optional) Array of organization IDs to collect projects from
  --project-id [projectId]                                  (Optional) Array of project IDs to create integration instances with
  --skip-project-id [projectId]                             (Optional) Array of project IDs to skip creating integration instances for
  --skip-system-projects [skipSystemProjects]               (Optional) Skips creation of any projects that have an ID that start with "sys-" (default: true)
  --rotate-service-account-keys [rotateServiceAccountKeys]  (Optional) Creates a new service account key for the JupiterOne service account and PUTs the JupiterOne integration instance (default: false)
  --skip-project-id-regex [skipProjectIdRegex]              (Optional) Project IDs discovered that match this regex will be skipped
  -h, --help                                                Display this message
```

Example usage to create integration instances for every project that is under a
Google Cloud organization

```sh
yarn jupiterone-organization-setup \
  --google-access-token $(gcloud auth print-access-token) \
  --organization-id 1111111111 \
  --jupiterone-account-id MY_JUPITERONE_ACCOUNT_ID_HERE \
  --jupiterone-api-key MY_JUPITERONE_API_KEY_HERE
```

Example usage to create integration instances for each project in multiple
Google Cloud organizations:

```sh
yarn jupiterone-organization-setup \
  --google-access-token $(gcloud auth print-access-token) \
  --organization-id 1111111111 \
  --organization-id 2222222222 \
  --jupiterone-account-id MY_JUPITERONE_ACCOUNT_ID_HERE \
  --jupiterone-api-key MY_JUPITERONE_API_KEY_HERE
```

Example usage to create integration instances for a selection of projects that
the authenticated Google Cloud user has access to:

```sh
yarn jupiterone-organization-setup \
  --google-access-token $(gcloud auth print-access-token) \
  --jupiterone-account-id MY_JUPITERONE_ACCOUNT_ID_HERE \
  --jupiterone-api-key MY_JUPITERONE_API_KEY_HERE \
  --project-id MY_GOOGLE_CLOUD_PROJECT_ID_HERE \
  --project-id MY_GOOGLE_CLOUD_PROJECT_ID_HERE_2 \
  --project-id MY_GOOGLE_CLOUD_PROJECT_ID_HERE_3
```

#### How it works

The following is the overall flow of how the CLI creates an integration instance
for each project:

- For every project in a GCP org
  - Enable relevant Google Cloud API services that the JupiterOne integration
    will interact with
  - Create a service account to be used by JupiterOne
  - Create a service account key for the new service account
  - Update the project’s IAM policy with the new service account as a member of
    the recommended roles/iam.securityReviewer to allow JupiterOne read access
    to relevant Google Cloud resources
  - Create a JupiterOne integration instance using the newly generated service
    account key file

<!-- {J1_DOCUMENTATION_MARKER_START} -->
<!--
********************************************************************************
NOTE: ALL OF THE FOLLOWING DOCUMENTATION IS GENERATED USING THE
"j1-integration document" COMMAND. DO NOT EDIT BY HAND! PLEASE SEE THE DEVELOPER
DOCUMENTATION FOR USAGE INFORMATION:

https://github.com/JupiterOne/sdk/blob/master/docs/integrations/development.md
********************************************************************************
-->

## Data Model

### Entities

The following entities are created:

| Resources                     | Entity `_type`                   | Entity `_class`     |
| ----------------------------- | -------------------------------- | ------------------- |
| Big Query Dataset             | `google_bigquery_dataset`        | `DataStore`         |
| Cloud API Service             | `google_cloud_api_service`       | `Service`           |
| Cloud Function                | `google_cloud_function`          | `Function`          |
| Cloud Storage Bucket          | `google_storage_bucket`          | `DataStore`         |
| Compute Disk                  | `google_compute_disk`            | `DataStore`, `Disk` |
| Compute Firewalls             | `google_compute_firewall`        | `Firewall`          |
| Compute Instance              | `google_compute_instance`        | `Host`              |
| Compute Networks              | `google_compute_network`         | `Network`           |
| Compute Project               | `google_compute_project`         | `Project`           |
| Compute Subnetwork            | `google_compute_subnetwork`      | `Network`           |
| DNS Managed Zone              | `google_dns_managed_zone`        | `DomainZone`        |
| IAM Role                      | `google_iam_role`                | `AccessRole`        |
| IAM Service Account           | `google_iam_service_account`     | `User`              |
| IAM Service Account Key       | `google_iam_service_account_key` | `AccessKey`         |
| IAM User                      | `google_user`                    | `User`              |
| KMS Crypto Key                | `google_kms_crypto_key`          | `Key`, `CryptoKey`  |
| KMS Key Ring                  | `google_kms_key_ring`            | `Vault`             |
| Project                       | `google_cloud_project`           | `Account`           |
| SQL Admin MySQL Instance      | `google_sql_mysql_instance`      | `Database`          |
| SQL Admin Postgres Instance   | `google_sql_postgres_instance`   | `Database`          |
| SQL Admin SQL Server Instance | `google_sql_sql_server_instance` | `Database`          |

### Relationships

The following relationships are created/mapped:

| Source Entity `_type`        | Relationship `_class` | Target Entity `_type`            |
| ---------------------------- | --------------------- | -------------------------------- |
| `internet`                   | **ALLOWS**            | `google_compute_firewall`        |
| `google_cloud_project`       | **HAS**               | `google_cloud_api_service`       |
| `google_compute_firewall`    | **PROTECTS**          | `google_compute_network`         |
| `google_compute_instance`    | **TRUSTS**            | `google_iam_service_account`     |
| `google_compute_instance`    | **USES**              | `google_compute_disk`            |
| `google_compute_network`     | **CONTAINS**          | `google_compute_subnetwork`      |
| `google_compute_network`     | **HAS**               | `google_compute_firewall`        |
| `google_compute_project`     | **HAS**               | `google_compute_instance`        |
| `google_compute_subnetwork`  | **HAS**               | `google_compute_instance`        |
| `google_iam_service_account` | **ASSIGNED**          | `google_iam_role`                |
| `google_iam_service_account` | **HAS**               | `google_iam_service_account_key` |
| `google_kms_key_ring`        | **HAS**               | `google_kms_crypto_key`          |
| `google_user`                | **ASSIGNED**          | `google_iam_role`                |

<!--
********************************************************************************
END OF GENERATED DOCUMENTATION AFTER BELOW MARKER
********************************************************************************
-->
<!-- {J1_DOCUMENTATION_MARKER_END} -->