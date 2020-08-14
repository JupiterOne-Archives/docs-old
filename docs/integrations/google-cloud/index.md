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
[Google Cloud integration developer documentation](https://github.com/JupiterOne/graph-google-cloud/blob/master/docs/development.md).

### Generate a service account key

- See the
  [Google Cloud service account key documentation](https://cloud.google.com/iam/docs/creating-managing-service-account-keys#creating_service_account_keys)
  for more information on how to create a service account key for the service
  account that you would like to ingest data using.

NOTE: You may also create a service account key using the
[`gcloud` CLI](https://cloud.google.com/sdk/gcloud). There is documentation on
how to leverage the CLI in the
[Google Cloud integration developer documentation](https://github.com/JupiterOne/graph-google-cloud/blob/master/docs/development.md).

## Data Model

### Entities

Provide a table that maps concepts from the provider to the `_type` and `_class`
generated.

| Resources            | \_type of the Entity             | \_class of the Entity |
| -------------------- | -------------------------------- | --------------------- |
| Cloud Function       | `google_cloud_function`          | `Function`            |
| Cloud Storage Bucket | `google_storage_bucket`          | `DataStore`           |
| Cloud API Service    | `google_cloud_api_service`       | `Service`             |
| IAM Role             | `google_iam_role`                | `AccessRole`          |
| IAM Service Account  | `google_iam_service_account`     | `User`                |
| IAM Service Account  | `google_iam_service_account_key` | `AccessKey`           |
| IAM User             | `google_user`                    | `User`                |

### Relationships

The following relationships are created/mapped:

| From                         | Edge         | To                               |
| ---------------------------- | ------------ | -------------------------------- |
| `google_iam_service_account` | **HAS**      | `google_iam_service_account_key` |
| `google_iam_service_account` | **ASSIGNED** | `google_iam_role`                |
| `google_user`                | **ASSIGNED** | `google_iam_role`                |
