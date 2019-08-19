# JupiterOne Entity Relationship Mappings

JupiterOne stores [entities and relationships][1] representing your
organization's critical resources, their configurations, and their
relationships. Relationships between entities may be explicitly stated in the
APIs of the systems that manage them, and the integrations with those systems
will leverage that information to build relationships in JupiterOne. In other
cases, relationships need to be inferred from properties common to a set of
related entities. This inference can extend across entities from multiple
systems so that relationships can be automatically mapped, given enough context
about how entities are related through their common properties. In some cases,
entities will be generated to represent a resource that doesn't exist as an
expicit thing in your systems, but is implied, such as the Internet.

Entity relationship mappings provide the context necessary to support this
automatic relationship building.

## How Does It Work

Mapping rules are maintained by the JupiterOne engineering team; they cannot be
modified by customers today. However, it is still important to understand how
the mapping rules work because:

1. Entities and relationships that mappings produce will exist in your data,
   though you will not be billed for these
1. Knowing about mappings allows you to leverage the entities and relationships
   they produce in J1 queries
1. Some mappings require customers to add properties to entities so that
   relationships can be inferred

As entities are created and updated, the system will check to see if the entity
matches a mapping rule. This entity is considered the source of the relationship
to build. The target of the relationship is determined by performing a search
according to the mapping's target filter parameters. No relationship is created
when a target is not found.

When more than one entity matches the target filter, a relationship is
established between the source and each target entity.

The target entity will be updated to include properties defined by the mapping
rule. The values of those properties may be static, being explicitly defined in
the rule, or the values may be transferred from the source entity. When multiple
mapping rules resolve to the same target entity, the target entity will
accumulate the properties. This allows for a target to include properties from
any mapped source entity.

The mapper will produce operations to create, update, or delete the target
entities and relationships it manages. The entities produced by the mapper may
themselves match a mapping rule, leading to a cascading effect that builds a
graph of relationships.

Try this J1QL query to see entities produced by the mapper in your J1 account:

`FIND * WITH _source="system-mapper" LIMIT 10`

This query will show some relationships it created:

`FIND * THAT RELATES TO AS r Root WHERE r._source="system-mapper" RETURN r.* LIMIT 10`

## Example Use Cases

### Identifying Accounts That Belong to a Person

Integrations with an identity provider have mapping rules that cause the mapper
to produce a `Person` entity when the users of the IdP have properties that
identify the record as a real person, not a bot or service account. Once that
`Person` entity exists, whenever a `User` entity is produced by any system, the
`User` will be related to the `Person` as well when there are properties that
identify the account with the `Person`, such as an `email` or `username`.

If you have an IdP integration configured, such as Okta or OneLogin, you may
find user accounts that belong to a person:

```
FIND User AS u THAT RELATES TO Person AS p
RETURN u.email, u._type, u.displayName, p.employeeType
LIMIT 5
```

## Relationship Mapping Rules

Mapping rules are maintained by the JupiterOne engineering team, but it is
instructive to see that rules take this basic form:

```json
{
  "sourceFilter": {
    "_class": "Person"
  },
  "relationshipProperties": {
    "_class": "IS"
  },
  "relationshipDirection": "REVERSE",
  "targetFilterKeys": [["_class", "email"], ["_class", "username"]],
  "propertyMappings": [
    {
      "sourceProperty": "email",
      "targetProperty": "email"
    },
    {
      "sourceProperty": "email",
      "targetProperty": "username"
    },
    {
      "targetValue": "User",
      "targetProperty": "_class"
    }
  ],
  "skipTargetCreation": true
}
```

- `"sourceFilter"`: Declares the properties of the source entity that the rule
  matches

- `"relationshipProperties"`: Declares the properties to place on generated
  relationships

- `"relationshipDirection"`: Declares the directionality of the relationship

- `"targetFilterKeys"`: Declares the properties to query when resolving the
  target entities

- `"propertyMappings"`: Declares the properties to assign to target entities and
  provides the values used to search for the target entities

- `"skipTargetCreation"`: Instructs the mapper to avoid creating the target
  entity when it does not already exist

## Mappings

The current mappings are summarized below. The _Global Mappings_ apply to
entities no matter how they are produced, whether by a managed integration or
through the JupiterOne API. Each managed integration may also specify mappings
that are applied only to entities managed by that integration.

The summaries have a title taking the form `SOURCE RELATIONSHIP TARGET`.

* `SOURCE` is always the entity that triggers the mapping configuration. The
  label is the `_class` or `_type` that will be matched. Other match properties
  are listed in the summary body.
* `RELATIONSHIP` is relative to `SOURCE`, and the label of comes from the
  `_class`. 
  * Forward: `-CLASS->`
  * Reverse: `<-CLASS-`
* `TARGET` is determined by a search, or will be created when not found (unless
  `skipTargetCreation`). The label is the `_class` or `_type` that will be
  matched. Other match properties are listed in the summary body.
  
It is important to remember:

* Mapping rules are triggered when a `SOURCE` entity matches. Rules are NOT
  automatically reversed so that relationships are updated when a `TARGET` is
  created/updated.
* Any change to the `SOURCE` entity triggers the mapping rule to be
  evaluated/re-evaluated.
* The **Source Filters** must match an entity or the rule will not trigger. It
  may be necessary to _add properties to entities_ at the source so that when
  they are ingested they will match the rule.
* A rule produces relationships to all `TARGET` entities matching the **Target
  filters**. It may be necessary to _add properties to entities_ at the source
  so that when they are ingested they will match the rule.

### Global Mappings

#### jupiterone_account <-OWNS- <ROOT>

#### security_policy <-HAS- <ROOT>

#### employee <-EMPLOYS- <ROOT>

#### User -IS-> Person

Target Filters
  * email = toLowerCase(source.email)

Transferred Properties
  * email = toLowerCase(source.email)
  * aliases = toLowerCase(source.email)
  * name = source.name
  * displayName = source.displayName
  * userId = [toLowerCase(source.id),toLowerCase(source.userId),toLowerCase(source.username)]

#### User -IS-> Person

Target Filters
  * name = source.name

Transferred Properties
  * email = toLowerCase(source.email)
  * aliases = toLowerCase(source.email)
  * name = source.name
  * displayName = source.displayName
  * userId = [toLowerCase(source.id),toLowerCase(source.userId),toLowerCase(source.username)]

#### User -IS-> Person

Target Filters
  * displayName = source.displayName

Transferred Properties
  * email = toLowerCase(source.email)
  * aliases = toLowerCase(source.email)
  * name = source.name
  * displayName = source.displayName
  * userId = [toLowerCase(source.id),toLowerCase(source.userId),toLowerCase(source.username)]

#### User -IS-> Person

Target Filters
  * userId = [toLowerCase(source.id),toLowerCase(source.userId),toLowerCase(source.username)]

Transferred Properties
  * email = toLowerCase(source.email)
  * aliases = toLowerCase(source.email)
  * name = source.name
  * displayName = source.displayName
  * userId = [toLowerCase(source.id),toLowerCase(source.userId),toLowerCase(source.username)]

#### User -IS-> Person

Target Filters
  * aliases = toLowerCase(source.email)

Transferred Properties
  * email = toLowerCase(source.email)
  * aliases = toLowerCase(source.email)
  * name = source.name
  * displayName = source.displayName
  * userId = [toLowerCase(source.id),toLowerCase(source.userId),toLowerCase(source.username)]

#### Person <-IS- User

Target Filters
  * email = source.email

Transferred Properties
  * email = source.email
  * username = source.email

#### Person <-IS- User

Target Filters
  * username = source.email

Transferred Properties
  * email = source.email
  * username = source.email

#### Person <-MANAGES- Person

Target Filters
  * name = source.manager

Transferred Properties
  * name = source.manager
  * employeeId = source.managerId

#### Person <-MANAGES- Person

Target Filters
  * employeeId = source.managerId

Transferred Properties
  * name = source.manager
  * employeeId = source.managerId

#### (Finding|Vulnerability) <-HAS- (CodeRepo|Project|Application|Host)

Source Filters
  * open = true

Target Filters
  * name = source.targets

Transferred Properties
  * name = source.targets

#### (Finding|Vulnerability) <-HAD- (CodeRepo|Project|Application|Host)

Source Filters
  * open = false

Target Filters
  * name = source.targets

Transferred Properties
  * name = source.targets

#### (Finding|Vulnerability) <-HAS- (aws_instance|aws_db_instance)

Source Filters
  * open = true

Target Filters
  * instanceId = source.targets

Transferred Properties
  * _type = ["aws_instance","aws_db_instance"]
  * instanceId = source.targets

#### (Finding|Vulnerability) <-HAD- (aws_instance|aws_db_instance)

Source Filters
  * open = false

Target Filters
  * instanceId = source.targets

Transferred Properties
  * _type = ["aws_instance","aws_db_instance"]
  * instanceId = source.targets

#### (Finding|Vulnerability) <-HAS- CodeRepo

Source Filters
  * open = true

Target Filters
  * full_name = source.targets

Transferred Properties
  * full_name = source.targets

#### (Finding|Vulnerability) <-HAD- CodeRepo

Source Filters
  * open = false

Target Filters
  * full_name = source.targets

Transferred Properties
  * full_name = source.targets

#### (Finding|Risk|Vulnerability) <-IDENTIFIED- Assessment

Target Filters
  * name = source.assessment

Transferred Properties
  * name = source.assessment
  * _key = source.assessment

#### (Finding|Risk|Vulnerability) <-IDENTIFIED- Assessment

Target Filters
  * _key = source.assessment

Transferred Properties
  * name = source.assessment
  * _key = source.assessment

#### Assessment <-PERFORMED- Person

Target Filters
  * email = [source.assessor,source.assessors]

Transferred Properties
  * email = [source.assessor,source.assessors]

#### Device <-OWNS- Person

Target Filters
  * email = [toLowerCase(source.owner),toLowerCase(source.email)]

Transferred Properties
  * email = [toLowerCase(source.owner),toLowerCase(source.email)]
  * userId = [toLowerCase(source.users),toLowerCase(source.username),toLowerCase(source.userId)]

#### Device <-OWNS- Person

Target Filters
  * userId = [toLowerCase(source.users),toLowerCase(source.username),toLowerCase(source.userId)]

Transferred Properties
  * email = [toLowerCase(source.owner),toLowerCase(source.email)]
  * userId = [toLowerCase(source.users),toLowerCase(source.username),toLowerCase(source.userId)]

#### Vendor <-MANAGES- Person

Target Filters
  * email = [source.owner,source.owners,source.admins]

Transferred Properties
  * email = [source.owner,source.owners,source.admins]

#### Vendor <-APPROVES- PR

Target Filters
  * webLink = source.approvalPRLink

Transferred Properties
  * webLink = source.approvalPRLink
  * displayName = source.approvalPRName

#### Vendor <-APPROVES- PR

Target Filters
  * displayName = source.approvalPRName

Transferred Properties
  * webLink = source.approvalPRLink
  * displayName = source.approvalPRName

#### Account <-HOSTS- Vendor

Target Filters
  * name = source.vendor

Transferred Properties
  * _type = toLowerCase(source.vendor)
  * name = source.vendor
  * displayName = source.vendor

#### CodeRepo <-HAS- Application

Target Filters
  * name = source.application

Transferred Properties
  * name = source.application



### bitbucket Mappings

#### bitbucket_team <-HOSTS- Vendor

Target Filters
  * name = Atlassian

Transferred Properties
  * name = "Atlassian"
  * displayName = "Atlassian"
  * _type = "atlassian"

#### bitbucket_team <-OWNS- <ROOT>

#### bitbucket_user -IS-> Person

Target Filters
  * bitbucketNickname = source.nickname

Transferred Properties
  * bitbucketNickname = source.nickname



### jira Mappings

#### jira_account <-HOSTS- Vendor

Target Filters
  * name = Jira

Transferred Properties
  * name = "Jira"
  * displayName = "Jira"
  * _type = "jira"

#### jira_account <-OWNS- <ROOT>



### whitehat Mappings

#### whitehat_account <-HOSTS- Vendor

Target Filters
  * name = WhiteHat

Transferred Properties
  * name = "WhiteHat"
  * displayName = "WhiteHat"
  * _type = "whitehat"

#### whitehat_scan <-PROVIDES- Vendor

Target Filters
  * name = WhiteHat

Transferred Properties
  * name = "WhiteHat"
  * displayName = "WhiteHat"
  * _type = "whitehat"

#### whitehat_account <-OWNS- <ROOT>



### github Mappings

#### github_account <-HOSTS- Vendor

Target Filters
  * name = GitHub

Transferred Properties
  * name = "GitHub"
  * displayName = "GitHub"
  * _type = "github"

#### github_account <-OWNS- <ROOT>

#### github_user -IS-> Person

Target Filters
  * githubUsername = source.username

Transferred Properties
  * githubUsername = source.username



### threatstack Mappings

#### threatstack_account <-HOSTS- Vendor

Target Filters
  * name = Threat Stack

Transferred Properties
  * name = "Threat Stack"
  * displayName = "Threat Stack"
  * _type = "threatstack"

#### threatstack_account <-OWNS- <ROOT>

#### threatstack_agent -PROTECTS-> Host

Target Filters
  * instanceId = source.instanceId

Transferred Properties
  * instanceId = source.instanceId
  * hostname = source.hostname

#### threatstack_agent -PROTECTS-> Host

Target Filters
  * hostname = source.hostname

Transferred Properties
  * instanceId = source.instanceId
  * hostname = source.hostname



### snyk Mappings

#### snyk_account <-HOSTS- Vendor

Target Filters
  * name = Snyk

Transferred Properties
  * name = "Snyk"
  * displayName = "Snyk"
  * _type = "snyk"

#### snyk_account <-OWNS- <ROOT>



### openshift Mappings

#### openshift_account <-HOSTS- Vendor

Target Filters
  * name = OpenShift

Transferred Properties
  * name = "OpenShift"
  * displayName = "OpenShift"
  * _type = "openshift"

#### openshift_account <-OWNS- <ROOT>



### AWS Mappings

#### aws_account <-HOSTS- Vendor

Target Filters
  * name = Amazon Web Services

Transferred Properties
  * name = "Amazon Web Services"
  * displayName = "AWS"
  * _type = "aws"
  * category = "CSP"
  * webLink = "https://aws.amazon.com/"
  * website = "https://aws.amazon.com/"
  * linkToDPA = "https://d1.awsstatic.com/legal/aws-gdpr/AWS_GDPR_DPA.pdf"
  * linkToISA = "https://aws.amazon.com/compliance/programs/"
  * linkToMSA = "https://aws.amazon.com/agreement/"
  * linkToSLA = "https://aws.amazon.com/legal/service-level-agreements/"
  * privacyPolicy = "https://aws.amazon.com/privacy/"
  * termsConditions = "https://aws.amazon.com/service-terms/"
  * statusPage = "https://status.aws.amazon.com/"
  * active = true
  * validated = true

#### aws_cloudfront_distribution -CONNECTS-> internet

Target Filters
  * _key = global:internet

Transferred Properties
  * _type = "internet"
  * _key = "global:internet"

#### aws_account <-OWNS- <ROOT>

#### aws_iam_user -IS-> Person

Target Filters
  * email = [source.username,source.tag.Email]

Transferred Properties
  * email = [source.username,source.tag.Email]

#### aws_transfer_server -CONNECTS-> Internet

#### aws_route53_record -CONNECTS-> Host

Source Filters
  * type = (A|AAAA)

Target Filters
  * publicIpAddress = source.resourceRecords

Transferred Properties
  * publicIpAddress = source.resourceRecords

#### aws_route53_record -CONNECTS-> Gateway

Source Filters
  * type = (A|AAAA)

Target Filters
  * DNSName = source.aliasTarget

Transferred Properties
  * DNSName = source.aliasTarget
  * domainName = source.aliasTarget

#### aws_route53_record -CONNECTS-> Gateway

Source Filters
  * type = (A|AAAA)

Target Filters
  * domainName = source.aliasTarget

Transferred Properties
  * DNSName = source.aliasTarget
  * domainName = source.aliasTarget

#### aws_instance -USES-> aws_iam_role

Target Filters
  * instanceProfileId = source.iamInstanceProfileId

Transferred Properties
  * instanceProfileId = source.iamInstanceProfileId
  * _type = "aws_iam_role"



### sentinelone Mappings

#### sentinelone_account <-HOSTS- Vendor

Target Filters
  * name = SentinelOne

Transferred Properties
  * name = "SentinelOne"
  * displayName = "SentinelOne"
  * _type = "sentinelone"

#### sentinelone_account <-OWNS- <ROOT>

#### sentinelone_agent -PROTECTS-> user_endpoint

Target Filters
  * deviceId = source.uuid

Transferred Properties
  * deviceId = source.uuid
  * _type = "user_endpoint"
  * users = source.lastLoggedInUserName



### knowbe4 Mappings

#### knowbe4_account <-HOSTS- Vendor

Target Filters
  * name = KnowBe4

Transferred Properties
  * name = "KnowBe4"
  * displayName = "KnowBe4"
  * _type = "knowbe4"

#### knowbe4_account <-OWNS- <ROOT>



### cbdefense Mappings

#### carbonblack_psc_account <-HOSTS- Vendor

Target Filters
  * name = Carbon Black

Transferred Properties
  * name = "Carbon Black"
  * displayName = "Carbon Black"
  * _type = "carbonblack"

#### carbonblack_psc_account <-OWNS- <ROOT>



### onelogin Mappings

#### onelogin_account <-HOSTS- Vendor

Target Filters
  * name = OneLogin

Transferred Properties
  * name = "OneLogin"
  * displayName = "OneLogin"
  * _type = "onelogin"

#### onelogin_account <-OWNS- <ROOT>



### jamf Mappings

#### jamf_account <-HOSTS- Vendor

Target Filters
  * name = Jamf

Transferred Properties
  * name = "Jamf"
  * displayName = "Jamf"
  * _type = "jamf"

#### jamf_account <-OWNS- <ROOT>



### veracode Mappings

#### veracode_account <-HOSTS- Vendor

Target Filters
  * name = Veracode

Transferred Properties
  * name = "Veracode"
  * displayName = "Veracode"
  * _type = "veracode"

#### veracode_scan <-PROVIDES- Vendor

Target Filters
  * name = Veracode

Transferred Properties
  * name = "Veracode"
  * displayName = "Veracode"
  * _type = "veracode"

#### veracode_account <-OWNS- <ROOT>



### hackerone Mappings

#### hackerone_account <-HOSTS- Vendor

Target Filters
  * name = HackerOne

Transferred Properties
  * name = "HackerOne"
  * displayName = "HackerOne"
  * _type = "hackerone"

#### hackerone_account <-OWNS- <ROOT>



### okta Mappings

#### okta_account <-HOSTS- Vendor

Target Filters
  * name = Okta

Transferred Properties
  * name = "Okta"
  * displayName = "Okta"
  * _type = "okta"

#### okta_account <-OWNS- <ROOT>

#### okta_user -IS-> Person

Source Filters
  * employeeType = !(bot|generic|service|shared|system)
  * userType = !(bot|generic|service|shared|system)

Target Filters
  * email = toLowerCase(source.login)

Transferred Properties
  * email = toLowerCase(source.login)
  * displayName = {source.firstName} {source.lastName}
  * name = {source.firstName} {source.lastName}
  * firstName = source.firstName
  * lastName = source.lastName
  * _type = "employee"
  * employeeType = source.employeeType
  * employeeId = source.employeeNumber
  * userIds = source.username
  * title = source.title
  * manager = source.manager
  * managerId = source.managerId
  * managerEmail = source.managerEmail
  * bitbucketUsername = source.bitbucketUsername
  * githubUsername = source.githubUsername

#### okta_application -CONNECTS-> source.appAccountType

Source Filters
  * isMultiInstanceApp = true
  * isSAMLApp = true

Target Filters
  * accountId = source.appAccountId

Transferred Properties
  * vendor = source.appVendorName
  * accountId = source.appAccountId
  * primaryDomain = source.appAccountId
  * displayName = source.appAccountId
  * _type = source.appAccountType

#### okta_application -CONNECTS-> source.appAccountType

Source Filters
  * isMultiInstanceApp = true
  * isSAMLApp = true

Target Filters
  * primaryDomain = source.appAccountId

Transferred Properties
  * vendor = source.appVendorName
  * accountId = source.appAccountId
  * primaryDomain = source.appAccountId
  * displayName = source.appAccountId
  * _type = source.appAccountType

#### okta_application -CONNECTS-> Account

Source Filters
  * isMultiInstanceApp = false
  * isSAMLApp = true

Transferred Properties
  * vendor = source.appVendorName
  * name = source.appAccountType
  * displayName = source.appAccountType
  * _type = source.appAccountType

#### employee <-EMPLOYS- <ROOT>



### wazuh Mappings

#### wazuh_account <-HOSTS- Vendor

Target Filters
  * name = Wazuh

Transferred Properties
  * name = "Wazuh"
  * displayName = "Wazuh"
  * _type = "wazuh"

#### wazuh_account <-OWNS- <ROOT>



### tenable-cloud Mappings

#### tenable_account <-HOSTS- Vendor

Target Filters
  * name = Tenable Cloud

Transferred Properties
  * name = "Tenable Cloud"
  * displayName = "Tenable Cloud"
  * _type = "tenable_cloud"

#### tenable_account <-OWNS- <ROOT>



### azure Mappings

#### azure_account <-HOSTS- Vendor

Target Filters
  * name = Azure

Transferred Properties
  * name = "Azure"
  * displayName = "Azure"
  * _type = "azure"

#### azure_account <-OWNS- <ROOT>



### google Mappings

#### google_account <-HOSTS- Vendor

Target Filters
  * name = Google

Transferred Properties
  * name = "Google"
  * displayName = "Google"
  * _type = "google"

#### google_account <-OWNS- <ROOT>

#### google_user -IS-> Person

Source Filters
  * employeeType = !(bot|generic|service|shared|system)
  * userType = !(bot|generic|service|shared|system)

Target Filters
  * email = toLowerCase(source.email)

Transferred Properties
  * email = toLowerCase(source.email)
  * aliases = toLowerCase(source.aliases)
  * displayName = {source.firstName} {source.lastName}
  * name = {source.firstName} {source.lastName}
  * firstName = source.firstName
  * lastName = source.lastName
  * _type = "employee"
  * employeeType = source.employeeType
  * employeeId = source.employeeNumber
  * userIds = source.username
  * title = source.title
  * manager = source.manager
  * managerId = source.managerId
  * managerEmail = source.managerEmail
  * bitbucketUsername = source.bitbucketUsername
  * githubUsername = source.githubUsername

[1]: ../docs/jupiterone-data-model.md