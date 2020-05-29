# Queries using internal metadata

JupiterOne assigns metadata to resources and sometimes it is helpful to leverage
them in queries. Here are some examples.

> See [this doc][1] for a complete list and description of each metadata property.

**Identify network access to/from external resources using `_source` filter:**

```j1ql
Find Firewall that allows as rule (Host|Network) with _source='system-mapper'
Return
  Firewall._type, Firewall.displayName,
  rule.ingress, rule.egress, rule.ipProtocol, rule.fromPort, rule.toPort
```

**Using internal timestamps when provider timestamps are not available:**

```j1ql
Find Host with _createdOn > date.now - 48 hours
```

**Count entities by integration type and instance name:**

```j1ql
Find * as entity
Return entity._integrationType, entity._integrationName, count(entity)
```

[1]: ../docs/metadata.md
