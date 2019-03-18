.. This file is generated in jupiter-provision-managed-questions.
   Do not edit by hand as this document will be overwritten when
   jupiter-provision-managed-questions is deployed!

=========
Endpoints
=========

Whose endpoint is out of compliance?
------------------------------------

Find employees whose endpoint device did not meet your defined configuration compliance.

**Tags:** ``endpoint``, ``SecOps``

Queries
+++++++

- ::

    Find Person that OWNS Device that (MONITORS|MANAGES|PROTECTS) HostAgent with compliant=false

Is there anybody who does not have a user endpoint device (e.g. a laptop or workstation)?
-----------------------------------------------------------------------------------------

Find employees who do not have an endpoint device being mapped and tracked in the system.

**Tags:** ``endpoint``, ``SecOps``

Queries
+++++++

- ::

    Find Person that !OWNS (user_endpoint|laptop|workstation|desktop)

What is the configuration and compliance status of my endpoint devices?
-----------------------------------------------------------------------

Returns all endpoint Devices and their relevant compliance status, such as disk encryption, host firewall, auto-update, and screensaver protection. Secondly, returns hosts or devices that do not have either an endpoint configuration or compliance agent protection.

**Tags:** ``endpoint``, ``compliance``, ``HIPAA``, ``HITRUST CSF``

Queries
+++++++

- ::

    Find HostAgent with compliant=true that (MONITORS|MANAGES) (user_endpoint|workstation|laptop|desktop|tablet)

- ::

    Find HostAgent with compliant=false that (MONITORS|MANAGES) (user_endpoint|workstation|laptop|desktop|tablet)

- ::

    Find (user_endpoint|workstation|laptop|desktop|tablet) that !(MONITORS|MANAGES) HostAgent with function='endpoint-compliance' or function='endpoint-configuration'

Compliance Mappings
+++++++++++++++++++

**HITRUST CSF:** ``01.x``, ``01.y``, ``06.d``, ``10.h``

Systems shall be configured according to a current security baseline. Use full-disk encryption to protect the confidentiality of information on laptops and other mobile devices. Also, enable local host firewall, auto install of OS patches/updates, and screen lock with password protection.

Is there malware protection for all endpoints?
----------------------------------------------

Returns all endpoint Devices and their anti-malware Host Agents. Secondly, returns devices that do not have anti-malware agent protection.

**Tags:** ``endpoint``, ``compliance``, ``CIS Controls``, ``HIPAA``, ``HITRUST CSF``, ``PCI DSS``

Queries
+++++++

- ::

    Find HostAgent with function='anti-malware' as a that PROTECTS (user_endpoint|workstation|laptop|desktop|server) as h return a.displayName, h.displayName, h.owner

- ::

    Find (user_endpoint|workstation|laptop|desktop|server) that !PROTECTS HostAgent with function='anti-malware'

Compliance Mappings
+++++++++++++++++++

**CIS Controls:** ``8.1``

**HITRUST CSF:** ``10.h``

**PCI DSS:** ``5.1``

Is there protection for all user endpoints/devices?
---------------------------------------------------

Returns all user endpoints and their Host Agents. Secondly, returns user endpoints that do not have any monitoring or protection by a host agent.

**Tags:** ``endpoint``, ``compliance``, ``HIPAA``, ``HITRUST CSF``

Queries
+++++++

- ::

    Find HostAgent that (PROTECTS|MANAGES|MONITORS) user_endpoint

- ::

    Find user_endpoint that !(PROTECTS|MANAGES|MONITORS) HostAgent

Compliance Mappings
+++++++++++++++++++

**HITRUST CSF:** ``01.g``

Is operating system patching and auto update enabled on endpoint hosts?
-----------------------------------------------------------------------

Returns all user endpoints that has either enabled or disabled automatic operating system updates in two lists.

**Tags:** ``endpoint``, ``compliance``, ``CIS Controls``, ``HIPAA``, ``HITRUST CSF``, ``PCI DSS``

Queries
+++++++

- ::

    Find HostAgent with automaticOsUpdates='ON' and automaticSecurityUpdates='ON' as agent that (PROTECTS|MONITORS|MANAGES) user_endpoint as device return device.displayName, device.owner, agent.automaticOsUpdates, agent.automaticSecurityUpdates

- ::

    Find HostAgent with automaticOsUpdates='OFF' or automaticSecurityUpdates='OFF' as agent that (PROTECTS|MONITORS|MANAGES) user_endpoint as device return device.displayName, device.owner, agent.automaticOsUpdates, agent.automaticSecurityUpdates

Compliance Mappings
+++++++++++++++++++

**CIS Controls:** 

**HITRUST CSF:** ``01.x``, ``01.y``

**PCI DSS:** 

Is application patching and auto update enabled on endpoint hosts?
------------------------------------------------------------------

Returns all user endpoints that has either enabled or disabled automatic application updates in two lists.

**Tags:** ``endpoint``, ``compliance``, ``CIS Controls``, ``HIPAA``, ``HITRUST CSF``, ``PCI DSS``

Queries
+++++++

- ::

    Find HostAgent with automaticAppUpdates='ON' as agent that (PROTECTS|MONITORS|MANAGES) user_endpoint as device return device.displayName, device.owner, agent.automaticAppUpdates

- ::

    Find HostAgent with automaticAppUpdates='OFF' as agent that (PROTECTS|MONITORS|MANAGES) user_endpoint as device return device.displayName, device.owner, agent.automaticAppUpdates

Compliance Mappings
+++++++++++++++++++

**CIS Controls:** 

**HITRUST CSF:** ``01.x``, ``01.y``

**PCI DSS:** 

Are my servers and systems protected by hosted-based firewall?
--------------------------------------------------------------

Returns all user endpoints that has local firewall turned on or off in two lists.

**Tags:** ``infra``, ``host``, ``compliance``, ``CIS Controls``, ``HIPAA``, ``HITRUST CSF``, ``PCI DSS``

Queries
+++++++

- ::

    Find HostAgent with firewall='ON' as agent that (PROTECTS|MONITORS|MANAGES) user_endpoint as device return device.displayName, device.owner, agent.firewall

- ::

    Find HostAgent with firewall!='ON' as agent that (PROTECTS|MONITORS|MANAGES) user_endpoint as device return device.displayName, device.owner, agent.firewall

Compliance Mappings
+++++++++++++++++++

**CIS Controls:** 

**HITRUST CSF:** ``01.x``, ``01.y``

**PCI DSS:** ``1.4``

Are there security agents monitoring and protecting my endpoint hosts/devices?
------------------------------------------------------------------------------

Returns all endpoint Hosts or Devices and their Host Agents. Secondly, returns devices that do not have any monitoring or protection by a host agent.

**Tags:** ``endpoint``, ``compliance``, ``HIPAA``, ``HITRUST CSF``

Queries
+++++++

- ::

    Find HostAgent as a that (PROTECTS|MANAGES|MONITORS) (Host|Device) as h return a.displayName, a._type, a.function, h.displayName, h.owner

- ::

    Find (Host|Device) with _type!='mapped_entity' that !(PROTECTS|MANAGES|MONITORS) HostAgent

Compliance Mappings
+++++++++++++++++++

**HITRUST CSF:** ``09.ab``

Is operating system patching and auto update enabled on endpoint hosts?
-----------------------------------------------------------------------

Returns all endpoint Hosts that has either enabled or disabled automatic operating system updates in two lists.

**Tags:** ``endpoint``, ``compliance``, ``CIS Controls``, ``HIPAA``, ``HITRUST CSF``, ``PCI DSS``

Queries
+++++++

- ::

    Find (Host|HostAgent) with automaticOsUpdates='ON' and automaticSecurityUpdates='ON'

- ::

    Find (Host|HostAgent) with automaticOsUpdates='OFF' or automaticSecurityUpdates='OFF'

Compliance Mappings
+++++++++++++++++++

**CIS Controls:** ``3.4``

**HITRUST CSF:** ``01.y``, ``10.m``

**PCI DSS:** ``6.2``

Is application patching and auto update enabled on endpoint hosts?
------------------------------------------------------------------

Returns all endpoint Hosts that has either enabled or disabled automatic application updates in two lists.

**Tags:** ``endpoint``, ``compliance``, ``CIS Controls``, ``HIPAA``, ``HITRUST CSF``, ``PCI DSS``

Queries
+++++++

- ::

    Find (Host|HostAgent) with automaticAppUpdates='ON'

- ::

    Find (Host|HostAgent) with automaticAppUpdates='OFF'

Compliance Mappings
+++++++++++++++++++

**CIS Controls:** ``3.5``

**HITRUST CSF:** ``01.y``, ``10.m``

**PCI DSS:** ``6.2``

Are my servers and systems protected by hosted-based firewall?
--------------------------------------------------------------

Lists Firewall instances and the Hosts they each protect. Additionally, to identify gaps, returns a list of active Host or Device entities that do not have local firewall enabled or a PROTECTS relationship connection to a Firewall entity.

**Tags:** ``infra``, ``host``, ``compliance``, ``CIS Controls``, ``HIPAA``, ``HITRUST CSF``, ``PCI DSS``

Queries
+++++++

- ::

    Find Firewall as f that PROTECTS Host as h return f.displayName as firewall, h.displayName as host

- ::

    Find (Host|Device) with firewall='ON'

- ::

    Find (Host|Device) with firewall!='ON' and active=true that !PROTECTS Firewall

Compliance Mappings
+++++++++++++++++++

**CIS Controls:** ``9.4``

**HITRUST CSF:** ``07.a``, ``09.ab``, ``10.h``

Implement host-based / local firewalls to monitor and prevent unauthorized access attempts. The organization shall maintain information systems according to a current baseline configuration and configure system security parameters to prevent misuse. The operating system shall have in place supporting technical controls such as antivirus, file integrity monitoring, host-based (personal) firewalls or port filtering tools, and logging as part of their baseline.

**PCI DSS:** 

What are the approved server/system images?
-------------------------------------------

Lists all system images. Standard approved system images should be used to build servers and hosts. Images should be updated regularly to include the latest security patches and application/OS updates.

**Tags:** ``infra``, ``host``, ``compliance``, ``CIS Controls``, ``HIPAA``, ``HITRUST CSF``, ``PCI DSS``

Queries
+++++++

- ::

    Find Image

Compliance Mappings
+++++++++++++++++++

**CIS Controls:** ``5.1``, ``5.2``

**HITRUST CSF:** ``10.h``

**PCI DSS:** ``2.2``

Are all system images updated in the past six months?
-----------------------------------------------------

Lists all system images that have (or have not) been updated in the past 6 months.

**Tags:** ``infra``, ``host``, ``compliance``, ``CIS Controls``, ``HIPAA``, ``HITRUST CSF``, ``PCI DSS``

Queries
+++++++

- ::

    Find Image with createdOn > date.now - 6 months

- ::

    Find Image with createdOn < date.now - 6 months

Compliance Mappings
+++++++++++++++++++

**CIS Controls:** ``5.1``, ``5.2``

**HITRUST CSF:** ``10.h``

**PCI DSS:** ``2.2``

Which hosts are (or are not) using approved standard images?
------------------------------------------------------------

Lists all server and container instances using approved standard images and those that are not, in two listings.

**Tags:** ``infra``, ``host``, ``compliance``, ``CIS Controls``, ``HIPAA``, ``HITRUST CSF``, ``PCI DSS``

Queries
+++++++

- ::

    Find (aws_instance|docker_container|server) as h that USES Image as i return h._type, h.displayName, h.tag.AccountName, i._type, i.displayName

- ::

    Find (aws_instance|docker_container|server) with active=true that !USES Image

Compliance Mappings
+++++++++++++++++++

**CIS Controls:** ``5.1``, ``5.2``

**HITRUST CSF:** ``10.h``

**PCI DSS:** ``2.2``

Which devices have been disposed in the last 12 months?
-------------------------------------------------------

Returns a list of devices with a 'disposed' status and last updated within 12 months.

**Tags:** ``compliance``, ``HIPAA``, ``HITRUST CSF``

Queries
+++++++

- ::

    Find Device with status='disposed' and _beginOn > date.now-24hrs

Compliance Mappings
+++++++++++++++++++

**HITRUST CSF:** ``08.k``