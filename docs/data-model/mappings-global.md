
# Global Mappings

## `jupiterone_account <-OWNS- <ROOT>`

## `security_policy <-HAS- <ROOT>`

## `employee <-EMPLOYS- <ROOT>`

## `Organization -HAS-> Person`

> **Target Filters**
> 
>   * `email = source.members`

## `Domain <-HAS- Organization`

> **Target Filters**
> 
>   * `domains = source.name`

## `Domain <-MANAGES- Person`

> **Target Filters**
> 
>   * `email = source.contactEmails`

## `User -IS-> Person`

> **Target Filters**
> 
>   * `email = toLowerCase(source.email)`

## `User -IS-> Person`

> **Target Filters**
> 
>   * `name = source.name`

## `User -IS-> Person`

> **Target Filters**
> 
>   * `displayName = source.displayName`

## `User -IS-> Person`

> **Target Filters**
> 
>   * `userId = [toLowerCase(source.id),toLowerCase(source.userId),toLowerCase(source.username)]`

## `User -IS-> Person`

> **Target Filters**
> 
>   * `aliases = toLowerCase(source.email)`

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
>   * `name = source.manager`

## `(Finding|Vulnerability) <-HAS- (CodeRepo|Project|Application|Host)`

> **Source Filters**
> 
>   * `open = true`

> **Target Filters**
> 
>   * `name = source.targets`

## `(Finding|Vulnerability) <-HAD- (CodeRepo|Project|Application|Host)`

> **Source Filters**
> 
>   * `open = false`

> **Target Filters**
> 
>   * `name = source.targets`

## `(Finding|Vulnerability) <-HAS- (aws_instance|aws_db_instance)`

> **Source Filters**
> 
>   * `open = true`

> **Target Filters**
> 
>   * `instanceId = source.targets`

## `(Finding|Vulnerability) <-HAD- (aws_instance|aws_db_instance)`

> **Source Filters**
> 
>   * `open = false`

> **Target Filters**
> 
>   * `instanceId = source.targets`

## `(Finding|Vulnerability) <-HAS- CodeRepo`

> **Source Filters**
> 
>   * `open = true`

> **Target Filters**
> 
>   * `full_name = source.targets`

## `(Finding|Vulnerability) <-HAD- CodeRepo`

> **Source Filters**
> 
>   * `open = false`

> **Target Filters**
> 
>   * `full_name = source.targets`

## `(Finding|Risk|Vulnerability) <-IDENTIFIED- Assessment`

> **Target Filters**
> 
>   * `name = source.assessment`

## `(Finding|Risk|Vulnerability) <-IDENTIFIED- Assessment`

> **Target Filters**
> 
>   * `_key = source.assessment`

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
>   * `email = [toLowerCase(source.owner),toLowerCase(source.email)]`

## `Device <-OWNS- Person`

> **Target Filters**
> 
>   * `userId = [toLowerCase(source.users),toLowerCase(source.username),toLowerCase(source.userId)]`

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
>   * `_type = toLowerCase(source.vendor)`> 
>   * `name = source.vendor`> 
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

