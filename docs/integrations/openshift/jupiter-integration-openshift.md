# Openshift

## Overview

JupiterOne provides a managed integration with Openshift. The integration
connects directly to Openshift APIs to obtain cluster metadata and analyze
resource relationships.

## Integration Instance Configuration

Authentication is currently designed to use a Service Account.

Login as admin:

```bash
oc login -u system:admin
```

Create service account:

```bash
oc create sa jupiterone
oc adm policy add-cluster-role-to-user cluster-reader -z jupiterone
```

Get service account token:

```bash
oc serviceaccounts get-token jupiterone
```

The integration instance configuration requires the cluster address and service
account token.

## Entities

The following entity resources are ingested when the integration runs:

| Openshift Resource | \_type of the Entity        | \_class of the Entity |
| ------------------ | --------------------------- | --------------------- |
| Account            | `openshift_account`         | `Account`             |
| Container          | `openshift_container`       | `Task`                |
| Group              | `openshift_user_group`      | `UserGroup`           |
| Pod                | `openshift_pod`             | `Task`                |
| Project            | `openshift_project`         | `Project`             |
| Route              | `openshift_route`           | `Domain`              |
| Service Account    | `openshift_service_account` | `User`                |
| Service            | `openshift_service`         | `Task`                |
| User               | `openshift_user`            | `User`                |

## Relationships

The following relationships are created/mapped:

| From                | Edge         | To                          |
| ------------------- | ------------ | --------------------------- |
| `openshift_account` | **HAS**      | `openshift_user_group`      |
| `openshift_account` | **HAS**      | `openshift_project`         |
| `openshift_project` | **HAS**      | `openshift_route`           |
| `openshift_project` | **HAS**      | `openshift_service_account` |
| `openshift_project` | **HAS**      | `openshift_service`         |
| `openshift_pod`     | **HAS**      | `openshift_container`       |
| `openshift_route`   | **EXTENDS**  | `openshift_service`         |
| `openshift_service` | **HAS**      | `openshift_pod`             |
| `openshift_user`    | **ASSIGNED** | `openshift_user_group`      |
