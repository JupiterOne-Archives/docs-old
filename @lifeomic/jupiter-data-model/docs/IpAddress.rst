``IpAddress``
=============

An re-assignable IpAddress resource entity. Do not create an entity for an IP Address _configured_ on a Host. Use this only if the IP Address is a reusable resource, such as an Elastic IP Address object in AWS.

Includes properties from:

* `Entity <Entity.html>`_
* `Metadata <Metadata.html>`_

dnsName (string) - Optional
---------------------------

The assigned DNS name

Format: hostname

publicIpAddress (string) - Optional
-----------------------------------

The assigned public IP address

Format: ip

privateIpAddress (string) - Optional
------------------------------------

The assigned private IP address

Format: ip

ipVersion (integer) - Optional
------------------------------

Indicates IP version 4 or 6

**Options**

* 4
* 6