``Network``
===========

A network, such as an aws-vpc, aws-subnet, cisco-meraki-vlan.

Includes properties from:

* `Entity <Entity.html>`_
* `Metadata <Metadata.html>`_

environment (string) - Required
-------------------------------

The environment of network

**Options**

* development
* test
* staging
* production
* private
* wireless
* guest
* remote-access
* administrative
* other

CIDR (string) - Required
------------------------

The IPv4 network CIDR block (e.g. 0.0.0.0/0)

Format: ipv4

CIDRv6 (string) - Optional
--------------------------

The IPv6 network CIDR block (e.g. ::/0)

Format: ipv6

public (boolean) - Required
---------------------------

Indicates if the network is publicly accessible.

internal (boolean) - Required
-----------------------------

Indicates if this is an internal/private network.

wireless (boolean) - Optional
-----------------------------

Indicates if this is a wireless network.