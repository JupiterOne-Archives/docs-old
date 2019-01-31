``Application``
===============

A software product or application.

Includes properties from:

* `Entity <Entity.html>`_
* `Metadata <Metadata.html>`_

COTS (boolean) - Optional
-------------------------

Indicates if this is a Commercial Off-The-Shelf software application. Custom in-house developed application should have this set to false.

FOSS (boolean) - Optional
-------------------------

Indicates if this is a Free or Open-Source software application or library. Custom in-house developed application should have this set to false.

SaaS (boolean) - Optional
-------------------------

Indicates if this is a Software-as-a-Service product.

external (boolean) - Optional
-----------------------------

Indicates if this is an externally acquired software application. Custom in-house developed application should have this set to false.

mobile (boolean) - Optional
---------------------------

Indicates if this is a mobile app.

license (string) - Optional
---------------------------

Stores the type of license

**Example Values**

* BSD
* CC-BY-3.0
* CC-BY-4.0
* GPL-2.0
* GPL-3.0
* LGPL-2.0
* LGPL-2.1
* LGPL-3.0
* MIT
* EULA
* Proprietary
* UNLICENSED
* other

licenseURL (string) - Optional
------------------------------

The URL to the full license

Format: uri

productionURL (string) - Optional
---------------------------------

The Production URL

Format: uri

stagingURL (string) - Optional
------------------------------

The Non-Production / Staging URL

Format: uri

devURL (string) - Optional
--------------------------

The Development URL

Format: uri

testURL (string) - Optional
---------------------------

The Test URL

Format: uri

alternateURLs (array of string) - Optional
------------------------------------------

The additional URLs related to this application.