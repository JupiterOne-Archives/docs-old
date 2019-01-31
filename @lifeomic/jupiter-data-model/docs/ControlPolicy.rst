``ControlPolicy``
=================

An operational or configuration compliance policy with technical specifications / rules that governs (i.e. enforces, evaluates, or monitors) a security control or IT system.

Includes properties from:

* `Entity <Entity.html>`_
* `Metadata <Metadata.html>`_

category (string) - Optional
----------------------------

The category of control policy.

**Options**

* compliance
* config
* password
* other

rules (array of string) - Optional
----------------------------------

Rules of this policy. Each rule is written 'as-code' that can be operationalized with a control provider or within JupiterOne's rules engine.

content (string) - Optional
---------------------------

Content of an AccessPolicy or ControlPolicy contains the raw policy rules, if applicable. For example, the JSON text of an AWS IAM Policy.