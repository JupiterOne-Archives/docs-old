Device
======

A physical device or media, such as a server, laptop, workstation, smartphone, tablet, router, firewall, switch, wifi-access-point, usb-drive, etc. The exact data type is described in the _type property of the Entity.

Includes properties from:

* `Entity <Entity.html>`_
* `Metadata <Metadata.html>`_

``category`` (string) - Required
--------------------------------

The device category

**Example Values**

* server
* endpoint
* storage-media
* mobile
* other

``hardwareVendor`` (string) - Required
--------------------------------------

The manufacturer or vendor of the device, e.g. Apple Inc., Generic

``hardwareModel`` (string) - Required
-------------------------------------

The device hardware model, e.g. MacBookPro13,3

``hardwareVersion`` (string) - Optional
---------------------------------------

The device hardware version

``hardwareSerial`` (string) - Required
--------------------------------------

The device serial number

``assetTag`` (string) - Optional
--------------------------------

The asset tag number/label that matches the identifier in asset tracking system, for company owned physical devices

``platform`` (string) - Optional
--------------------------------

Operating System Platform

**Options**

* darwin
* linux
* unix
* windows
* android
* ios
* embedded
* other

``osDetails`` (string) - Optional
---------------------------------

Operating System Full Details (e.g. macOS High Sierra version 10.13.6)

``osName`` (string) - Optional
------------------------------

Operating System Name (e.g. macOS)

``osVersion`` (string) - Optional
---------------------------------

Operating System Version (e.g. 10.13.6)

``userEmails`` (array of string) - Optional
-------------------------------------------

The email addresses of the users this device is assigned to. Used if the device is shared by more than one user. Otherwise the 'owner' is the sole user. Leave empty/undefined if the device is unassigned.

``location`` (string) - Optional
--------------------------------

Site where this device is located.

``cost`` (number) - Optional
----------------------------

The purchase cost of the device.

``value`` (number) - Optional
-----------------------------

The estimated business value of the device. The value is typically calculated as the monetary cost of the device + the value of data on the device.

``BYOD`` (boolean) - Required
-----------------------------

Indicates if this is a BYOD device -- an employee-provided device that has access to company systems/resources.

``status`` (string) - Optional
------------------------------

Status label of this device

**Options**

* assigned
* archived
* decommissioned
* defective
* deployed
* disposed
* locked
* lost/stolen
* pending
* ready
* unknown
* other