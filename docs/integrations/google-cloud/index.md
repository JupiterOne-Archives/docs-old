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
  cloudkms.googleapis.com
```

### Creating Google Cloud project service account

- See the
  [Google Cloud service account documentation](https://cloud.google.com/iam/docs/creating-managing-service-accounts#creating)
  for more information on how to create a service account in the project that
  you would like to ingest data from.

- We must assign the correct permissions to the newly created service account
  for the integration to be run. We recommend using the
  [`roles/iam.securityReviewer`](https://cloud.google.com/iam/docs/understanding-roles#iam.securityReviewer)
  role, which is managed by Google Cloud.

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

| Resources               | Entity `_type`                   | Entity `_class`     |
| ----------------------- | -------------------------------- | ------------------- |
| Cloud API Service       | `google_cloud_api_service`       | `Service`           |
| Cloud Function          | `google_cloud_function`          | `Function`          |
| Cloud Storage Bucket    | `google_storage_bucket`          | `DataStore`         |
| Compute Disk            | `google_compute_disk`            | `DataStore`, `Disk` |
| Compute Firewalls       | `google_compute_firewall`        | `Firewall`          |
| Compute Instance        | `google_compute_instance`        | `Host`              |
| Compute Networks        | `google_compute_network`         | `Network`           |
| Compute Subnetwork      | `google_compute_subnetwork`      | `Network`           |
| IAM Role                | `google_iam_role`                | `AccessRole`        |
| IAM Service Account     | `google_iam_service_account`     | `User`              |
| IAM Service Account Key | `google_iam_service_account_key` | `AccessKey`         |
| IAM User                | `google_user`                    | `User`              |
| KMS Crypto Key          | `google_kms_crypto_key`          | `Key`, `CryptoKey`  |
| KMS Key Ring            | `google_kms_key_ring`            | `Vault`             |

### Relationships

The following relationships are created/mapped:

| Source Entity `_type`        | Relationship `_class` | Target Entity `_type`            |
| ---------------------------- | --------------------- | -------------------------------- |
| `internet`                   | **ALLOWS**            | `google_compute_firewall`        |
| `google_compute_firewall`    | **PROTECTS**          | `google_compute_network`         |
| `google_compute_instance`    | **TRUSTS**            | `google_iam_service_account`     |
| `google_compute_instance`    | **USES**              | `google_compute_disk`            |
| `google_compute_network`     | **CONTAINS**          | `google_compute_subnetwork`      |
| `google_compute_network`     | **HAS**               | `google_compute_firewall`        |
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
