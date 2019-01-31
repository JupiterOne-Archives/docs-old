``Assessment``
==============

An object to represent an assessment, including both compliance assessment such as a HIPAA Risk Assessment or a technical assessment such as a Penetration Testing. Each assessment should have findings (e.g. Vulnerability or Risk) associated.

Includes properties from:

* `Entity <Entity.html>`_
* `Metadata <Metadata.html>`_

category (string) - Required
----------------------------

The category of the Assessment.

**Options**

* Risk Assessment
* Readiness Assessment
* Gap Assessment
* Validation Assessment
* Compliance Assessment
* Self Assessment
* Certification
* Audit
* Technical Review
* Operational Review
* Penetration Testing
* Vulnerability Scan
* Other

summary (string) - Required
---------------------------

The summary description of the Assessment.

internal (boolean) - Required
-----------------------------

Indicates if this is an internal or external assessment/audit. Defaults to true.

startedOn (string) - Optional
-----------------------------

The datetime in ISO 8601 format when the Assessment was started.

Format: date-time

completedOn (string) - Optional
-------------------------------

The datetime in ISO 8601 format when the Assessment was completed.

Format: date-time

reportURL (string) - Optional
-----------------------------

Link to the assessment report, if available.

Format: uri