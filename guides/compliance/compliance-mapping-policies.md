# Compliance Mapping - Policies

JupiterOne platform follows this data structure to make connections between
written policies and compliance standards:

```text
          |-- IMPLEMENTS -> security_policy
          |
security_procedure
          |
          |-- IMPLEMENTS -> compliance requirement or control
```

See [this article][1] for the full GRC graph data model.

The mapping between a security procedure (i.e. written documentation describing
a security control or process) and a compliance requirement is done via a JSON
configuration file.

An example mapping is provided here:

<https://github.com/JupiterOne/security-policy-templates/blob/master/templates/standards/controls-mapping.json>

This JSON can be edited to meet your organization's policy procedures and
compliance specifications, and then uploaded to the JupiterOne Compliance app:

- Go to https://apps.us.jupiterone.io/compliance
- Click ![edit][edit-icon] **Edit mapping**
- Copy/paste your "Policy Procedures to Compliance Mapping" JSON

[1]: ../../docs/data-model/org-grc.md
[edit-icon]: https://raw.githubusercontent.com/feathericons/feather/master/icons/edit.svg?sanitize=true

## JSON Structure

See the schema documented [here](../../docs/schemas/policies-compliance.md).