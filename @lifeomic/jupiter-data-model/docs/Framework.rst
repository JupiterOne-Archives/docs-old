Framework
=========

An object to represent a standard compliance or technical security framework.

Includes properties from:

* `Metadata <Metadata.html>`_

``name`` (string) - Required
----------------------------

Name of this entity

``displayName`` (string) - Required
-----------------------------------

Display name

``summary`` (string) - Optional
-------------------------------

A summary / short description of this entity.

``description`` (string) - Optional
-----------------------------------

An extended description of this entity.

``standard`` (string) - Required
--------------------------------

The name of the framework standard.

**Options**

* HIPAA
* HITRUST CSF
* CSA STAR
* PCI DSS
* NIST CSF
* FedRAMP
* ISO 27001
* SOC
* OWASP
* Other

``version`` (string) - Required
-------------------------------

The version of the framework. For example, HITRUST CSF may have version 8.1, 9.0, 9.1, etc.; OWASP may have version 2010, 2013, 2017.