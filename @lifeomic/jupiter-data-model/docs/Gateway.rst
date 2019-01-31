``Gateway``
===========

A gateway/proxy that can be a system/appliance or software service, such as a network router or application gateway.

Includes properties from:

* `Entity <Entity.html>`_
* `Metadata <Metadata.html>`_

category (array of string) - Required
-------------------------------------

The category of the Gateway (corresponds to which OSI layer does the Proxy operates at).

**Options**

* network
* application
* data
* other

function (array of string) - Required
-------------------------------------

The function of the Gateway

**Options**

* routing
* nat
* api-gateway
* content-filtering
* content-distribution
* load-balancing
* firewall
* ssl-termination
* reverse-proxy
* remote-access-gateway
* application-protection
* intrusion-detection
* intrusion-prevention
* mail-filtering
* malware-protection
* other

public (boolean) - Required
---------------------------

Indicates if the Gateway is open to public access