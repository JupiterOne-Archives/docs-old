Firewall
========

A piece of hardware or software that protects a network/host/application.

Includes properties from:

* `Entity <Entity.html>`_
* `Metadata <Metadata.html>`_

``category`` (array of string) - Required
-----------------------------------------

The category of the Firewall. Indicates the scope that the Firewall applies to -- i.e. Network, Host, Application.

**Options**

* network
* host
* application
* other

``isStateful`` (boolean) - Optional
-----------------------------------

Indicates if the rules in the firewall is stateful.