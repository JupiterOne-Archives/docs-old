# Common Questions and Queries

Here are some commonly asked questions and their corresponding J1QL queries.
You can easily modify the properties and tags used in each query to customize
it for your own specific scenario.

Many of these are included as packaged questions in the Query Library directly
accessible in the Landing app in JupiterOne.

## Hardware/software inventory and configuration

**What Workloads are in my environment?**

```j1ql
Find Workload

Find Workload with tag.AccountName='{accountName}'
```

**What are my production systems and servers?**

_(and what are those systems there to do?)_

```j1ql
Find (Host|Database) with tag.Production=true

Find (Host|Database) with tag.AccountName='{accountName}'
```

**What are my production resources?**

```j1ql
Find (Application|CodeRepo|Workload|Function|Task|Host|Device|Database|DataStore)
  with tag.Production=true

Find (Application|CodeRepo|Workload|Function|Task|Host|Device|Database|DataStore)
  with tag.AccountName='{accountName}'

// You can also use `Find *` but that query might be slow
```

**What are my production data stores and databases?**

```j1ql
Find (DataStore|Database) with tag.Production=true

Find (DataStore|Database) with tag.AccountName='{accountName}'
```

**What are my production applications?**

```j1ql
Find Application with tag.Production = true

Find Application with tag.AccountName='{accountName}'
```

**What are my network assets?**

```j1ql
// 'mapped_entity' are resources that are not directly from the integrations
Find Network with _type!='mapped_entity'

// You can use this to find "external" resources
Find Network with _type='mapped_entity'

Find (Gateway|Firewall) with category='network'
```

**Which devices are/are not auto-scaling?**

```j1ql
Find aws_instance that has aws_autoscaling_group

Find aws_instance that !has aws_autoscaling_group
```

**What are the tiers of infrastructure?**

_TBD_

**How many devices are in each service priority?**

_TBD_

**What are the TTL of devices in each service priority or architectural tier or with tag type {}?**

_TBD_

**What information assets are missing metadata for data classification, tier of service or architectural tier?**

```j1ql
Find (Host|DataStore|Workload|Task) with tag.Classification = undefined
```

**What applications and operating systems are in use?**

```j1ql
Find Host as h return h.platform
```

_A 'Group By' capability will be added to J1QL soon to return objects or count
by unique property values._

**Who owns a production system in account/zone/tier/layer/VPC/SG?**

```j1ql
Find (Host|DataStore|Workload|Task|Application)
  with tag.AccountName = '{accountName}' as system
  return system.displayName, system.owner

Find (Host|DataStore|Workload|Task|Application) as system
  that relates to aws_vpc with vpcId='{vpcId}' or name='{vpcName}'
  return system.displayName, system.owner

Find (Host|DataStore|Workload|Task|Application) as system
  that relates to aws_security_group with groupId='{sgId}' or name='{sgName}'
  return system.displayName, system.owner
```

**How many systems were added to environment {} in last time period?**

```j1ql
// example for last time period = 24 hours
Find * with _tag.AccountName='{accountName}' and _createdOn > date.now - 24hrs
```

**How many systems were added to environment {} interactively vs automated?**

_TBD_

**What container images, VM images, and software packages are available in my production environments?**

_Container entities/relationships are to be added when we support ECS, EKS, ECR
and Fargate._

**What are the tags assigned to any inventory asset?**

_This is best viewed in the Asset Inventory app by selecting an entity and going
to the "Tags" tab in the properties panel._

## Running applications and processes

_We plan to add deeper integration with endpoint protection and device management
solutions to obtain services and processes information on hosts._

_Note that you can also add custom data by writing a script to call the J1 APIs._

**What are the running services?**

_To be added._

**What are the running processes?**

_To be added._

**What processes were running in time period {}?**

_To be added._

**What certificates are installed?**

_To be added._

**What certificates are used for which service?**

_Host level certificates details to be added later. You can query for ACM
certificates in AWS._

```j1ql
// Returns a graph of the resources that uses certificates
Find Certificate that relates to * return tree

// Find certificates that are set to expire within 30 days
Find Certificate with expiresOn < date.now + 30days
```

**What versions of software do I have running?**

_To be added._

**What versions of software do I have installed but not used?**

_To be added._

**Is Security control type {} installed?**

_To be added._

**Where is Security control {} not installed for matching tag {}?**

_To be added._

**When was the last time a service or server runtime was refreshed / updated / cycled?**

```j1ql
// Returns EC2 instances and the AMI images they are using, and the creation timestamp of the AMI
Find Host as h that uses Image as i
  return
    h.tag.AccountName, h.displayName, h.instanceId,
    i.displayName, i.imageId, i.createdOn
  order by
    h.tag.AccountName

// Returns Lambda functions and when they were last updated
Find Function as f
  return f.tag.AccountName, f.displayName, f.updatedOn, f.lastModified
  order by f.tag.AccountName
```

## Secrets and key management

**What SSH keys exist on system {}?**

```j1ql
// Find all SSH keys in an AWS account
Find aws_key_pair with tag.AccountName='{accountName}'

// You can also use the abstract class
Find AccessKey with usage='ssh' and tag.AccountName='{accountName}'

// Find key usage and returns a graph
Find aws_key_pair that relates to Host return tree

// Find key usaga and returns a table with specific properties
Find aws_key_pair as key that relates to Host as h
  return key.displayName,
    h.displayName, h.instanceId, h.region, h.classification, h.tag.AccountName
```

**What SSH keys exist on system {} without link to employee?**

_The linkage will be mapped when we start processing cloudtrail events._

**What secrets (vault, kms, etc...) can a service access and what is that service able to do with them?**

```j1ql
Find aws_kms_key that uses * return tree
```

## Network connections & zones

**What network traffic is allowed between internal and external (i.e. between trusted and untrusted) networks?**

```j1ql
Find Firewall as fw
  that ALLOWS as r (Network|Host) with internal=undefined or internal=false as n
  return
    fw.tag.AccountName, fw._type, fw.displayName, fw.description,
    r.ipProtocol, r.fromPort, r.toPort,
    n.displayName, n.CIDR, n.ipAddress
  order by
    fw.tag.AccountName
```

**What production resources are directly connected/exposed to the Internet/everyone?**

```j1ql
Find (Internet|Everyone)
  that relates to * with
    tag.Production=true and
    _class!='Firewall' and
    _class!='Gateway' as resource
  return
    resource.tag.AccountName, resource._type,
    resource.name, resource.description,
    resource.classification
  order by
    resource.tag.AccountName
```

**What endpoints directly connected to the Internet?**

```j1ql
Find aws_subnet with public=true as n
  that HAS aws_instance as i
  that PROTECTS aws_security_group as sg
  that ALLOWS as rule Internet
  return
    n.displayName as subnet,
    i.displayName as instance,
    sg.displayName as SG, sg.groupId, sg.vpcId as VPC,
    sg.tag.AccountName as Account, sg.webLink,
    rule.ipProtocol, rule.fromPort, rule.toPort

// Returns a graph instead
Find aws_subnet with public=true as n
  that HAS aws_instance as i
  that PROTECTS aws_security_group as sg
  that ALLOWS as rule Internet
  return tree
```

**What storage is directly connected to the internet?**

```j1ql
// Find databases that are public
Find Database with public=true

// Find data stores (including AWS S3 buckets) that allows public access
Find DataStore that allows Everyone
```

**What are my proxies, relays or load balancers?**

```j1ql
Find Gateway

// Network layer gateways including AWS internet gateways, network load balancers, etc.
Find Gateway with category='network'

// Application layer gateways including API gateways, application load balancers, etc.
Find Gateway with category='application'

// More specifically, find AWS ELB application and network load balancers
Find (aws_alb|aws_nlb)
```

**Are there potential IP collisions among the networks/subnets in my environment?**

```j1ql
// Find subnets within the same VPC with the same CIDR
Find Network as n1 that has aws_vpc as env that has Network as n2
  where n1.CIDR=n2.CIDR
  return
    n1.displayName, n1.CIDR, n1.region,
    n2.displayName, n2.CIDR, n2.region,
    env.displayName, env.tag.AccountName
  order by env.tag.AccountName


// Find VPCs in the same AWS account that have the same CIDR
Find aws_vpc as n1 that has (Account|Service) as env that has aws_vpc as n2
  where n1.CIDR=n2.CIDR
  return
    n1.displayName, n1.CIDR, n1.region,
    n2.displayName, n2.CIDR, n2.region,
    env.displayName, env.tag.AccountName
  order by env.tag.AccountName

// Filters out default VPCs
Find aws_vpc with defaultVpc!=true as n1
  that has (Account|Service) as env
  that has aws_vpc with defaultVpc!=true as n2
  where n1.CIDR=n2.CIDR
  return
    n1.displayName, n1.CIDR, n1.region,
    n2.displayName, n2.CIDR, n2.region,
    env.displayName, env.tag.AccountName
  order by env.tag.AccountName
```

**Are wireless networks segmented and protected by firewalls?**

_Requires an integration such as Cisco Meraki, or by adding the wireless network
configuration information via the J1 API._

```j1ql
Find Network with wireless=true as n
  that (HAS|CONTAINS|CONNECTS|PROTECTS) (Gateway|Firewall) with category='network' as g
  that (CONNECTS|ALLOWS|PERMITS|DENIES|REJECTS) as r *
  return
    n.displayName as Network, n._type as NetworkType, n.cidr as CIDR, n.environment as Environment,
    g.displayName as Gateway, g._type as GatewayType, r._class, r.ipProtocol, r.fromPort, r.toPort
```

**Are there VPN configured for remote access?**

```j1ql
// Performs a full text search to see if any indexed data that matches the
// search string 'vpn' is a VPN Host, a VPN Device, a VPN Network or a VPN Gateway
'vpn' with _class='Host' or _class='Device' or _class='Network' or _class='Gateway'
```

**Is there proper segmentation/segregation of networks?**

```j1ql
Find Network with internal=true as n
  that (HAS|CONTAINS|CONNECTS|PROTECTS) (Gateway|Firewall) with category='network' as g
  return
    n.displayName as Network,
    n._type as NetworkType,
    n.CIDR as CIDR,
    n.tag.AccountName as Account,
    n.internal as Internal,
    g.displayName as Gateway,
    g._type as GatewayType
```

**Show all inbound SSH firewall rules across my network environments.**

```j1ql
Find Firewall as fw
  that ALLOWS as rule * as src
  where rule.ingress=true and rule.ipProtocol='tcp' and rule.fromPort<=22 and rule.toPort>=22
  return
    fw.displayName,
    rule.ipProtocol, rule.fromPort, rule.toPort,
    src.displayName, src.ipAddress, src.CIDR
```

**Is inbound SSH allowed directly from an external host or network?**

```j1ql
Find Firewall as fw
  that ALLOWS as rule (Host|Network) with internal=false or internal=undefined as src
  where rule.ingress=true and rule.ipProtocol='tcp' and rule.fromPort<=22 and rule.toPort>=22
  return
    fw.displayName,
    rule.fromPort, rule.toPort,
    src.displayName, src.ipAddress, src.CIDR
```

**Show listing of network layer firewall protection or SGs across all my environments.**

```j1ql
Find Firewall as f that PROTECTS Network as n
  return f.displayName as firewall, n.displayName as network

Find Firewall with category='network'
```

**Show cross-vpc/network trust (i.e. what services in one hosting env are configured to trust services in another)**

_TBD_

## Data Security

**Show all resources without a data classification tag {}?**

```j1ql
Find (Host|DataStore) with classification = undefined

// Returns a count instead
Find (Host|DataStore) with classification = undefined as e return count(e)
```

**Show all resources without a data classification tag in VPC with tag {}?**

```j1ql
// Filter by a tag on the VPC
Find (Host|DataStore|Workload) with classification = undefined
  that relates to aws_vpc with tag.{tagName} = '{tagValue}'

// Filter by vpcId or name
Find (Host|DataStore|Workload) with classification = undefined
  that relates to aws_vpc with vpcId='{vpcId}' or name='{name}'
```

**What are all the resources without encryption with data security tag '{Restricted}'?**

```j1ql
Find DataStore with encrypted!=true and classification='Restricted'

// Sometimes is also interesting to find unencrypted data that is non-public
Find DataStore with encrypted!=true and classification!='Public'
```

## Changes and attribution

**What changes were made in environment, SG or VPC in last time period {}?**

```j1ql

```

**What changes were made by person with access type {}?**

_This will be captured when we start processing cloudtrail events._

**What changes were made by automated tools?**

_This will be captured when we start processing cloudtrail events._

**What changes were made with interactive sessions?**

_This will be captured when we start processing cloudtrail events._


## Risks

**Which applications are vulnerable?**

_Requires at least one application scanner integration such as Veracode or WhiteHat._

```j1ql
Find (Application|CodeRepo) as app that has (Finding|Vulnerability) as vuln
  return
    app._type, app.displayName,
    vuln._type, vuln.displayName, vuln.severity, vuln.numericSeverity
```

**Which systems/instances are vulnerable?**

_Requires enabling AWS Inspector and/or GuardDuty._

```j1ql
Find (Host|Workload|DataStore) as system that has (Finding|Vulnerability) as vuln
  return
    system._type, system.displayName,
    vuln._type, vuln.displayName, vuln.severity, vuln.numericSeverity
```

**Who is responsible for patching a system in account/zone/tier/layer/VPC/SG?**

```j1ql
// Returns the owner of hosts in a particular account
Find Host with tag.AccountName = '{AccountName}' as h
  return h.displayName, h.owner

// Returns the owner of images used by hosts in a particular account
Find Host with tag.AccountName = '{AccountName}' as h
  that uses Image as i
  return h.displayName, h.owner, i.displayName, i.owner
```

**What open vulnerabilities do I have?**

```j1ql
Find (Finding|Vulnerability) with open=true
```

**Do I have proper vendor support for my software applications?**

```j1ql
// This returns data that is derived from a SSO application
// Requires integration with Okta or OneLogin or similar SSO identity provider
Find Application as app that
  CONNECTS Account that RELATES TO Vendor as v
  return app.displayName as app, v.name as vendor, v.linkToSLA, v.linkToMSA

// Or in a more generic way
Find Application that RELATES TO (Vendor|Account)

// Returns all applications that does not have a vendor or vendor account associated
Find Application that !RELATES TO (Vendor|Account)
```

**Are all system images updated in the past six months?**

```j1ql
// Find images that have been updated within 6 months
Find Image with createdOn > date.now - 6 months

// Find images that have not be updated within 6 months
Find Image with createdOn < date.now - 6 months
```

**What are the approved server/system images?**

```j1ql
// Find private images or the ones that have been specifically approved
Find Image with public=false or approved=true
```

**Who are my vendors? Do I have a BAA/DPA/NDA/MSA and SLA/Support Agreement with them?**

```j1ql
Find Vendor
```

_This is best viewed in the Asset Inventory app by selecting the Vendor class
from the quick filter._

## Identity, People and Privileged access

_Most of these queries depend on proper mapping of custom properties or profile
attributes from your HR system or identity provider to the Person/employee
entities._

**Who are the new hires within the last 12 months?**

```j1ql
// If you have been using JupiterOne for more than a year
Find employee with _createdOn > date.now-12months

// If your employee source data is Okta
Find okta_user with created > date.now-12months
```

**Who are the contractors?**

```j1ql
// Requires mapping from your HR system or IdP to capture the employment type
Find employee with employment = 'contractor'

// If you have a user group called 'Contractors'
Find User that (has|assigned) UserGroup with displayName='Contractors'
```

**Who are remote workers?**

```j1ql
// If the user or employee entity has a remote flag
Find (user|employee) with remote=true

// If you have a user group called 'Remote'
Find User that (has|assigned) UserGroup with displayName='Remote'
```

**Who are the employees missing metadata about role?**

```j1ql
Find employee with role=undefined
```

**Who are the employees missing metadata about team or department?**

```j1ql
Find employee with department=undefined

Find employee that !relates to Team
```

**Who are the employees missing metadata about team or department with access to environment?**

```j1ql
Find employee with department=undefined
  that is User
  that relates to (Account|AccessRole|UserGroup|Service)
    with tag.AccountName = '{accountName}'
```

**Who are the employees missing metadata about team or department with privileged access?**

```j1ql
Find employee with department=undefined
  that is User
  that assigned (AccessPolicy|AccessRole) with admin=true

Find employee with department=undefined
  that is User
  that assigned AccessRole
  that assigned AccessPolicy with admin=true
```

**Who or what service has been assigned permissions with administrator/privileged access?**

```j1ql
Find AccessPolicy with admin=true as policy
  that ASSIGNED * as e
  return policy.displayName, policy.webLink, e._type, e.displayName, e.webLink
```

**Who is able to make changes in a production data connected environment, and what changes can they make?**

_We plan to do more in-depth analysis of AWS IAM policies to determine access.
In the meantime, we determine admin access based on policy name and you can run
the following query to find them._

```j1ql
Find AccessPolicy with admin=true as policy and tag.AccountName='{accountName}'
  that ASSIGNED (AccessRole|User) as e
  return policy.displayName, policy.webLink, e._type, e.displayName, e.webLink
```

**What groups are an employee or contractor a member of?**

```j1ql
'Joe Adams' as employee that relates to (Team|Group) as group
  return
    employee._type, employee.displayName, employee.email,
    group._type, group.displayName
```

**What service accounts have been granted access to production data services or sources?**

_TBD_

**What uses static authentication credentials (people, services) vs grant type credentials (saml, oidc)?**

```j1ql
Find (User|UserGroup) that assigned AccessPolicy

Find AccessRole that assigned AccessPolicy
```

## Development

**Were there any Code Repos added in the last 24 hours?**

```j1ql
Find CodeRepo with _beginOn > date.now-24hr and _version=1
```

**Which PRs did this developer open in the last 5 days?**

```j1ql
// For a developer whose first name is Charlie
'Charlie' that OPENED PR with _createdOn > date.now - 5days as PR
  return PR.displayName, PR.name
```

**Who are the most recent contributors to this repo?**

_This is particularly useful to identify who might be the best person to fix a
newly discovered vulnerability._

```j1ql
Find User as u
  that OPENED PR as PR
  that HAS CodeRepo with name='repo-name' as repo
  return
    u.displayName, u.username,
    PR.displayName, PR.name, PR._createdOn, repo.name
  order by PR._createdOn
  limit 5
```

**What are the code repos for a particular application or project?**

```j1ql
Find CodeRepo that relates to (Application|Project) with name='JupiterOne'
```
