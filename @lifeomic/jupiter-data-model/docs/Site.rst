``Site``
========

The physical location of an organization. A Person (i.e. employee) would typically has a relationship to a Site (i.e. located_at or work_at). Also used as the abstract reference to AWS Regions.

Includes properties from:

* `Entity <Entity.html>`_
* `Metadata <Metadata.html>`_

category (array of string) - Optional
-------------------------------------

Type of site

**Options**

* headquarters
* branch
* campus
* office
* aws-region
* data-center
* lab
* other

location (string) - Optional
----------------------------

The address/location of the site. Or an AWS Region (e.g. us-east-2).

hours (string) - Optional
-------------------------

Hours of operation. e.g. M-F 9am-6pm

secured (boolean) - Optional
----------------------------

Indicates the site is secured with physical controls such as key card access and surveillance cameras.

restricted (boolean) - Optional
-------------------------------

Indicates that access to the site is restricted (a level above secured access).