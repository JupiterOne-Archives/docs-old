# Integration with JupiterOne

## Setup

JupiterOne provides a managed integration for GitLab. The integration connects
directly to GitLab API to obtain configuration metadata and analyze resource
relationships.

### Entities

Provide a table that maps concepts from the provider to the `_type` and `_class`
generated.

| Resources     | \_type of the Entity   | \_class of the Entity |
| ------------- | ---------------------- | --------------------- |
| Account       | `gitlab_account`       | `Account`             |
| Group         | `gitlab_group`         | `Group`               |
| Merge Request | `gitlab_merge_request` | `CodeReview`, `PR`    |
| Project       | `gitlab_project`       | `CodeRepo`, `Project` |
| User          | `gitlab_user`          | `User`                |
| SubGroup      | `gitlab_group`         | `Group`               |

### Relationships

The following relationships are created/mapped:

| From             | Edge         | To                     |
| ---------------- | ------------ | ---------------------- |
| `gitlab_account` | **HAS**      | `gitlab_group`         |
| `gitlab_account` | **HAS**      | `gitlab_project`       |
| `gitlab_group`   | **HAS**      | `gitlab_project`       |
| `gitlab_group`   | **HAS**      | `gitlab_group`         |
| `gitlab_group`   | **HAS**      | `gitlab_user`          |
| `gitlab_project` | **HAS**      | `gitlab_merge_request` |
| `gitlab_project` | **HAS**      | `gitlab_user`          |
| `gitlab_user`    | **OPENED**   | `gitlab_merge_request` |
| `gitlab_user`    | **APPROVED** | `gitlab_merge_request` |
