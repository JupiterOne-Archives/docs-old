Risk
====

An object that represents an identified Risk as the result of an Assessment. The collection of Risk objects in JupiterOne make up the Risk Register. A Control may have a `MITIGATES` relationship to a Risk.

Includes properties from:

* `RecordEntity <RecordEntity.html>`_
* `Metadata <Metadata.html>`_

``assessment`` (string) - Optional
----------------------------------

The name/id of the assessment that produced this risk.

``category`` (string) - Optional
--------------------------------

The category (or area) of the risk. For example, 'process maturity' or 'natural disaster'.

``probability`` (integer) - Required
------------------------------------

Probability rating of the risk: '3: high/certain', '2: medium/likely', '1: low/unlikely', '0: none/negligible'.

**Options**

* 0
* 1
* 2
* 3

``impact`` (integer) - Required
-------------------------------

Impact rating. '3: high/severe', '2: medium/moderate', '1: low/minor', '0: none/insignificant'.

**Options**

* 0
* 1
* 2
* 3

``score`` (integer) - Required
------------------------------

Overall Risk Score = Probability x Impact

``details`` (string) - Optional
-------------------------------

Additional details to describe the risk.

``mitigation`` (string) - Optional
----------------------------------

Description of the mitigation, either planned or implemented, if applicable.

``status`` (string) - Required
------------------------------

Current status of this documented risk. Default status is `open`.

**Options**

* reported
* acknowledged
* accepted
* mitigated
* prioritized
* transferred
* pending
* open