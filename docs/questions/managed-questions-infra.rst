.. This file is generated in jupiter-provision-managed-questions.
   Do not edit by hand as this document will be overwritten when
   jupiter-provision-managed-questions is deployed!

==============
Infrastructure
==============

What are directly connected to the Internet?
--------------------------------------------

Find all the entities with an edge directly connected to the Internet

**Tags:** ``infra``, ``network``, ``SecOps``

Queries
+++++++

- ::

    Find (Internet|everyone) that relates to * return tree

What production resources are directly connected/exposed to the Internet/everyone?
----------------------------------------------------------------------------------

Find all production entities, except for firewalls and gateways, with an edge directly connected to the Internet or everyone

**Tags:** ``infra``, ``network``, ``SecOps``, ``compliance``, ``PCI DSS``

Queries
+++++++

- ::

    Find (Internet|Everyone) that relates to * with tag.Production=true and _class!='Firewall' and _class!='Gateway' as resource return resource.tag.AccountName, resource._type, resource.name, resource.classification, resource.description

Compliance Mappings
+++++++++++++++++++

**PCI DSS:** ``1.3``

Are there potential IP collisions among the networks/subnets in my environment?
-------------------------------------------------------------------------------

Find any two Network entities within the same account or service that have identical IP CIDR address.

**Tags:** ``infra``, ``network``, ``SecOps``

Queries
+++++++

- ::

    Find Network as n1 that has (Service|Account) as env that has Network as n2 where n1.CIDR=n2.CIDR return n1.displayName, n1.CIDR, n1.region, n2.displayName, n2.CIDR, n2.region, env.displayName, env.tag.AccountName order by env.tag.AccountName

What hosts or devices are connected to my internal networks?
------------------------------------------------------------

Lists Host and Device entities that are connected to (i.e. relates to) internal Network entities.

**Tags:** ``infra``, ``network``, ``compliance``, ``HIPAA``, ``HITRUST CSF``

Queries
+++++++

- ::

    Find (Host|Device) that relates to Network with internal=true

Compliance Mappings
+++++++++++++++++++

**HITRUST CSF:** ``01.k``

Show all inbound SSH firewall rules across my network environments.
-------------------------------------------------------------------

Returns ingress firewall rules that match port 22 and the incoming source.

**Tags:** ``infra``, ``network``, ``SecOps``

Queries
+++++++

- ::

    Find Firewall as fw that ALLOWS as rule * as src where rule.ingress=true and (rule.fromPort=22 or rule.toPort=22) return fw.displayName, rule.fromPort, rule.toPort, src.displayName, src.ipAddress, src.CIDR

Is inbound SSH allowed directly from an external host or network?
-----------------------------------------------------------------

Returns ingress firewall rules that include port 22 in the allowed range from an external host or network.

**Tags:** ``infra``, ``network``, ``SecOps``

Queries
+++++++

- ::

    Find Firewall as fw that ALLOWS as rule (Host|Network) with internal=false or internal=undefined as src where rule.ingress=true and (rule.fromPort<=22 and rule.toPort>=22) return fw.displayName, rule.fromPort, rule.toPort, src.displayName, src.ipAddress, src.CIDR

What network traffic is allowed between internal and external (i.e. between trusted and untrusted) networks?
------------------------------------------------------------------------------------------------------------

Find all Firewall entities and rules that allow traffic to/from an external Network or Host.

**Tags:** ``infra``, ``network``, ``SecOps``, ``compliance``, ``CIS Controls``, ``HIPAA``, ``HITRUST CSF``, ``PCI DSS``

Queries
+++++++

- ::

    Find Firewall as fw that ALLOWS as r (Network|Host) with internal=undefined or internal=false as n return fw.tag.AccountName, fw._type, fw.displayName, fw.description, r.ipProtocol, r.fromPort, r.toPort, n.displayName, n.CIDR, n.ipAddress

Compliance Mappings
+++++++++++++++++++

**CIS Controls:** ``12.2``

**HITRUST CSF:** ``09.m``

**PCI DSS:** ``1.2``

Is there proper segmentation/segregation of internal networks?
--------------------------------------------------------------

Find all internal networks and show their purpose, environment and associated network-layer security gateway/firewall protection.

**Tags:** ``infra``, ``network``, ``compliance``, ``CIS Controls``, ``HIPAA``, ``HITRUST CSF``, ``PCI DSS``

Queries
+++++++

- ::

    Find Network with internal=true as n that (HAS|CONTAINS|CONNECTS|PROTECTS) (Gateway|Firewall) with category='network' as g return n.displayName as Network, n._type as NetworkType, n.CIDR as CIDR, n.tag.AccountName as Account, n.internal as Internal, g.displayName as Gateway, g._type as GatewayType

Compliance Mappings
+++++++++++++++++++

**CIS Controls:** ``12.1``

**HITRUST CSF:** ``01.m``

**PCI DSS:** ``1.1``

Are wireless networks segmented and protected by firewalls?
-----------------------------------------------------------

Find all wireless networks and show their connected router/gateway and firewall.

**Tags:** ``infra``, ``network``, ``compliance``, ``HIPAA``, ``HITRUST CSF``

Queries
+++++++

- ::

    Find Network with wireless=true as n that (HAS|CONTAINS|CONNECTS|PROTECTS) (Gateway|Firewall) with category='network' as g that (CONNECTS|ALLOWS|PERMITS|DENIES|REJECTS) as r * return n.displayName as Network, n._type as NetworkType, n.cidr as CIDR, n.environment as Environment, g.displayName as Gateway, g._type as GatewayType, r._class, r.ipProtocol, r.fromPort, r.toPort

Compliance Mappings
+++++++++++++++++++

**HITRUST CSF:** ``09.m``

Show listing of network layer firewall protection across all my environments.
-----------------------------------------------------------------------------

Lists Firewall instances and the Networks they each protects.

**Tags:** ``infra``, ``network``, ``compliance``, ``HIPAA``, ``HITRUST CSF``

Queries
+++++++

- ::

    Find Firewall as f that PROTECTS Network as n return f.displayName as firewall, n.displayName as network

Compliance Mappings
+++++++++++++++++++

**HITRUST CSF:** ``07.a``, ``09.m``

Organizations shall implement controls to ensure the security of information in networks, and the protection of connected services from unauthorized access.

Are there VPN configured for remote access?
-------------------------------------------

Lists Host, Device, or Network entities that contains the keyword 'vpn' in its properties.

**Tags:** ``infra``, ``network``, ``vpn``, ``compliance``, ``HIPAA``, ``HITRUST CSF``

Queries
+++++++

- ::

    'vpn' with _class='Host' or _class='Device' or _class='Network'

Compliance Mappings
+++++++++++++++++++

**HITRUST CSF:** ``01.j``, ``09.s``

Virtual private networks (VPN) shall be implemented for remote access into internal systems and network environments.