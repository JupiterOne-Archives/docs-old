# Development

## Were there any Code Repos added in the last 24 hours?

```j1ql
Find CodeRepo with _beginOn > date.now-24hr and _version=1
```

## Which PRs did this developer open in the last 5 days?

```j1ql
// For a developer whose first name is Charlie
'Charlie' that OPENED PR with _createdOn > date.now - 5days as PR
  return PR.displayName, PR.name
```

## Who are the most recent contributors to this repo?

_This is particularly useful to identify who might be the best person to fix a
newly discovered vulnerability._

```j1ql
Find User as u
  that OPENED PR as PR
  that HAS CodeRepo with name='repo-name' as repo
  return
    u.displayName, u.username,
    PR.displayName, PR.name, PR._createdOn, repo.name
  order by PR._createdOn
  limit 5
```

## What are the code repos for a particular application or project?

```j1ql
Find CodeRepo that relates to (Application|Project) with name='JupiterOne'
```

## Are there unapproved or self-approved code changes in the last week?

```j1ql
Find PR with
  approved=false and
  (createdOn > date.now-7days or updatedOn > date.now-7days)
```

## Are there code commits by an unknown developer in a PR?

```j1ql
Find PR with validated=false
```
