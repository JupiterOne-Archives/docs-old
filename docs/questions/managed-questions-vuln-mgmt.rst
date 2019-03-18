.. This file is generated in jupiter-provision-managed-questions.
   Do not edit by hand as this document will be overwritten when
   jupiter-provision-managed-questions is deployed!

========================
Vulnerability Management
========================

What open vulnerabilities do I have?
------------------------------------

Returns Vulnerability findings that are still active (i.e. with a status that is open/pending).

**Tags:** ``vuln-mgmt``, ``compliance``, ``HIPAA``, ``HITRUST CSF``

Queries
+++++++

- ::

  Find Vulnerability with active=true

Compliance Mappings
+++++++++++++++++++

**HITRUST CSF:** ``10.m``

Which applications are vulnerable?
----------------------------------

Returns Applications and their open (i.e. active) Vulnerability findings except low severity ones.

**Tags:** ``vuln-mgmt``, ``compliance``, ``HIPAA``, ``HITRUST CSF``

Queries
+++++++

- ::

  Find (Application|Project|CodeRepo) as app that has Vulnerability with severity>2 and active=true as vuln return app.name as AppName, vuln.name as Vulnerability, vuln.severity as Severity, vuln.priority as Priority

Compliance Mappings
+++++++++++++++++++

**HITRUST CSF:** ``10.m``