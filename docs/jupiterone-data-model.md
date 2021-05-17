# JupiterOne Data Model

The **JupiterOne Data Model** is a reference model used to describe digital
resources and the complex interconnections among all the resources in a
technology organization as an **entity-relationship graph**.

The data model is defined by a set of Entities and their Relationships. It
represents a reference model, not a strict or rigid structure.

## Entity

An Entity is a node/vertex in the graph that represents a resource within your
digital infrastructure.

See full data model schema in this [GitHub repo][schema-repo].

### Class and Type of an Entity

Each Entity has a specific **type** that defines what that entity is, and is
assigned one or more higher level **class** that represents a more abstract
categorization or labeling of the entity in the perspective of security and
technical operations.

#### Type

The **type** property represents the specific type that entity is as defined by
the source. For example, an AWS resource may be of type `aws_instance` or
`aws_s3_bucket` or `aws_iam_user`.  

#### Class

The **class** of an entity is considered an abstract, super-type that defines
what that entity is within the general framework of IT and security operations.
In the above example, an `aws_instance` entity has a class of `Host`, while
an `aws_s3_bucket` is a `DataStore`, and an `aws_iam_user` a `User`.

### Common Entity Properties

Most Entities will have the following common properties:

<!--THE FOLLOW SECTION IS AUTO-GENERATED. DO NOT EDIT.-->
<!--BEGIN Common Entity Properties table-->
??? reference "Common Entity Properties Table"

    Property           | Type      | Description
    ---------          | --------  | ------------
    `id`               | `string`,`array` | Identifiers of this entity assigned by the providers. Values are expected to be unique within the provider scope.
    `name`             | `string` | Name of this entity
    `displayName`      | `string` | Display name, e.g. a person's preferred name or an AWS account alias
    `summary`          | `string` | A summary / short description of this entity.
    `description`      | `string` | An extended description of this entity.
    `classification`   | `string`,`null` | The sensitivity of the data; should match company data classification scheme
    `criticality`      | `integer` | A number that represents the value or criticality of this entity, on a scale between 1-10.
    `risk`             | `integer` | The risk level of this entity, on a scale between 1-10.
    `trust`            | `integer` | The trust level of this entity, on a scale between 1-10.
    `complianceStatus` | `number` | The compliance status of the entity, as a percentage of compliancy.
    `status`           | `string` | Status of this entity set by the external source system or by a user, e.g. Active, Inactive, Decommissioned
    `active`           | `boolean` | Indicates if this entity is currently active.
    `public`           | `boolean` | Indicates if this is a public-facing resource (e.g. a public IP or public DNS record) or if the entity is publicly accessible. Default is false.
    `validated`        | `boolean` | Indicates if this node has been validated as a known/valid Entity.
    `temporary`        | `boolean` | Indicates if this node is a temporary resource, such as a lambda instance or an EC2 instance started by ECS.
    `trusted`          | `boolean` | Indicates if this is a trusted resource. For example, a trusted Network, Host, Device, Application, Person, User, or Vendor.
    `createdOn`        | `number` | The timestamp (in milliseconds since epoch) when the entity was created at the source. This is different than `_createdOn` which is the timestamp the entity was first ingested into JupiterOne.
    `updatedOn`        | `number` | The timestamp (in milliseconds since epoch) when the entity was last updated at the source.
    `deletedOn`        | `number` | The timestamp (in milliseconds since epoch) when the entity was deleted at the source.
    `discoveredOn`     | `number` | The timestamp (in milliseconds since epoch) when the entity was discovered.
    `expiresOn`        | `number` | If the entity is a temporary resource, optionally set the expiration date. For example, the expiration date of an SSL cert.
    `createdBy`        | `string` | The source/principal/user that created the entity
    `updatedBy`        | `string` | The source/principal/user that updated the entity
    `deletedBy`        | `string` | The source/principal/user that deleted the entity
    `discoveredBy`     | `string` | The source/principal/user that discovered the entity
    `webLink`          | `string` | Web link to the source. For example: https://console.aws.amazon.com/iam/home#/roles/Administrator. This property is used by the UI to add a hyperlink to the entity.
    `owner`            | `string` | The owner of this entity. This could reference the name of the owner, or as reference ID/key to another entity in the graph as the owner.
    `tags`             | `array` | An array of unnamed tags
    `notes`            | `array` | User provided notes about this entity

<!--END Common Entity Properties table-->

### Class Specific Entity Properties

Each specific class of Entity also has its own defined properties. For example,
a `Person` entity will have properties including `firstName` and `lastName`,
while a `Device` entity may have properties such as `hardwareVendor`,
`hardwareModel`, and `hardwareSerial`.

### Custom Properties

Entities can also have custom properties that are specific to the type of that
entity, defined by the source system where the resource belongs to, or defined
by the individual or team managing the resource.

### Defined Entities

Here is a list of reference entities defined by the JupiterOne Data Model, each with its own defined set of properties in addition to the shared common properties:

<!--THE FOLLOW SECTION IS AUTO-GENERATED. DO NOT EDIT.-->
<!--BEGIN Defined Entities table-->
??? reference "Defined Entities Table"

    Entity             | Description
    ------             | -----------
    `AccessKey`        | A key used to grant access, such as ssh-key, access-key, api-key/token, mfa-token/device, etc.
    `AccessPolicy`     | A policy for access control assigned to a Host, Role, User, UserGroup, or Service.
    `AccessRole`       | An access control role mapped to a Principal (e.g. user, group, or service).
    `Account`          | An organizational account for a service or a set of services (e.g. AWS, Okta, Bitbucket Team, Google G-Suite account, Apple Developer Account). Each Account should be connected to a Service.
    `Application`      | A software product or application.
    `ApplicationEndpoint` | An application endpoint is a program interface that either initiates or receives a request, such as an API.
    `Assessment`       | An object to represent an assessment, including both compliance assessment such as a HIPAA Risk Assessment or a technical assessment such as a Penetration Testing. Each assessment should have findings (e.g. Vulnerability or Risk) associated.
    `Attacker`         | An attacker or threat actor.
    `Backup`           | A specific repository or data store containing backup data.
    `Certificate`      | A digital Certificate such as an SSL or S/MIME certificate.
    `Channel`          | A communication channel, such as a Slack channel or AWS SNS topic.
    `Cluster`          | A cluster of compute or database resources/workloads.
    `CodeCommit`       | A code commit to a repo. The commit id is captured in the _id property of the Entity.
    `CodeDeploy`       | A code deploy job.
    `CodeModule`       | A software module. Such as an npm_module or java_library.
    `CodeRepo`         | A source code repository. A CodeRepo is also a DataRepository therefore should carry all the required properties of DataRepository.
    `CodeReview`       | A code review record.
    `Configuration`    | A Configuration contains definitions that describe a resource such as a Task, Deployment or Workload. For example, an `aws_ecs_task_definition` is a `Configuration`.
    `Container`        | A standard unit of software that packages up code and all its dependencies and configurations.
    `Control`          | A security or IT Control. A control can be implemented by a vendor/service, a person/team, a program/process, an automation code/script/configuration, or a system/host/device. Therefore, this is most likely an additional Class applied to a Service (e.g. Okta SSO), a Device (e.g. a physical firewall), or a HostAgent (e.g. Carbon Black CbDefense Agent). Controls are mapped to security policy procedures and compliance standards/requirements.
    `ControlPolicy`    | An technical or operational policy with rules that govern (or enforce, evaluate, monitor) a security control.
    `CryptoKey`        | A key used to perform cryptographic functions, such as an encryption key.
    `DataObject`       | An individual data object, such as an aws-s3-object, sharepoint-document, source-code, or a file (on disk). The exact data type is described in the _type property of the Entity.
    `DataStore`        | A virtual repository where data is stored, such as aws-s3-bucket, aws-rds-cluster, aws-dynamodb-table, bitbucket-repo, sharepoint-site, docker-registry. The exact type is described in the _type property of the Entity.
    `Database`         | A database cluster/instance.
    `Deployment`       | A deployment of code, application, infrastructure or service. For example, a Kubernetes deployment. An auto scaling group is also considered a deployment.
    `Device`           | A physical device or media, such as a server, laptop, workstation, smartphone, tablet, router, firewall, switch, wifi-access-point, usb-drive, etc. The exact data type is described in the _type property of the Entity.
    `Directory`        | Directory, such as LDAP or Active Directory.
    `Disk`             | A disk storage device such as an AWS EBS volume
    `Document`         | A document or data object.
    `Domain`           | An internet domain.
    `DomainRecord`     | The DNS Record of a Domain Zone.
    `DomainZone`       | The DNS Zone of an Internet Domain.
    `Finding`          | A security finding, which may be a vulnerability or just an informative issue. A single finding may impact one or more resources. The `IMPACTS` relationship between the Vulnerability and the resource entity that was impacted serves as the record of the finding. The `IMPACTS` relationship carries properties such as 'identifiedOn', 'remediatedOn', 'remediationDueOn', 'issueLink', etc.
    `Firewall`         | A piece of hardware or software that protects a network/host/application.
    `Framework`        | An object to represent a standard compliance or technical security framework.
    `Function`         | A virtual application function. For example, an aws_lambda_function, azure_function, or google_cloud_function
    `Gateway`          | A gateway/proxy that can be a system/appliance or software service, such as a network router or application gateway.
    `Group`            | A defined, generic group of Entities. This could represent a group of Resources, Users, Workloads, DataRepositories, etc.
    `Host`             | A compute instance that itself owns a whole network stack and serves as an environment for workloads. Typically it runs an operating system. The exact host type is described in the _type property of the Entity. The UUID of the host should be captured in the _id property of the Entity
    `HostAgent`        | A software agent or sensor that runs on a host/endpoint.
    `Image`            | A system image. For example, an AWS AMI (Amazon Machine Image).
    `Incident`         | An operational or security incident.
    `Internet`         | The Internet node in the graph. There should be only one Internet node.
    `IpAddress`        | An re-assignable IpAddress resource entity. Do not create an entity for an IP Address _configured_ on a Host. Use this only if the IP Address is a reusable resource, such as an Elastic IP Address object in AWS.
    `Key`              | An ssh-key, access-key, api-key/token, pgp-key, etc.
    `Logs`             | A specific repository or destination containing application, network, or system logs.
    `Module`           | A software or hardware module. Such as an npm_module or java_library.
    `Network`          | A network, such as an aws-vpc, aws-subnet, cisco-meraki-vlan.
    `NetworkEndpoint`  | A network endpoint for connecting to or accessing network resources. For example, NFS mount targets or VPN endpoints.
    `NetworkInterface` | An re-assignable software defined network interface resource entity. Do not create an entity for a network interface _configured_ on a Host. Use this only if the network interface is a reusable resource, such as an Elastic Network Interface object in AWS.
    `Organization`     | An organization, such as a company (e.g. JupiterOne) or a business unit (e.g. HR). An organization can be internal or external. Note that there is a more specific Vendor class.
    `PR`               | A pull request.
    `PasswordPolicy`   | A password policy is a specific `Ruleset`. It is separately defined because of its pervasive usage across digital environments and the well known properties (such as length and complexity) unique to a password policy.
    `Person`           | An entity that represents an actual person, such as an employee of an organization.
    `Policy`           | A written policy documentation.
    `Procedure`        | A written procedure and control documentation. A Procedure typically `IMPLEMENTS` a parent Policy. An actual Control further `IMPLEMENTS` a Procedure.
    `Process`          | A compute process -- i.e. an instance of a computer program / software application that is being executed by one or many threads. This is NOT a program level operational process (i.e. a Procedure).
    `Product`          | A product developed by the organization, such as a software product.
    `Program`          | A program. For example, a bug bounty/vuln disclosure program.
    `Project`          | A software development project. Can be used for other generic projects as well but the defined properties are geared towards software development projects.
    `Queue`            | A scheduling queue of computing processes or devices.
    `Record`           | A DNS record; or an official record (e.g. Risk); or a written document (e.g. Policy/Procedure); or a reference (e.g. Vulnerability/Weakness). The exact record type is captured in the _type property of the Entity.
    `Repository`       | A repository that contains resources. For example, a Docker container registry repository hosting Docker container images.
    `Requirement`      | An individual requirement for security, compliance, regulation or design.
    `Resource`         | A generic assignable resource. A resource is typically non-functional by itself unless used by or attached to a host or workload.
    `Review`           | A review record.
    `Risk`             | An object that represents an identified Risk as the result of an Assessment. The collection of Risk objects in JupiterOne make up the Risk Register. A Control may have a `MITIGATES` relationship to a Risk.
    `Root`             | The root node in the graph. There should be only one Root node per organization account.
    `Rule`             | An operational or configuration compliance rule, often part of a Ruleset.
    `Ruleset`          | An operational or configuration compliance ruleset with rules that govern (or enforce, evaluate, monitor) a security control or IT system.
    `Scanner`          | A system vulnerability, application code or network infrastructure scanner.
    `Section`          | An object to represent a section such as a compliance section.
    `Service`          | A service provided by a vendor.
    `Site`             | The physical location of an organization. A Person (i.e. employee) would typically has a relationship to a Site (i.e. located_at or work_at). Also used as the abstract reference to AWS Regions.
    `Standard`         | An object to represent a standard such as a compliance or technical standard.
    `Subscription`     | A subscription to a service or channel.
    `Task`             | A computational task. Examples include AWS Batch Job, ECS Task, etc.
    `Team`             | A team consists of multiple member Person entities. For example, the Development team or the Security team.
    `ThreatIntel`      | Threat intelligence captures information collected from vulnerability risk analysis by those with substantive expertise and access to all-source information. Threat intelligence helps a security professional determine the risk of a vulnerability finding to their organization.
    `Training`         | A training module, such as a security awareness training or secure development training.
    `User`             | A user account/login to access certain systems and/or services. Examples include okta-user, aws-iam-user, ssh-user, local-user (on a host), etc.
    `UserGroup`        | A user group, typically associated with some type of access control, such as a group in Okta or in Office365. If a UserGroup has an access policy attached, and all member Users of the UserGroup would inherit the policy.
    `Vault`            | A collection of secrets such as a key ring
    `Vendor`           | An external organization that is a vendor or service provider.
    `Vulnerability`    | A security vulnerability (application or system or infrastructure). A single vulnerability may relate to multiple findings and impact multiple resources. The `IMPACTS` relationship between the Vulnerability and the resource entity that was impacted serves as the record of the finding. The `IMPACTS` relationship carries properties such as 'identifiedOn', 'remediatedOn', 'remediationDueOn', 'issueLink', etc.
    `Weakness`         | A security weakness.
    `Workload`         | A virtual compute instance, it could be an aws-ec2-instance, a docker-container, an aws-lambda-function, an application-process, or a vmware-instance. The exact workload type is described in the _type property of the Entity.

<!--END Defined Entities table-->

#### Special Entities

There are three special entities defined. These are singleton entities.

Entity             | Description
------             | -----------
`Everyone`         | The global `UserGroup` that represents "everyone" publicly.
`Internet`         | The Internet -- i.e. a `Network` entity with CIDR `"0.0.0.0/0"`.
`Root`             | The entity that represents the top level organization.

## Relationships

A **Relationship** is the edge between two Entity nodes in the graph. The
`_class` of the relationship should be, in most cases, a generic descriptive
verb, such as `HAS` or `IMPLEMENTS`.

Relationships can also carry their own properties.

For example, `CodeRepo -- DEPLOYED TO -> Host` may have `version` as a property
on the `DEPLOYED` relationship. This represents the mapping between a code
repo to multiple deployment targets, while one deployment may be of a different
version of the code than another. Storing the version as a relationship
property allows us to void duplicate instances of the code repo entity to be
created to represent different versions.

Relationships have the same metadata properties as entities, which are managed
by the integration providers.

### Example defined Relationships between abstract Entity Classes

#### HAS / CONTAINS

```text
Account         -- HAS ->             User
Account         -- HAS ->             UserGroup
Account         -- HAS ->             AccessRole
Account         -- HAS ->             Resource
CodeRepo        -- HAS ->             Vulnerability
Host            -- HAS ->             Vulnerability
Organization    -- HAS ->             Site
Organization    -- HAS ->             Organization (e.g. a business unit)
Application     -- HAS ->             Vulnerability
CodeRepo        -- HAS ->             Vulnerability
Host            -- HAS ->             Vulnerability
Service         -- HAS ->             Vulnerability
Site            -- HAS ->             Network
Site            -- HAS ->             Site
UserGroup       -- HAS ->             User
Network         -- CONTAINS ->        Host
Network         -- CONTAINS ->        Database
Network         -- CONTAINS ->        Network (e.g. a subnet)
```

#### IS / OWNS

```text
User            -- IS ->              Person
Vulnerability   -- IS ->              Vulnerability (e.g. a Snyk Vuln IS a CVE)
Person          -- OWNS ->            Device
```

#### EXPLOITS / IMPACTS

```text
Vulnerability   -- EXPLOITS ->        Weakness
Vulnerability   -- IMPACTS  ->        CodeRepo | Application
```

#### USES

```text
Host            -- USES ->            Resource (e.g. aws_instance USES aws_ebs_volume)
```

#### CONNECTS / TRIGGERS / EXTENDS

```text
Application     -- CONNECTS ->        Account
Gateway         -- CONNECTS ->        Network
Gateway         -- TRIGGERS ->        Function
HOST            -- EXTENDS  ->        Resource
```

#### IMPLEMENTS / MITIGATES

```text
Procedure       -- IMPLEMENTS ->      Policy
Control         -- IMPLEMENTS ->      Policy
Control         -- MITIGATES  ->      Risk
```

#### MANAGES

```text
Person          -- MANAGES ->         Person
Person          -- MANAGES ->         Organization
Person          -- MANAGES ->         Team
User            -- MANAGES ->         Account
User            -- MANAGES ->         UserGroup
ControlPolicy   -- MANAGES ->         Control
AccessPolicy    -- MANAGES ->         AccessRole
```

#### EVALUATES / MONITORS / PROTECTS

```text
ControlPolicy   -- EVALUATES ->       <any entity>
HostAgent       -- MONITORS  ->       Host
HostAgent       -- PROTECTS  ->       Host
```

#### TRUSTS

```text
AccessRole      -- TRUSTS ->          AccessRole
AccessRole      -- TRUSTS ->          Service
AccessRole      -- TRUSTS ->          Account
```

#### ASSIGNED

```text
User            -- ASSIGNED ->        Application
User            -- ASSIGNED ->        AccessRole
UserGroup       -- ASSIGNED ->        AccessRole
```

#### IDENTIFIED / PERFORMED / COMPLETED

```text
Person          -- PERFORMED  ->      Assessment
Person          -- COMPLETED  ->      Training
Assessment      -- IDENTIFIED ->      Risk
Assessment      -- IDENTIFIED ->      Vulnerability
```

#### PROVIDES

```text
Vendor          -- PROVIDES ->        Service
```

#### CONTRIBUTES TO

```text
User            -- CONTRIBUTES TO ->  CodeRepo
```

#### OPENED

```text
User            -- OPENED   ->        CodeReview (i.e. PR)
```

#### DEPLOYED TO

```text
CodeRepo        -- DEPLOYED TO ->     Account
CodeRepo        -- DEPLOYED TO ->     Host
CodeRepo        -- DEPLOYED TO ->     Container
CodeRepo        -- DEPLOYED TO ->     Function
```

## What does this look like?

The diagram below is an abstract illustration of the entities and relationships
defined by the data model.

![data-model](../assets/data-model.png)

[schema-repo]: https://github.com/JupiterOne/data-model

[person-team]: ./person-team-relationship.md
