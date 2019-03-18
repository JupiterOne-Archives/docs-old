.. This file is generated in jupiter-provision-managed-questions.
   Do not edit by hand as this document will be overwritten when
   jupiter-provision-managed-questions is deployed!

=======
General
=======

Are my assets tracked? How many entities are there?
---------------------------------------------------

Returns the current count of total assets/entities tracked in JupiterOne - either automatically ingested via integrations or manually entered through the Asset Inventory app or API.

**Tags:** ``compliance``, ``CIS Controls``, ``HIPAA``, ``HITRUST CSF``, ``PCI DSS``

Queries
+++++++

- ::

  Find * as e return count(e)

Compliance Mappings
+++++++++++++++++++

**CIS Controls:** ``1.1``, ``1.2``, ``1.4``, ``1.5``, ``2.1``, ``2.3``, ``2.4``, ``2.5``

**HITRUST CSF:** ``07.a``

What are my production information assets and their owners and classification?
------------------------------------------------------------------------------

Returns a list of Application, Code Repo, Workload, Function, Host, Device, Database, Data Store entities along with their owner and classification.

**Tags:** ``compliance``, ``CIS Controls``, ``HIPAA``, ``HITRUST CSF``, ``PCI DSS``

Queries
+++++++

- ::

  Find (Application|CodeRepo|Workload|Function|Host|Device|Database|DataStore) as asset return asset._class, asset._type, asset.displayName, asset.tag.AccountName, asset.owner, asset.classification

Compliance Mappings
+++++++++++++++++++

**CIS Controls:** ``1.4``, ``1.5``

**HITRUST CSF:** ``07.a``

**PCI DSS:** ``2.4``

What are my production information assets?
------------------------------------------

Returns a list of production Applications, Code Repos, Workloads, Functions, Hosts, Devices, Databases, and Data Stores.

**Tags:** ``compliance``, ``CIS Controls``, ``HIPAA``, ``HITRUST CSF``, ``PCI DSS``

Queries
+++++++

- ::

  Find (Application|CodeRepo|Workload|Function|Host|Device|Database|DataStore) with tag.Production=true

Compliance Mappings
+++++++++++++++++++

**CIS Controls:** ``1.4``, ``1.5``

**HITRUST CSF:** ``07.a``

**PCI DSS:** ``2.4``

What are my production systems and servers?
-------------------------------------------

Returns a list of production Workloads, Functions, and Hosts.

**Tags:** ``compliance``, ``HIPAA``, ``HITRUST CSF``, ``PCI DSS``

Queries
+++++++

- ::

  Find (Workload|Function|Host) with tag.Production=true

Compliance Mappings
+++++++++++++++++++

**CIS Controls:** ``1.4``, ``1.5``

**HITRUST CSF:** ``07.a``

**PCI DSS:** ``2.4``

What are my production data stores and databases?
-------------------------------------------------

Returns a list of production Databases and Data Stores.

**Tags:** ``compliance``, ``HIPAA``, ``HITRUST CSF``, ``PCI DSS``

Queries
+++++++

- ::

  Find (Database|DataStore) with tag.Production=true

Compliance Mappings
+++++++++++++++++++

**CIS Controls:** ``1.4``, ``1.5``

**HITRUST CSF:** ``07.a``

**PCI DSS:** ``2.4``

What are my production resources?
---------------------------------

Returns a list of all production entities.

**Tags:** ``SecOps``

Queries
+++++++

- ::

  Find * with tag.Production=true

What applications and operating systems are in use?
---------------------------------------------------

Returns a list of software applications and operating systems.

**Tags:** ``SecOps``, ``compliance``, ``CIS Controls``, ``HIPAA``, ``HITRUST CSF``, ``PCI DSS``

Queries
+++++++

- ::

  Find Application

- ::

  Find Host with platform!=undefined as h return h.platform, h.platformName, h.osName, h.osVersion, h.osDetails ORDER BY h.platform

Compliance Mappings
+++++++++++++++++++

**CIS Controls:** ``2.3``

**HITRUST CSF:** ``07.a``

**PCI DSS:** ``2.4``

What are my production applications?
------------------------------------

Returns a list of production Applications.

**Tags:** ``SecOps``, ``compliance``, ``CIS Controls``, ``HIPAA``, ``HITRUST CSF``, ``PCI DSS``

Queries
+++++++

- ::

  Find Application with tag.Production=true

Compliance Mappings
+++++++++++++++++++

**CIS Controls:** ``2.1``

**HITRUST CSF:** ``07.a``

**PCI DSS:** ``2.4``

Do I have proper vendor support for my software applications?
-------------------------------------------------------------

Returns a list of applications and their vendors. Vendors should have support agreement and/or SLA attached.

**Tags:** ``compliance``, ``CIS Controls``, ``HIPAA``, ``HITRUST CSF``, ``PCI DSS``

Queries
+++++++

- ::

  Find Application as app that CONNECTS Account that RELATES TO Vendor as v return app.displayName as app, v.name as vendor, v.linkToSLA, v.linkToMSA

- ::

  Find Application that RELATES TO Vendor

- ::

  Find Application

Compliance Mappings
+++++++++++++++++++

**CIS Controls:** ``2.2``

**HITRUST CSF:** ``05.i``

**PCI DSS:** ``2.4``

Who are the new hires within the last 12 months?
------------------------------------------------

Returns all employees added in the last 12 months.

**Tags:** ``compliance``, ``HIPAA``, ``HITRUST CSF``

Queries
+++++++

- ::

  Find employee with _createdOn > date.now-12months

Compliance Mappings
+++++++++++++++++++

**HITRUST CSF:** ``02.a``, ``02.b``, ``02.c``, ``02.e``

For each of the new hire, you should provide supporting evidence to meet requirements for pre-hire screening and onboarding. Links to these evidence may be added to each employee/Person entity (e.g. linking to a SharePoint document or a Jira issue).

What business applications are we using?
----------------------------------------

Finds all application entities that does not have associate code repos. It is assumed that an application with code repos is a commercial-facing application or part of your custom development.

**Tags:** ``SecOps``

Queries
+++++++

- ::

  Find Application that !has CodeRepo

What changed in my environment in the last 24 hours?
----------------------------------------------------

Find all entities that were updated with a timestamp within the last 24 hours.

**Tags:** ``SecOps``

Queries
+++++++

- ::

  Find * with _beginOn > date.now-24hrs

What was added to my environment in the last 24 hours?
------------------------------------------------------

Find all entities that were created within the last 24 hours.

**Tags:** ``SecOps``

Queries
+++++++

- ::

  Find * with _createdOn > date.now-24hrs