``Procedure``
=============

A written procedure and control documentation. A Procedure typically `IMPLEMENTS` a parent Policy. An actual Control further `IMPLEMENTS` a Procedure.

Includes properties from:

* `RecordEntity <RecordEntity.html>`_
* `Metadata <Metadata.html>`_

title (string) - Required
-------------------------

Title of the procedure

summary (string) - Required
---------------------------

Summary or overview the describes the procedure. Summary text is intended as guidance to the author and not included in the published version.

author (string) - Optional
--------------------------

Author of the record

content (string) - Required
---------------------------

Text content of the policy. For policies/procedures used by the Policy Builder app, this will contain the template text in markdown format. Stored in raw data.

control (string) - Optional
---------------------------

The type of control specified by this procedure.

**Options**

* administrative
* technical
* physical
* operational
* other

applicable (boolean) - Optional
-------------------------------

Indicates if procedure is applicable based on the organization's current risk and compliance needs. A Policy that is not applicable may become applicable later as the organization's requirements and maturity change.

adopted (boolean) - Optional
----------------------------

Indicates if procedure has been adopted. Only adopted policies and procedures are included in the published view of the Policy Builder app.