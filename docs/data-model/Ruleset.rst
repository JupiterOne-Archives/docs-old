Ruleset
=======

An operational or configuration compliance ruleset with rules that governs (or enforces, evaluates, monitors) a security control or IT system.

Includes properties from:

* `Entity <Entity.html>`_
* `Metadata <Metadata.html>`_

``category`` (string) - Optional
--------------------------------

The category of ruleset.

**Options**

* compliance
* config
* password
* other

``rules`` (array of string) - Optional
--------------------------------------

Rules of ruleset. Each rule is written 'as-code' that can be operationalized with a control provider or within JupiterOne's rules engine.

``content`` (string) - Optional
-------------------------------

Contents of the raw rules, if applicable.