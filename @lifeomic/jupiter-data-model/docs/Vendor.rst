Vendor
======

An external organization that is a vendor or service provider.

Includes properties from:

* `Entity <Entity.html>`_
* `Metadata <Metadata.html>`_

``category`` (string) - Required
--------------------------------

The category of vendor.

**Options**

* business-operations
* cloud
* facilities
* finance
* infrastructure
* legal
* purchasing
* security
* software
* platform-development
* platform-social-media
* professional-services-staffing
* professional-services-recruiting
* professional-services-consulting
* generic-service-provider
* generic-subscription
* CSP
* ISP
* MSP
* MSSP
* IdP
* other

``website`` (string) - Optional
-------------------------------

The vendor's main website URL.

Format: uri

``departments`` (array of string) - Optional
--------------------------------------------

List of business departments the vendor provides service for (e.g. IT, HR, Finance, Marketing, Development/Engineering, Security).

``emailDomain`` (string) - Optional
-----------------------------------

The email domain for the vendor (e.g. @jupiterone.io).

``mainContactName`` (string) - Optional
---------------------------------------

The vendor's point of contact person.

``mainContactEmail`` (string) - Optional
----------------------------------------

Email of the vendor's point of contact person.

Format: email

``mainContactPhone`` (string) - Optional
----------------------------------------

Phone number of the vendor's point of contact person.

``mainContactAddress`` (string) - Optional
------------------------------------------

Main physical/mailing address of the vendor.

``admins`` (array of string) - Optional
---------------------------------------

List of admin users to the vendor account, if applicable. If this vendor account is integrated directly to JupiterOne and its data is ingested, the admin users should be already mapped as User entities.

``breachResponseDays`` (integer) - Optional
-------------------------------------------

The number of days the vendor agrees to report an identified data breach, per vendor agreement and/or SLA. This is typically 3 to 30 days. Note that GDPR requires breach notification within 3 days / 72 hours.

``linkToNDA`` (string) - Optional
---------------------------------

Link to Non-Disclosure Agreement (NDA) document.

Format: uri

``linkToMSA`` (string) - Optional
---------------------------------

Link to Master Service Agreement (MSA) document.

Format: uri

``linkToSLA`` (string) - Optional
---------------------------------

Link to Service Level Agreement (SLA) document.

Format: uri

``linkToBAA`` (string) - Optional
---------------------------------

Link to Business Associate Agreement (BAA) document - for HIPAA only.

Format: uri

``linkToDPA`` (string) - Optional
---------------------------------

Link to GDPR Data Processing Addendum (DPA) document - for GDPR only.

Format: uri

``linkToVTR`` (string) - Optional
---------------------------------

Link to the external vendor technology risk (VTR) report.

Format: uri

``linkToISA`` (string) - Optional
---------------------------------

Link to the external information security assessment (ISA) report.

Format: uri

``statusPage`` (string) - Optional
----------------------------------

Link to the vendor's service status page (e.g. https://status.aws.amazon.com/).

Format: uri