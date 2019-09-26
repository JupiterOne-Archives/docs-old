NetworkInterface
================

An re-assignable software defined network interface resource entity. Do not create an entity for a network interface _configured_ on a Host. Use this only if the network interface is a reusable resource, such as an Elastic Network Interface object in AWS.

Includes properties from:

* `Entity <Entity.html>`_
* `Metadata <Metadata.html>`_

``macAddress`` (string) - Optional
----------------------------------

The assigned MAC address

Format: hostname

``dnsName`` (string) - Optional
-------------------------------

The assigned DNS name

Format: hostname

``publicIpAddress`` (string) - Optional
---------------------------------------

The assigned public IP address

Format: ip

``privateIpAddress`` (string) - Optional
----------------------------------------

The assigned private IP address

Format: ip

``ipVersion`` (integer) - Optional
----------------------------------

Indicates IP version 4 or 6

**Options**

* 4
* 6