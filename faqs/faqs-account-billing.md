# Account and billing related FAQs

## What are entities? And how are they counted for usage/billing?

An `entity` is a `node` stored in the JupiterOne graph database. Entities
typically come from an integration. They can also be added via the Asset
Inventory web app or API (custom scripts).

Each entity represents an object from your organization's digital operational
environment. Examples include an AWS EC2 instance, RDS DB cluster, RDS DB
instance, IAM role, IAM policy, user endpoint, etc.

The following entities are not counted for billing/usage calculation:

- **Mapped Entities** -- these are entities with `_source='system-mapper'`
  property. These are entities derived by the JupiterOne Mapper, such as an
  external Network or Host entity created because a security group contains a
  rule pointing to it.

- **System Internal Entities** -- these are entities with `_source='system-internal'`
  property. These are internal JupiterOne system/app generated resources that
  are mapped to the graph as entities, such as `compliance_standard`, 
  `compliance_requirement`, etc.

- **Findings and PRs** -- these entities are considered "event-like" and not
  true resources in an digital operating environment, therefore they are not
  being counted for usage/billing purpose.

- **Images, NetworkInterfaces, and IpAddress** -- these entities are also not
  counted against the usage or billing.

- **Records and DomainRecords** -- records such as DNS records, Jira issues are not considered
  as billable.

Billable entities count is averaged daily, and again monthly. This can be viewed
by going to **Settings** -> **Account Management** in the JupiterOne web UI.

There is a soft-limit on non-billable entitites. Depending on your JupiterOne
subscription plan, the soft-limit is 2x, 5x or 10x of the total billable
entities limit.

> For example, if your purchased the Enterprise Premier plan with 50,000 billable
> entities, you can have up to 500,000 non-billable entities.

You can also Run the following query in your account to get a live count of your
billable entities:

```j1ql
Find * with
  _source !^= 'system-' and
  _class !=
    ('Finding' and 'PR' and 'Image' and 'NetworkInterface' and 'IpAddress' and 'Record' and 'DomainRecord')
  as e
return
  count(e) as billableEntityCount
```

<details>
  <summary style='cursor: pointer;'><strong>🚩 Entity Reference Table</strong></summary>

<!--THE FOLLOW SECTION IS AUTO-GENERATED. DO NOT EDIT.-->
<!--BEGIN Entity Billing Reference table-->

Entity             | Description             | Billable
------             | -----------             | --------
`AccessKey`        | A key used to grant access, such as ssh-key, access-key, api-key/token, mfa-token/device, etc. | Yes 
`AccessPolicy`     | A policy for access control assigned to a Host, Role, User, UserGroup, or Service. | Yes 
`AccessRole`       | An access control role mapped to a Principal (e.g. user, group, or service). | Yes 
`Account`          | An organizational account for a service or a set of services (e.g. AWS, Okta, Bitbucket Team, Google G-Suite account, Apple Developer Account). Each Account should be connected to a Service. | Yes 
`Application`      | A software product or application. | Yes 
`ApplicationEndpoint` | An application endpoint is a program interface that either initiates or receives a request, such as an API. | Yes 
`Assessment`       | An object to represent an assessment, including both compliance assessment such as a HIPAA Risk Assessment or a technical assessment such as a Penetration Testing. Each assessment should have findings (e.g. Vulnerability or Risk) associated. | Yes 
`Attacker`         | An attacker or threat actor. | Yes 
`Backup`           | A specific repository or data store containing backup data. | Yes 
`Certificate`      | A digital Certificate such as an SSL or S/MIME certificate. | Yes 
`Channel`          | A communication channel, such as a Slack channel or AWS SNS topic. | Yes 
`Cluster`          | A cluster of compute or database resources/workloads. | Yes 
`CodeCommit`       | A code commit to a repo. The commit id is captured in the _id property of the Entity. | Yes 
`CodeDeploy`       | A code deploy job. | Yes 
`CodeModule`       | A software module. Such as an npm_module or java_library. | Yes 
`CodeRepo`         | A source code repository. A CodeRepo is also a DataRepository therefore should carry all the required properties of DataRepository. | Yes 
`CodeReview`       | A code review record. | Yes 
`Configuration`    | A Configuration contains definitions that describe a resource such as a Task, Deployment or Workload. For example, an `aws_ecs_task_definition` is a `Configuration`. | Yes 
`Container`        | A standard unit of software that packages up code and all its dependencies and configurations. | Yes 
`Control`          | A security or IT Control. A control can be implemented by a vendor/service, a person/team, a program/process, an automation code/script/configuration, or a system/host/device. Therefore, this is most likely an additional Class applied to a Service (e.g. Okta SSO), a Device (e.g. a physical firewall), or a HostAgent (e.g. Carbon Black CbDefense Agent). Controls are mapped to security policy procedures and compliance standards/requirements. | Yes 
`ControlPolicy`    | An technical or operational policy with rules that govern (or enforce, evaluate, monitor) a security control. | Yes 
`CryptoKey`        | A key used to perform cryptographic functions, such as an encryption key. | Yes 
`DataObject`       | An individual data object, such as an aws-s3-object, sharepoint-document, source-code, or a file (on disk). The exact data type is described in the _type property of the Entity. | Yes 
`DataStore`        | A virtual repository where data is stored, such as aws-s3-bucket, aws-rds-cluster, aws-dynamodb-table, bitbucket-repo, sharepoint-site, docker-registry. The exact type is described in the _type property of the Entity. | Yes 
`Database`         | A database cluster/instance. | Yes 
`Deployment`       | A deployment of code, application, infrastructure or service. For example, a Kubernetes deployment. An auto scaling group is also considered a deployment. | Yes 
`Device`           | A physical device or media, such as a server, laptop, workstation, smartphone, tablet, router, firewall, switch, wifi-access-point, usb-drive, etc. The exact data type is described in the _type property of the Entity. | Yes 
`Directory`        | Directory, such as LDAP or Active Directory. | Yes 
`Disk`             | A disk storage device such as an AWS EBS volume | Yes 
`Document`         | A document or data object. | Yes 
`Domain`           | An internet domain. | Yes 
`DomainRecord`     | The DNS Record of a Domain Zone. | No 
`DomainZone`       | The DNS Zone of an Internet Domain. | Yes 
`Finding`          | A security finding, which may be a vulnerability or just an informative issue. A single finding may impact one or more resources. The `IMPACTS` relationship between the Vulnerability and the resource entity that was impacted serves as the record of the finding. The `IMPACTS` relationship carries properties such as 'identifiedOn', 'remediatedOn', 'remediationDueOn', 'issueLink', etc. | No 
`Firewall`         | A piece of hardware or software that protects a network/host/application. | Yes 
`Framework`        | An object to represent a standard compliance or technical security framework. | Yes 
`Function`         | A virtual application function. For example, an aws_lambda_function, azure_function, or google_cloud_function | Yes 
`Gateway`          | A gateway/proxy that can be a system/appliance or software service, such as a network router or application gateway. | Yes 
`Group`            | A defined, generic group of Entities. This could represent a group of Resources, Users, Workloads, DataRepositories, etc. | Yes 
`Host`             | A compute instance that itself owns a whole network stack and serves as an environment for workloads. Typically it runs an operating system. The exact host type is described in the _type property of the Entity. The UUID of the host should be captured in the _id property of the Entity | Yes 
`HostAgent`        | A software agent or sensor that runs on a host/endpoint. | Yes 
`Image`            | A system image. For example, an AWS AMI (Amazon Machine Image). | No 
`Incident`         | An operational or security incident. | Yes 
`Internet`         | The Internet node in the graph. There should be only one Internet node. | No 
`IpAddress`        | An re-assignable IpAddress resource entity. Do not create an entity for an IP Address _configured_ on a Host. Use this only if the IP Address is a reusable resource, such as an Elastic IP Address object in AWS. | No 
`Key`              | An ssh-key, access-key, api-key/token, pgp-key, etc. | Yes 
`Logs`             | A specific repository or destination containing application, network, or system logs. | Yes 
`Module`           | A software or hardware module. Such as an npm_module or java_library. | Yes 
`Network`          | A network, such as an aws-vpc, aws-subnet, cisco-meraki-vlan. | Yes 
`NetworkEndpoint`  | A network endpoint for connecting to or accessing network resources. For example, NFS mount targets or VPN endpoints. | Yes 
`NetworkInterface` | An re-assignable software defined network interface resource entity. Do not create an entity for a network interface _configured_ on a Host. Use this only if the network interface is a reusable resource, such as an Elastic Network Interface object in AWS. | No 
`Organization`     | An organization, such as a company (e.g. JupiterOne) or a business unit (e.g. HR). An organization can be internal or external. Note that there is a more specific Vendor class. | Yes 
`PR`               | A pull request. | No 
`PasswordPolicy`   | A password policy is a specific `Ruleset`. It is separately defined because of its pervasive usage across digital environments and the well known properties (such as length and complexity) unique to a password policy. | Yes 
`Person`           | An entity that represents an actual person, such as an employee of an organization. | Yes 
`Policy`           | A written policy documentation. | Yes 
`Procedure`        | A written procedure and control documentation. A Procedure typically `IMPLEMENTS` a parent Policy. An actual Control further `IMPLEMENTS` a Procedure. | Yes 
`Process`          | A compute process -- i.e. an instance of a computer program / software application that is being executed by one or many threads. This is NOT a program level operational process (i.e. a Procedure). | Yes 
`Product`          | A product developed by the organization, such as a software product. | Yes 
`Program`          | A program. For example, a bug bounty/vuln disclosure program. | Yes 
`Project`          | A software development project. Can be used for other generic projects as well but the defined properties are geared towards software development projects. | Yes 
`Queue`            | A scheduling queue of computing processes or devices. | Yes 
`Record`           | A DNS record; or an official record (e.g. Risk); or a written document (e.g. Policy/Procedure); or a reference (e.g. Vulnerability/Weakness). The exact record type is captured in the _type property of the Entity. | No 
`Repository`       | A repository that contains resources. For example, a Docker container registry repository hosting Docker container images. | Yes 
`Requirement`      | An individual requirement for security, compliance, regulation or design. | Yes 
`Resource`         | A generic assignable resource. A resource is typically non-functional by itself unless used by or attached to a host or workload. | Yes 
`Review`           | A review record. | Yes 
`Risk`             | An object that represents an identified Risk as the result of an Assessment. The collection of Risk objects in JupiterOne make up the Risk Register. A Control may have a `MITIGATES` relationship to a Risk. | Yes 
`Root`             | The root node in the graph. There should be only one Root node per organization account. | Yes 
`Rule`             | An operational or configuration compliance rule, often part of a Ruleset. | Yes 
`Ruleset`          | An operational or configuration compliance ruleset with rules that govern (or enforce, evaluate, monitor) a security control or IT system. | Yes 
`Scanner`          | A system vulnerability, application code or network infrastructure scanner. | Yes 
`Section`          | An object to represent a section such as a compliance section. | Yes 
`Service`          | A service provided by a vendor. | Yes 
`Site`             | The physical location of an organization. A Person (i.e. employee) would typically has a relationship to a Site (i.e. located_at or work_at). Also used as the abstract reference to AWS Regions. | Yes 
`Standard`         | An object to represent a standard such as a compliance or technical standard. | Yes 
`Subscription`     | A subscription to a service or channel. | Yes 
`Task`             | A computational task. Examples include AWS Batch Job, ECS Task, etc. | Yes 
`Team`             | A team consists of multiple member Person entities. For example, the Development team or the Security team. | Yes 
`ThreatIntel`      | Threat intelligence captures information collected from vulnerability risk analysis by those with substantive expertise and access to all-source information. Threat intelligence helps a security professional determine the risk of a vulnerability finding to their organization. | Yes 
`Training`         | A training module, such as a security awareness training or secure development training. | Yes 
`User`             | A user account/login to access certain systems and/or services. Examples include okta-user, aws-iam-user, ssh-user, local-user (on a host), etc. | Yes 
`UserGroup`        | A user group, typically associated with some type of access control, such as a group in Okta or in Office365. If a UserGroup has an access policy attached, and all member Users of the UserGroup would inherit the policy. | Yes 
`Vault`            | A collection of secrets such as a key ring | Yes 
`Vendor`           | An external organization that is a vendor or service provider. | Yes 
`Vulnerability`    | A security vulnerability (application or system or infrastructure). A single vulnerability may relate to multiple findings and impact multiple resources. The `IMPACTS` relationship between the Vulnerability and the resource entity that was impacted serves as the record of the finding. The `IMPACTS` relationship carries properties such as 'identifiedOn', 'remediatedOn', 'remediationDueOn', 'issueLink', etc. | Yes 
`Weakness`         | A security weakness. | Yes 
`Workload`         | A virtual compute instance, it could be an aws-ec2-instance, a docker-container, an aws-lambda-function, an application-process, or a vmware-instance. The exact workload type is described in the _type property of the Entity. | Yes 
\[System Mapped Entities\]   | Entities with `_source='system-mapper'`   | No 
\[System Internal Entities\] | Entities with `_source='system-internal'` | No 
\[Custom Created Entities\]  | Entities created with a custom-defined _class or _type | Yes 

<!--END Entity Billing Reference table-->

</details>

## What are the limitations of the `COMMUNITY` Edition of JupiterOne? 

JupiterOne `COMMUNITY` Edition is FREE for non-commercial use, non-profit or
small teams. It comes with the following features and limitations:

- Configure up to *five* integration instances
- Integrations are limited to WEEKLY scheduled polling or on-demand runs
- Up to 500 entities
- Up to 10 users
- Full featured access to Asset Inventory / CMDB, search, query and 
  graph visualization from query results
- Access to Policies app and full templates library

A paid subscription is required for the following capabilities:

- Daily and hourly data polling and analysis
- Alerts and notifications (email, Jira, Slack)
- Reporting charts and dashboards
- Compliance management, evidence collection with continuous assessment
- Full policy management (build/edit/export policies and procedures) and 
  compliance mapping
- Full API access
- SAML Single Sign On

_Notes:_

- Account in active trial have access to all paid subscription features.
- Trial accounts are automatically converted into `COMMUNITY` edition after
  trial expires.
- The entity limit for a paid account depends on the subscription tier.

## I see a user named "Callisto" on my account. Who is that?

"Callisto" \<callisto@jupiterone.io\> is the account for JupiterOne Support. The
Support User is by default added to a new account during free trial,
proof-of-concept evaluation, or initial account onboarding. This is to
facilitate better support and training on using the platform.

- The support user can be removed by an account administrator at any time,
  should you determine that ongoing regular support is no longer needed.
- You have the option and administrative privilege to add the support user back
  at any time, when support is needed in the future.
