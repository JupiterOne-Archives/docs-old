
# AWS Access Permissions and Trusts

> _Tip: If you have over 10,000 AWS resources in multiple AWS accounts, some
query execution may take a long time or occasionally time out. Try limiting the
query by adding `and tag.AccountName='account-name'` as part of the `WITH`
entity property filter. Or use `LIMIT 100` at the end of the query for a smaller
sample set of the results._

## IAM Policy permissions

### Which policies allow access to production data?

```j1ql
find AccessPolicy as policy
  that allows as permission
    (aws_s3|aws_dynamodb|aws_rds|DataStore) with tag.Production=true as resource
return
  policy._type, policy.name,
  resource._type, resource.name, resource.tag.AccountName,
  permission.actions, permission.resources
```

### Who has admin access to production resources?

```j1ql
find (aws_iam_group|aws_iam_user|aws_iam_role) as principal
  that assigned AccessPolicy as policy
  that allows as permission
    * with tag.Production=true as resource
where permission.admin=true
  return
    principal._type, principal.name, principal.tag.AccountName,
    policy._type, policy.name,
    permission.actions, permission.resources,
    resource._type, resource.name, resource.tag.AccountName
```

## IAM Assume Role Trusts

### What are the cross-account trusts?

```j1ql
Find aws_iam_role as a
  that trusts (aws_account|aws_iam_role) as b
where a.tag.AccountName!=b.tag.AccountName
  return tree
```

### Are there assume role trusts to external entities?

```j1ql
Find aws_account as aws
  that HAS aws_iam
  that HAS aws_iam_role as role
  that TRUSTS (aws_iam_role|aws_iam_user|aws_iam_group|aws_account)
    with _source='system-mapper' as ext
  return
    aws.name, aws.accountId,
    role.roleName,
    ext.displayName, ext._type
```

### IAM Roles and Policies assigned to Okta SSO Users

```j1ql
Find okta_user as user
  that assigned aws_iam_role as role
  that assigned aws_iam_policy as policy
return
  role.name, policy.name, count(user) as userCount
order by userCount desc
```

### What IAM roles can active public facing EC2 instances assume?

```j1ql
find Internet
  that allows aws_security_group
  that protects aws_instance with active=true
  that uses aws_iam_role
  that assigned AccessPolicy
  return tree
```

_OR_

```j1ql
find (Network|Host) with _source='system-mapper'
  that allows aws_security_group
  that protects aws_instance with active=true
  that uses aws_iam_role
  that assigned AccessPolicy
  return tree
```

> _Tip: from the above, the `(Network|Host) with _source='system-mapper'`
portion of the query looks for `Network` or `Host` entities created by the
`system-mapper` —- meaning those are networks and hosts **“external”** to your
environment, not ingested by the integration._

## S3 Bucket permissions

### Are there non-public S3 buckets configured with public access to everyone?

```j1ql
Find aws_s3_bucket
  with classification!='public' or classification=undefined
  that ALLOWS everyone
```

### What are the cross account access to non-public S3 buckets?

```j1ql
Find aws_s3_bucket with classification != 'public' as a
  that allows * as b
where a.tag.AccountName != b.tag.AccountName
  return tree
```

### Who can read non-public S3 buckets in production?

```j1ql
Find (User|UserGroup|AccessRole)
  that assigned AccessPolicy
  that allows as permission
    (aws_s3|aws_s3_bucket) with
      classification!='public' and tag.Production=true
where permission.read=true
  return tree
```

### Which EC2 instances can read data from S3 via an IAM role?

```j1ql
find aws_instance
  that uses aws_iam_role
  that assigned AccessPolicy
  that allows as permission (aws_s3|aws_s3_bucket)
where permission.read=true
  return tree
```

## Other

### What are the Inline Policies in use?

```j1ql
Find (aws_iam_user|aws_iam_group|aws_iam_role) as u
  that (has|assigned)
    (aws_iam_user_policy|aws_iam_group_policy|aws_iam_role_policy) as p
return
  u.tag.AccountName, u._type, u.name, p.name
order by u.tag.AccountName
```
