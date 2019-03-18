.. This file is generated in jupiter-provision-managed-questions.
   Do not edit by hand as this document will be overwritten when
   jupiter-provision-managed-questions is deployed!

====
Data
====

Are there any non-public data stores incorrectly configured with public access to everyone?
-------------------------------------------------------------------------------------------

Find all Data Stores that are marked publicly accessible or have an ALLOWS relationship to everyone, unless the data store is specifically tagged as 'public' per data classification.

**Tags:** ``data``, ``SecOps``

Queries
+++++++

- ``Find DataStore with (classification!='public' or classification=undefined) that ALLOWS everyone``

- ``Find DataStore with (classification!='public' or classification=undefined) and public=true``

Which data stores do not have proper classification tags?
---------------------------------------------------------

Find Data Stores across my entire environment that are not tagged with classification.

**Tags:** ``data``, ``SecOps``

Queries
+++++++

- ``Find DataStore with classification='' or classification=undefined``

What is the inventory of my sensitive data stores?
--------------------------------------------------

Find Data Stores that are tagged as 'sensitive' or 'confidential' or 'critical'.

**Tags:** ``data``, ``SecOps``, ``compliance``, ``CIS Controls``, ``HITRUST CSF``, ``PCI DSS``

Queries
+++++++

- ``Find DataStore with classification='sensitive' or classification='confidential' or classification='critical'``

- ``Find DataStore with (classification='' or classification=undefined) and (production=true or tag.Production=true)``

Compliance Mappings
+++++++++++++++++++

**CIS Controls:** ``13.1``

**HITRUST CSF:** ``07.d``, ``07.e``

Which production data stores do not have proper classification tags?
--------------------------------------------------------------------

Find Data Stores in production that are not tagged with classification.

**Tags:** ``data``, ``SecOps``

Queries
+++++++

- ``Find DataStore with (classification='' or classification=undefined) and (production=true or tag.Production=true)``

Is there any known confidential or critical data outside of production?
-----------------------------------------------------------------------

Returns a list of Data Stores tagged with 'confidential' or 'critical' classification label outside of production environments. Confidential or critical data should remain inside production environments.

**Tags:** ``data``, ``SecOps``

Queries
+++++++

- ``Find DataStore with (classification='confidential' or classification='critical') and (tag.Production!=true or production!=true)``

- ``Find DataStore with (classification='confidential' or classification='critical') that RELATES TO (Account|Service) with (tag.Production!=true or production!=true)``

Evidence of data-at-rest encryption for production servers
----------------------------------------------------------

Returns all data volumes (disks) attached to production hosts and their encryption status.

**Tags:** ``data``, ``compliance``, ``HIPAA``, ``HITRUST CSF``

Queries
+++++++

- ``Find Host with (tag.Production=true or production=true or tag.ePHI=true or tag.PHI=true or tag.PII=true) as h that uses DataStore with encrypted=true as d return h.tag.AccountName as Account, h.displayName as Hostname, d.displayName as EncryptedDisks, d.encrypted as Encrypted``

- ``Find Host with (tag.Production=true or production=true or tag.ePHI=true or tag.PHI=true or tag.PII=true) as h that uses DataStore with encrypted!=true as d return h.tag.AccountName as Account, h.displayName as Hostname, d.displayName as UnencryptedDisks, d.encrypted as Encrypted``

Compliance Mappings
+++++++++++++++++++

**HITRUST CSF:** ``06.d``, ``07.e``

Data volumes containing ePHI must be encrypted. If unencrypted disks are being used, as returned by the second query, you must remediate.

Is my production or PHI/PII data stores encrypted?
--------------------------------------------------

Returns a list of Data Stores (such as AWS S3 buckets) tagged as production or as containing ePHI/PHI/PII data and their encryption status.

**Tags:** ``data``, ``compliance``, ``HIPAA``, ``HITRUST CSF``

Queries
+++++++

- ``Find DataStore with (production=true or tag.Production=true or tag.ePHI=true or tag.PHI=true or tag.PII=true) and encrypted=true as d return d.tag.AccountName as Account, d.displayName as EncryptedDataStores, d._type as Type, d.encrypted as Encrypted``

- ``Find DataStore with (production=true or tag.Production=true or tag.ePHI=true or tag.PHI=true or tag.PII=true) and encrypted!=true as d return d.tag.AccountName as Account, d.displayName as UnencryptedDataStores, d._type as Type, d.encrypted as Encrypted``

Compliance Mappings
+++++++++++++++++++

**HITRUST CSF:** ``06.d``, ``07.e``

Data stores containing ePHI must be encrypted. If unencrypted data stores are found, as returned by the second query, you must remediate.

Is my critical data in production encrypted?
--------------------------------------------

Returns a list of Data Stores (such as AWS S3 buckets) in that are tagged as 'critical' in production environments and their encryption status. Replace the classification label to match your organization's data classification model/policy.

**Tags:** ``data``, ``SecOps``

Queries
+++++++

- ``Find DataStore with (production=true or tag.Production=true) and classification='critical' and encrypted=true as d return d.tag.AccountName as Account, d.displayName as EncryptedDataStores, d._type as Type, d.encrypted as Encrypted``

- ``Find DataStore with (production=true or tag.Production=true) and classification='critical' and encrypted!=true as d return d.tag.AccountName as Account, d.displayName as UnencryptedDataStores, d._type as Type, d.encrypted as Encrypted``

Is there unencrypted ePHI or PII?
---------------------------------

Returns any Data Store tagged as ePHI that is not encrypted.

**Tags:** ``data``, ``SecOps``

Queries
+++++++

- ``Find DataStore with (tag.PHI=true or tag.ePHI=true or tag.PII=true) and encrypted=false``