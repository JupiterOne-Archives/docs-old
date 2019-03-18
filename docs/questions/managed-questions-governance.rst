.. This file is generated in jupiter-provision-managed-questions.
   Do not edit by hand as this document will be overwritten when
   jupiter-provision-managed-questions is deployed!

==========
Governance
==========

What are the corporate security policies and procedures?
--------------------------------------------------------

Find all security policies and procedures.

**Tags:** ``compliance``, ``HIPAA``, ``HITRUST CSF``

Queries
+++++++

- ``Find security_policy``

- ``Find security_procedure as procedure that IMPLEMENTS security_policy as policy return policy.displayName, procedure.displayName order by policy.displayName``

Compliance Mappings
+++++++++++++++++++

**HITRUST CSF:** ``04.a``

When was security policies and procedures last updated or reviewed?
-------------------------------------------------------------------

Find all security policies and procedures by date, and the ones that have not been reviewed or updated in the past year.

**Tags:** ``compliance``, ``HIPAA``, ``HITRUST CSF``

Queries
+++++++

- ``Find (security_policy|security_procedure) as p return p.displayName as PolicyProcedureName, p.updatedOn as lastUpdatedOn``

- ``Find (security_policy|security_procedure) with (reviewedOn < date.Now - 1yr and updatedOn < date.Now - 1yr)``

Compliance Mappings
+++++++++++++++++++

**HITRUST CSF:** ``04.b``

Who is the appointed security officer?
--------------------------------------

Find the Person who implements the security program or is assigned the security leadership role.

**Tags:** ``compliance``, ``HIPAA``, ``HITRUST CSF``

Queries
+++++++

- ``Find Person that (IMPLEMENTS|ASSIGNED) Procedure with id='cp-role-assignment'``

Compliance Mappings
+++++++++++++++++++

**HITRUST CSF:** ``02.d``, ``05.a``

Which are my documented risks?
------------------------------

Return all documented risks.

**Tags:** ``compliance``, ``HIPAA``, ``HITRUST CSF``

Queries
+++++++

- ``Find Risk``

Compliance Mappings
+++++++++++++++++++

**HITRUST CSF:** ``03.a``, ``03.b``, ``03.c``, ``03.d``

Formal risk assessments shall be conducted at least annually or with major product/organization/system changes. As a result of the assessment, any identified risk should be documented and tracked in a risk register.

Was there at least one risk assessment performed within the past year?
----------------------------------------------------------------------

Return all risk assessments performed with a createdOn timestamp in the past year; and secondly returns all risks identified by the assessments.

**Tags:** ``compliance``, ``HIPAA``, ``HITRUST CSF``

Queries
+++++++

- ``Find risk_assessment with _createdOn > date.now - 1yr``

- ``Find Assessment with _createdOn > date.now - 1yr that (IDENTIFIED|REVIEWED) Risk``

Compliance Mappings
+++++++++++++++++++

**HITRUST CSF:** ``03.b``, ``03.d``

Formal risk assessments shall be conducted at least annually or with major product/organization/system changes. As a result of the assessment, any identified risk should be documented and tracked in a risk register.

Who are my vendors? Do I have a BAA/DPA/NDA/MSA and SLA/Support Agreement with them?
------------------------------------------------------------------------------------

Returns a list of Vendors and their properties, including links to NDA, BAA, MSA, SLA, support agreement and vendor security review report, if available.

**Tags:** ``compliance``, ``CIS Controls``, ``HIPAA``, ``HITRUST CSF``, ``PCI DSS``

Queries
+++++++

- ``Find Vendor``

Compliance Mappings
+++++++++++++++++++

**CIS Controls:** ``2.2``

**HITRUST CSF:** ``05.i``

**PCI DSS:** ``2.4``