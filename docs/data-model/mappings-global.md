# Global Mappings

## `jupiterone_account <-OWNS- <ROOT>`

## `security_policy <-HAS- <ROOT>`

## `(Service|Control|Team) -IMPLEMENTS-> security_procedure`

> **Source Filters**
>
>   * `function = !null`
>   * `inUse = !false`
>   * `active = !false`

> **Target Filters**
>
>   * `function = source.function`

## `employee <-EMPLOYS- <ROOT>`

## `Domain <-OWNS- <ROOT>`

## `Organization -HAS-> Person`

> **Target Filters**
>
>   * `email = source.members`

## `Team -HAS-> Person`

> **Target Filters**
>
>   * `email = source.members`

## `Team <-MANAGES- Person`

> **Target Filters**
>
>   * `email = source.supervisor`

## `Team <-HAS- Organization`

> **Source Filters**
>
>   * `organization = !null`

> **Target Filters**
>
>   * `_key = source.organization`

## `Team <-HAS- <ROOT>`

> **Source Filters**
>
>   * `organization = null`

## `Document <-APPROVED- Person`

> **Target Filters**
>
>   * `email = source.approvedBy`

## `Document <-CREATED- Person`

> **Target Filters**
>
>   * `email = source.createdBy`

## `Document <-UPDATED- Person`

> **Target Filters**
>
>   * `email = source.updatedBy`

## `(Account|Application|DataStore|Host|Product) <-MANAGES- (Person|Team|UserGroup)`

> **Target Filters**
>
>   * `_key = source.owner`

## `(Account|Application|DataStore|Host|Product) <-MANAGES- (Person|Team|UserGroup)`

> **Target Filters**
>
>   * `email = [toLowerCase(source.owner),toLowerCase(source.email)]`

## `Domain <-HAS- Organization`

> **Target Filters**
>
>   * `domains = source.name`

## `Domain <-MANAGES- Person`

> **Target Filters**
>
>   * `email = source.contactEmails`

## `DomainRecord -CONNECTS-> (Host|IpAddress|NetworkInterface|Gateway|Cluster)`

> **Source Filters**
>
>   * `type = (A|AAAA|CNAME)`

> **Target Filters**
>
>   * `publicIpAddress = source.value`

## `DomainRecord -CONNECTS-> (Gateway|Host|Cluster)`

> **Source Filters**
>
>   * `type = (A|AAAA|CNAME)`

> **Target Filters**
>
>   * `dnsName = source.value`

## `DomainRecord -CONNECTS-> (Gateway|Host|Cluster)`

> **Source Filters**
>
>   * `type = (A|AAAA|CNAME)`

> **Target Filters**
>
>   * `domainName = source.value`

## `DomainRecord -CONNECTS-> (Gateway|Host|Cluster)`

> **Source Filters**
>
>   * `type = (A|AAAA|CNAME)`

> **Target Filters**
>
>   * `aliases = source.value`

## `DomainRecord -CONNECTS-> (Gateway|Host|Cluster)`

> **Source Filters**
>
>   * `type = (A|AAAA|CNAME)`

> **Target Filters**
>
>   * `fqdn = source.value`

## `DomainRecord -CONNECTS-> DomainRecord`

> **Source Filters**
>
>   * `type = CNAME`

> **Target Filters**
>
>   * `name = source.value`

## `DomainZone <-HAS- Domain`

> **Target Filters**
>
>   * `name = source.parentDomain`

## `Certificate <-HAS- (Domain|DomainZone)`

> **Target Filters**
>
>   * `name = [source.domainName,source.alternativeNames]`

## `User -IS-> Person`

> **Target Filters**
>
>   * `email = toLowerCase(source.email)`

## `User -IS-> Person`

> **Target Filters**
>
>   * `userId = [toLowerCase(source.id),toLowerCase(source.userId),toLowerCase(source.username)]`

## `User -IS-> Person`

> **Target Filters**
>
>   * `aliases = toLowerCase(source.email)`

## `User -IS-> Person`

> **Target Filters**
>
>   * `name = source.name`

## `User -IS-> Person`

> **Target Filters**
>
>   * `displayName = source.displayName`

## `Person <-IS- User`

> **Target Filters**
>
>   * `email = source.email`

## `Person <-IS- User`

> **Target Filters**
>
>   * `username = source.email`

## `Person <-MANAGES- Person`

> **Target Filters**
>
>   * `employeeId = [toLowerCase(source.managerId),toLowerCase(source.manager)]`

## `Person <-MANAGES- Person`

> **Target Filters**
>
>   * `userId = [toLowerCase(source.managerId),toLowerCase(source.manager)]`

## `Person <-MANAGES- Person`

> **Target Filters**
>
>   * `email = [toLowerCase(source.managerEmail),toLowerCase(source.manager)]`

## `Person <-MANAGES- Person`

> **Target Filters**
>
>   * `name = source.manager`

## `Person <-MANAGES- Person`

> **Target Filters**
>
>   * `displayName = source.manager`

## `(Finding|Vulnerability) <-HAS- Host`

> **Source Filters**
>
>   * `_integrationType = !qualys`
>   * `open = true`

> **Target Filters**
>
>   * `id = source.targets`

## `(Finding|Vulnerability) <-HAS- Host`

> **Source Filters**
>
>   * `_integrationType = !qualys`
>   * `open = true`

> **Target Filters**
>
>   * `name = source.targets`

## `(Finding|Vulnerability) <-HAS- Host`

> **Source Filters**
>
>   * `_integrationType = !qualys`
>   * `open = true`

> **Target Filters**
>
>   * `fqdn = source.targets`

## `(Finding|Vulnerability) <-HAS- Host`

> **Source Filters**
>
>   * `_integrationType = !qualys`
>   * `open = true`

> **Target Filters**
>
>   * `hostname = source.targets`

## `(Finding|Vulnerability) <-HAS- Host`

> **Source Filters**
>
>   * `_integrationType = !qualys`
>   * `open = true`

> **Target Filters**
>
>   * `address = source.targets`

## `(Finding|Vulnerability) <-HAS- Host`

> **Source Filters**
>
>   * `_integrationType = !qualys`
>   * `open = true`

> **Target Filters**
>
>   * `ipAddress = source.targets`

## `(Finding|Vulnerability) <-HAS- Host`

> **Source Filters**
>
>   * `_integrationType = !qualys`
>   * `open = true`

> **Target Filters**
>
>   * `publicIpAddress = source.targets`

## `(Finding|Vulnerability) <-HAS- Host`

> **Source Filters**
>
>   * `_integrationType = !qualys`
>   * `open = true`

> **Target Filters**
>
>   * `privateIpAddress = source.targets`

## `(Finding|Vulnerability) <-HAD- Host`

> **Source Filters**
>
>   * `_integrationType = !qualys`
>   * `open = false`

> **Target Filters**
>
>   * `id = source.targets`

## `(Finding|Vulnerability) <-HAD- Host`

> **Source Filters**
>
>   * `_integrationType = !qualys`
>   * `open = false`

> **Target Filters**
>
>   * `name = source.targets`

## `(Finding|Vulnerability) <-HAD- Host`

> **Source Filters**
>
>   * `_integrationType = !qualys`
>   * `open = false`

> **Target Filters**
>
>   * `fqdn = source.targets`

## `(Finding|Vulnerability) <-HAD- Host`

> **Source Filters**
>
>   * `_integrationType = !qualys`
>   * `open = false`

> **Target Filters**
>
>   * `hostname = source.targets`

## `(Finding|Vulnerability) <-HAD- Host`

> **Source Filters**
>
>   * `_integrationType = !qualys`
>   * `open = false`

> **Target Filters**
>
>   * `address = source.targets`

## `(Finding|Vulnerability) <-HAD- Host`

> **Source Filters**
>
>   * `_integrationType = !qualys`
>   * `open = false`

> **Target Filters**
>
>   * `ipAddress = source.targets`

## `(Finding|Vulnerability) <-HAD- Host`

> **Source Filters**
>
>   * `_integrationType = !qualys`
>   * `open = false`

> **Target Filters**
>
>   * `publicIpAddress = source.targets`

## `(Finding|Vulnerability) <-HAD- Host`

> **Source Filters**
>
>   * `_integrationType = !qualys`
>   * `open = false`

> **Target Filters**
>
>   * `privateIpAddress = source.targets`

## `(Finding|Vulnerability) <-HAS- (CodeRepo|Project|Application)`

> **Source Filters**
>
>   * `_integrationType = !qualys`
>   * `open = true`

> **Target Filters**
>
>   * `name = source.targets`

## `(Finding|Vulnerability) <-HAD- (CodeRepo|Project|Application)`

> **Source Filters**
>
>   * `_integrationType = !qualys`
>   * `open = false`

> **Target Filters**
>
>   * `name = source.targets`

## `(Finding|Vulnerability) <-HAS- CodeRepo`

> **Source Filters**
>
>   * `_integrationType = !qualys`
>   * `open = true`

> **Target Filters**
>
>   * `fullName = source.targets`

## `(Finding|Vulnerability) <-HAD- CodeRepo`

> **Source Filters**
>
>   * `_integrationType = !qualys`
>   * `open = false`

> **Target Filters**
>
>   * `fullName = source.targets`

## `(Finding|Risk|Vulnerability) <-IDENTIFIED- Assessment`

> **Source Filters**
>
>   * `_integrationType = !(azure|qualys)`

> **Target Filters**
>
>   * `name = source.assessment`

## `(Finding|Risk|Vulnerability) <-IDENTIFIED- Assessment`

> **Source Filters**
>
>   * `_integrationType = !(azure|qualys)`

> **Target Filters**
>
>   * `_key = source.assessment`

## `ThreatIntel <-HAS- Vulnerability`

> **Target Filters**
>
>   * `id = source.vulnId`

## `Assessment <-PERFORMED- Person`

> **Target Filters**
>
>   * `email = [source.assessor,source.assessors]`

## `Assessment -TARGETS-> Vendor`

> **Target Filters**
>
>   * `name = source.vendor`

## `Device <-OWNS- Person`

> **Target Filters**
>
>   * `email = [toLowerCase(source.owner),toLowerCase(source.email),toLowerCase(source.username)]`

## `Device <-OWNS- Person`

> **Target Filters**
>
>   * `userId = [toLowerCase(source.username),toLowerCase(source.userId)]`

## `Device <-HAS- Person`

> **Target Filters**
>
>   * `userId = toLowerCase(source.users)`

## `Device <-HAS- Person`

> **Target Filters**
>
>   * `email = toLowerCase(source.users)`

## `Vendor <-MANAGES- Person`

> **Target Filters**
>
>   * `email = [source.owner,source.owners,source.admins]`

## `Vendor <-APPROVES- PR`

> **Target Filters**
>
>   * `webLink = source.approvalPRLink`

## `Vendor <-APPROVES- PR`

> **Target Filters**
>
>   * `displayName = source.approvalPRName`

## `Account <-HOSTS- Vendor`

> **Target Filters**
>
>   * `name = source.vendor`

> **Transferred Properties**
>
>   * `_type = toLowerCase(source.vendor)`
>   * `name = source.vendor`
>   * `displayName = source.vendor`

## `CodeRepo <-HAS- Application`

> **Target Filters**
>
>   * `name = source.application`

> **Transferred Properties**
>
>   * `name = source.application`

## `CodeRepo -DEFINES-> Function`

> **Target Filters**
>
>   * `name = [source.name,source.functions]`

## `Product -HAS-> Project`

> **Target Filters**
>
>   * `key = source.projectKey`

## `Module -REQUIRES-> Module`

> **Target Filters**
>
>   * `id = source.requires`