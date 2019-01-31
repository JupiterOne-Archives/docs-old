``Organization``
================

An organization, such as a company (e.g. LifeOmic) or a business unit (e.g. HR). An organization can be internal or external. Note that there is a more specific Vendor class.

Includes properties from:

* `Entity <Entity.html>`_
* `Metadata <Metadata.html>`_

_type (string) - Optional
-------------------------

The type of organization (within the context of the primary organization).

**Options**

* company
* department
* business-unit
* subsidiary
* government-agency
* partner
* other

website (string) - Optional
---------------------------

The organization's main website URL.

Format: uri

emailDomain (string) - Optional
-------------------------------

The domain name for internal organization email addresses.

external (boolean) - Optional
-----------------------------

Indicates if this organization is external