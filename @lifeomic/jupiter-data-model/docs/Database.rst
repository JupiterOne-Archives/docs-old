``Database``
============

A database cluster/instance.

Includes properties from:

* `Entity <Entity.html>`_
* `Metadata <Metadata.html>`_

location (string) - Optional
----------------------------

URI to access the database.

encryptionRequired (boolean) - Optional
---------------------------------------

If the data needs to be encrypted

encrypted (boolean) - Optional
------------------------------

If the repository is encrypted

classification (string) - Required
----------------------------------

The sensitivity of the data; should match company data classification scheme

**Example Values**

* critical
* confidential
* internal
* public