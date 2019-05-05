# Detect Suspicious Code Commits in Pull Requests

Security of software development and code is more important than ever.
JupiterOne is capable of detecting suspicious code commits in a git pull request
(PR) in two ways:

- Commits self-approved by the code author
- Commits made by an unknown user to the organization

## Enable Detection

For the detection to work, you will need to:

- Enable Pull Request (PR) and commit analysis in the integration configuration
  in JupiterOne.

  _This feature is currently supported on Bitbucket integration. Github support
  is coming soon._

- Configure branch permissions in your git source control system to prohibit
  directly committing to the main branch (e.g. `master`) and to require pull
  request reviews before merging.

  _This option is typically found under the repo settings. This allows PR
  analysis to catch the suspicious activities._

When enabled, JupiterOne sets the `approved` and `validated` flags on each
merged PR entity.

You can run a J1QL query to detect "PRs with suspicious activities":

```j1ql
Find PR with approved = false or validated = false
```

You can also set up an alert with the above query.

## How does it work? 

### Detecting self-approved commits

At the time of integration execution, or when requested via the API, JupiterOne
will analyze the activities on a merged PR to determine if there is any code
commit on the PR that was not approved by someone other than the code author.

_Isn't this already configured via branch protection/permissions?_

Consider the following scenario:

- Bob writes some code and commits them to a feature branch
- Bob opens a PR with those changes and requests review from Alice
- Alice makes another commit to the same branch and updates the PR
- Alice approves the PR

The PR is considered approved by a reviewer because Bob opened the PR and Alice
reviewed it. However, Alice technically approved her own code associated with
the commit she made to the branch after Bob opened the PR.

JupiterOne will detect this condition a sets the `approved` flag on the PR
entity to `false`.

The commit hash of the detected suspicious commit is added to the
`commitsNotApproved` list property.

### Detecting commits by unknown/external authors

Additionally, JupiterOne checks the commit author against known bitbucket users
that are part of your organization. If a commit was made by an unknown/external
author, JupiterOne sets the `validated` flag on the PR entity to `false`.

The commit hash of the detected suspicious commit is added to the
`commitsByUnknownAuthor` list property.