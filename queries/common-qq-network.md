# Network connections & zones

## What network traffic is allowed between internal and external (i.e. between trusted and untrusted) networks?

```j1ql
Find Firewall as fw
  that ALLOWS as r (Network|Host) with
    internal=undefined or internal=false as n
return
  fw.tag.AccountName, fw._type, fw.displayName, fw.description,
  r.ipProtocol, r.fromPort, r.toPort,
  n.displayName, n.CIDR, n.ipAddress
order by
  fw.tag.AccountName
```

## What production resources are directly connected/exposed to the Internet/everyone?

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

## What endpoints directly connected to the Internet?

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
```

Returns a graph instead using `return tree` at the end

```j1ql
Find aws_subnet with public=true as n
  that HAS aws_instance as i
  that PROTECTS aws_security_group as sg
  that ALLOWS as rule Internet
return tree
```

## What storage is directly connected to the internet?

Find databases that are public:

```j1ql
Find Database with public=true
```

Find data stores (including AWS S3 buckets) that allows public access:

```j1ql
Find DataStore that allows Everyone
```

## What are my proxies, relays or load balancers?

```j1ql
Find Gateway
```

Network layer gateways including AWS internet gateways, network load balancers,
etc.:

```j1ql
Find Gateway with category='network'
```

Application layer gateways including API gateways, application load balancers,
etc.:

```j1ql
Find Gateway with category='application'
```

More specifically, find AWS ELB application and network load balancers:

```j1ql
Find (aws_alb|aws_nlb)
```

## Are there potential IP collisions among the networks/subnets in my environment?

Find subnets within the same VPC that have the same CIDR:

```j1ql
Find Network as n1 that has aws_vpc as env that has Network as n2
where
  n1.CIDR=n2.CIDR
return
  n1.displayName, n1.CIDR, n1.region,
  n2.displayName, n2.CIDR, n2.region,
  env.displayName, env.tag.AccountName
order by env.tag.AccountName
```

Find VPCs in the same AWS account that have the same CIDR:

```j1ql
Find aws_vpc as n1
  that has (Account|Service) as env
  that has aws_vpc as n2
where
  n1.CIDR=n2.CIDR
return
  n1.displayName, n1.CIDR, n1.region,
  n2.displayName, n2.CIDR, n2.region,
  env.displayName, env.tag.AccountName
order by env.tag.AccountName
```

Filters out default VPCs:

```j1ql
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

## Are wireless networks segmented and protected by firewalls?

_Requires an integration such as Cisco Meraki, or by adding the wireless network
configuration information via the J1 API._

```j1ql
Find Network with wireless=true as n
  that (HAS|CONTAINS|CONNECTS|PROTECTS) (Gateway|Firewall)
    with category='network' as g
  that (CONNECTS|ALLOWS|PERMITS|DENIES|REJECTS) as r *
return
  n.displayName as Network, n._type as NetworkType,
  n.cidr as CIDR, n.environment as Environment,
  g.displayName as Gateway, g._type as GatewayType,
  r._class, r.ipProtocol, r.fromPort, r.toPort
```

## Are there VPN configured for remote access?

Performs a full text search to see if any indexed data that matches the search
string 'vpn' is a VPN Host, a VPN Device, a VPN Network or a VPN Gateway:

```j1ql
'vpn' with
  _class=('Host' or 'Device' or 'Network' or 'Gateway')
```

## Is there proper segmentation/segregation of networks?

```j1ql
Find Network with internal=true as n
  that (HAS|CONTAINS|CONNECTS|PROTECTS) (Gateway|Firewall)
    with category='network' as g
return
  n.displayName as Network,
  n._type as NetworkType,
  n.CIDR as CIDR,
  n.tag.AccountName as Account,
  n.internal as Internal,
  g.displayName as Gateway,
  g._type as GatewayType
```

## Show all inbound SSH firewall rules across my network environments.

```j1ql
Find Firewall as fw
  that ALLOWS as rule * as src
where rule.ingress=true and
  rule.ipProtocol='tcp' and
  rule.fromPort<=22 and rule.toPort>=22
return
  fw.displayName,
  rule.ipProtocol, rule.fromPort, rule.toPort,
  src.displayName, src.ipAddress, src.CIDR
```

## Is inbound SSH allowed directly from an external host or network?

```j1ql
Find Firewall as fw
  that ALLOWS as rule (Host|Network)
    with internal=false or internal=undefined as src
where
  rule.ingress=true and rule.ipProtocol='tcp' and
  rule.fromPort<=22 and rule.toPort>=22
return
  fw.displayName,
  rule.fromPort, rule.toPort,
  src.displayName, src.ipAddress, src.CIDR
```

## Show listing of network layer firewall protection or SGs across all my environments.

```j1ql
Find Firewall as f that PROTECTS Network as n
return f.displayName as firewall, n.displayName as network
```

```j1ql
Find Firewall with category='network'
```

## Show cross-vpc/network trust (i.e. what services in one hosting env are configured to trust services in another)

_To be added._
