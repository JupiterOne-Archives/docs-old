Incident
========

An operational or security incident.

Includes properties from:

* `Entity <Entity.html>`_
* `Metadata <Metadata.html>`_

``category`` (string) - Required
--------------------------------

The category of the incident

**Options**

* 1. General Incident
* 2. Attack on Internal Facing Assets
* 3. Attack on External Facing Assets
* 4. Malware
* 5. Social Engineering
* 6. Data Breach
* 7. Physical or Environmental

``severity`` (string) - Required
--------------------------------

Severity rating based on impact. Can be a string such as 'critical', 'major', 'minor', or an integer usually between 1-3.

``impacts`` (array of string) - Optional
----------------------------------------

The target listing of [IDs/keys to] systems and resources this incident impacts.

``reportable`` (boolean) - Required
-----------------------------------

Indicates if this is a reportable incident per applicable regulations, such as HIPAA, PCI, or GDPR.

``reporter`` (string) - Optional
--------------------------------

The person/entity who reported this incident.

``postmortem`` (string) - Optional
----------------------------------

Summary and/or a link to the documented lesson learned.