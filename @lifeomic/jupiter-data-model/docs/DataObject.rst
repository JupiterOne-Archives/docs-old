``DataObject``
==============

An individual data object, such as an aws-s3-object, sharepoint-document, source-code, or a file (on disk). The exact data type is described in the _type property of the Entity.

Includes properties from:

* `Entity <Entity.html>`_
* `Metadata <Metadata.html>`_

category (string) - Optional
----------------------------

A user-provided category of the data, such as 'Source Code', 'Report', 'Patent Application', 'Business Plan', 'Customer Record', 'Genetic Data', etc.

format (string) - Optional
--------------------------

The format of the data, such as 'document', 'raw', 'plaintext', 'binary', etc.

classification (string) - Required
----------------------------------

The sensitivity of the data; should match company data classification

**Example Values**

* critical
* confidential
* internal
* public

location (string) - Optional
----------------------------

URI to the data, e.g. file path

PII (boolean) - Optional
------------------------

Indicates if this data object is or contains Personally Identifiable Information

PHI (boolean) - Optional
------------------------

Indicates if this data object is or contains Protected Health Information

PCI (boolean) - Optional
------------------------

Indicates if this data object is or contains Payment Card Information

encryptionRequired (boolean) - Optional
---------------------------------------

If the data needs to be encrypted

encrypted (boolean) - Optional
------------------------------

If the data is encrypted

public (boolean) - Optional
---------------------------

Indicates if the data object is open to public access