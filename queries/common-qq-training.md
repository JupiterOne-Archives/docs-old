# User Training and Awareness

## Which users have not completed assigned training?

_Requires training data from KnowBe4 or similar._

```j1ql
Find Training as t
  that assigned as enrollment User as u
  where enrollment.completedOn = undefined
  return u.first_name, u.last_name, u.email, t.name
```

## Is there any user with AWS access that hasn't completed certain training?

_The following example specifies `aws_iam_user` and `knowbe4_user`, requiring
AWS and KnowBe4 integrations._

_Additionally, this requires proper mapping between User and Person entities._

```j1ql
Find aws_iam_user
  that is Person
  that is knowbe4_user
  that !completed Training with
    name='training name' or campaign='campaign name'
```

If SAML is used to connect an SSO user (e.g. Okta user) to an AWS IAM Role:

```j1ql
Find aws_iam_role as r
  that assigned User as u
  that is Person as p
  that is knowbe4_user
  that !completed Training with
    name='training name' or campaign='campaign name'
  return r.displayName, u.displayName, p.displayName, p.email
```

## Is there any developer who has not completed "Secure Development" training?

_The following example specifies `bitbucket_user`, `github_user`, and
`knowbe4_user`, which requires Bitbucket or GitHub, in addition to KnowBe4
integrations._

_Additionally, this requires proper mapping between User and Person entities._

```j1ql
Find (bitbucket_user|github_user)
  that is Person
  that is knowbe4_user
  that !completed Training with
    name='Secure Development' or campaign='Secure Development'
```
