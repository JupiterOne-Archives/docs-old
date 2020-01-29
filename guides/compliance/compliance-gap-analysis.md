# Compliance Gap Analysis

JupiterOne compliance platform is capable of performing automated gap analysis
based on the query or queries saved in mapped questions. Here is how it works.

## Query Names

Queries saved in a question can be named as follow to trigger gap analysis:

- `good`:

  Results from a "good" query indicates **expected configuration is present**.
  
  For example, a list of critical data stores that are encrypted.

  ```j1ql
  Find DataStore with classification='critical' and encrypted=true
  ```

- `bad`:

  Results from a "bad" query indicates **gaps or misconfigurations**.

  For example, a list of critical data stores that are _not_ encrypted.

  ```j1ql
  Find DataStore with classification='critical' and encrypted!=true
  ```

- `unknown`:

  Results from an "unknown" query indicates **resources with an unknown scope or state**.

  For example, a list of data stores that do _not_ have classification tags.

  ```j1ql
  Find DataStore with classification=undefined
  ```

_A question can have one or all of the above named queries._

## Gap Analysis Status

The gap analysis status of each requirement of control may be one of the
following:

- `FULFILLED`:

  Requirement is "fulfilled and monitoring".

- `WARNING`:

  "Attention - potential remediation needed" because a potential gap has been
  detected, with a mix of properly configured resources and misconfigurations
  (i.e. _partially fulfilled_).

- `GAP`:

  "Gap detected" with no properly configured resources identified, indicating a
  _full control gap_.

- `UNKNOWN` or `INDETERMINATE`:

  "Manual review needed" because the platform was unable to auto-determine the
  status with the queries provided.

  > This status appears also when the requirement or control has no mapped query
    question _and_ no external evidence provided.

The status is determined by the presence and output of the named queries in the
mapped question(s), as seen in the following matrix:

![compliance-gap-analysis](../../assets/compliance-query-gap-analysis-status.png)

> Note: A single query in a question with any name or without a name is
  implicitly interpreted as a `good` query.
