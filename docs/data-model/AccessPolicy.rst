AccessPolicy
============

A policy for access control assigned to a Host, Role, User, UserGroup, or Service.

Includes properties from:

* `Entity <Entity.html>`_
* `Metadata <Metadata.html>`_

``admin`` (boolean) - Optional
------------------------------

Indicates if the policy grants administrative privilege.

``rules`` (array of string) - Optional
--------------------------------------

Rules of this policy. Each rule is written 'as-code' that can be operationalized with a control provider or within JupiterOne's rules engine.

``content`` (string) - Optional
-------------------------------

Content of a policy contains the raw policy rules, if applicable. For example, the JSON text of an AWS IAM Policy. This is stored in raw data.