Host
====

A compute instance that itself owns a whole network stack and serves as an environment for workloads. Typically it runs an operating system. The exact host type is described in the _type property of the Entity. The UUID of the host should be captured in the _id property of the Entity

Includes properties from:

* `Entity <Entity.html>`_
* `Metadata <Metadata.html>`_

``hostname`` (string) - Required
--------------------------------

The primary/local hostname

``ipAddress`` (string) - Optional
---------------------------------

The main IP address. This property is usually used to store the primary IP address of a Host.

Format: ip

``publicDnsName`` (string) - Optional
-------------------------------------

The public DNS name

Format: hostname

``privateDnsName`` (string) - Optional
--------------------------------------

The private DNS name

Format: hostname

``publicIpAddress`` (string) - Optional
---------------------------------------

The public IP address

Format: ipv4

``privateIpAddress`` (string) - Optional
----------------------------------------

The private IP address

Format: ipv4

``ipAddresses`` (array of string) - Optional
--------------------------------------------

A listing of all IPv4 addresses associated with this Host

``ipv6Addresses`` (array of string) - Optional
----------------------------------------------

A listing of all IPv6 addresses associated with this Host

``macAddress`` (string) - Optional
----------------------------------

Primary MAC address

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

``macAddresses`` (array of string) - Optional
---------------------------------------------

A listing of all MAC addresses associated with this Host

``isPhysical`` (boolean) - Optional
-----------------------------------

Indicates if this is a physical host, such as a physical server.