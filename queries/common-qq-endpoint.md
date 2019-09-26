# Servers and Endpoints

## Who is responsible for patching a system in account/zone/tier/layer/VPC/SG?

Returns the owner of hosts in a particular account:

```j1ql
Find Host with tag.AccountName = '{AccountName}' as h
  return h.displayName, h.owner
```

Returns the owner of images used by hosts in a particular account:

```j1ql
Find Host with tag.AccountName = '{AccountName}' as h
  that uses Image as i
  return h.displayName, h.owner, i.displayName, i.owner
```

## Which devices are not compliant? 

```j1ql
Find HostAgent with compliant=false as agent
  that (MONITORS|MANAGES|PROTECTS) Device as device
return
  agent._type, agent.displayName, agent.status, agent.compliant,
  device._type, device.displayName, device.hostname,
  device.platform, device.platformName, device.osVersion,
  device.hardwareModel, device.owner
```

## Is required security control/application {} installed?

_To be added._

## Which endpoints tagged as {} do not have security control installed?

_To be added._
