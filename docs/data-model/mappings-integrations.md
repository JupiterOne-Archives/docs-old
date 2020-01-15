
# Integrations Mappings

## bitbucket Mappings

### `bitbucket_team <-HOSTS- Vendor`

> **Target Filters**
> 
>   * `name = "Atlassian"`

> **Transferred Properties**
> 
>   * `name = "Atlassian"`> 
>   * `displayName = "Atlassian"`> 
>   * `_type = "atlassian"`

### `bitbucket_team <-OWNS- <ROOT>`

### `bitbucket_user -IS-> Person`

> **Target Filters**
> 
>   * `bitbucketNickname = source.nickname`



## jira Mappings

### `jira_account <-HOSTS- Vendor`

> **Target Filters**
> 
>   * `name = "Jira"`

> **Transferred Properties**
> 
>   * `name = "Jira"`> 
>   * `displayName = "Jira"`> 
>   * `_type = "jira"`

### `jira_account <-OWNS- <ROOT>`



## whitehat Mappings

### `whitehat_account <-HOSTS- Vendor`

> **Target Filters**
> 
>   * `name = "WhiteHat"`

> **Transferred Properties**
> 
>   * `name = "WhiteHat"`> 
>   * `displayName = "WhiteHat"`> 
>   * `_type = "whitehat"`

### `whitehat_scan <-PROVIDES- Vendor`

> **Target Filters**
> 
>   * `name = "WhiteHat"`

> **Transferred Properties**
> 
>   * `name = "WhiteHat"`> 
>   * `displayName = "WhiteHat"`> 
>   * `_type = "whitehat"`

### `whitehat_account <-OWNS- <ROOT>`



## github Mappings

### `github_account <-HOSTS- Vendor`

> **Target Filters**
> 
>   * `name = "GitHub"`

> **Transferred Properties**
> 
>   * `name = "GitHub"`> 
>   * `displayName = "GitHub"`> 
>   * `_type = "github"`

### `github_account <-OWNS- <ROOT>`

### `github_user -IS-> Person`

> **Target Filters**
> 
>   * `githubUsername = source.username`



## threatstack Mappings

### `threatstack_account <-HOSTS- Vendor`

> **Target Filters**
> 
>   * `name = "Threat Stack"`

> **Transferred Properties**
> 
>   * `name = "Threat Stack"`> 
>   * `displayName = "Threat Stack"`> 
>   * `_type = "threatstack"`

### `threatstack_account <-OWNS- <ROOT>`

### `threatstack_agent -PROTECTS-> Host`

> **Target Filters**
> 
>   * `instanceId = source.instanceId`

### `threatstack_agent -PROTECTS-> Host`

> **Target Filters**
> 
>   * `hostname = source.hostname`



## crowdstrike Mappings

### `crowdstrike_account <-HOSTS- Vendor`

> **Target Filters**
> 
>   * `name = "CrowdStrike"`

> **Transferred Properties**
> 
>   * `name = "CrowdStrike"`> 
>   * `displayName = "CrowdStrike"`> 
>   * `_type = "crowdstrike"`

### `crowdstrike_account <-OWNS- <ROOT>`



## snyk Mappings

### `snyk_account <-HOSTS- Vendor`

> **Target Filters**
> 
>   * `name = "Snyk"`

> **Transferred Properties**
> 
>   * `name = "Snyk"`> 
>   * `displayName = "Snyk"`> 
>   * `_type = "snyk"`

### `snyk_account <-OWNS- <ROOT>`



## openshift Mappings

### `openshift_account <-HOSTS- Vendor`

> **Target Filters**
> 
>   * `name = "OpenShift"`

> **Transferred Properties**
> 
>   * `name = "OpenShift"`> 
>   * `displayName = "OpenShift"`> 
>   * `_type = "openshift"`

### `openshift_account <-OWNS- <ROOT>`



## AWS Mappings

### `aws_account <-HOSTS- Vendor`

> **Target Filters**
> 
>   * `name = "Amazon Web Services"`

> **Transferred Properties**
> 
>   * `name = "Amazon Web Services"`> 
>   * `displayName = "AWS"`> 
>   * `_type = "aws"`> 
>   * `category = "CSP"`> 
>   * `webLink = "https://aws.amazon.com/"`> 
>   * `website = "https://aws.amazon.com/"`> 
>   * `linkToDPA = "https://d1.awsstatic.com/legal/aws-gdpr/AWS_GDPR_DPA.pdf"`> 
>   * `linkToISA = "https://aws.amazon.com/compliance/programs/"`> 
>   * `linkToMSA = "https://aws.amazon.com/agreement/"`> 
>   * `linkToSLA = "https://aws.amazon.com/legal/service-level-agreements/"`> 
>   * `privacyPolicy = "https://aws.amazon.com/privacy/"`> 
>   * `termsConditions = "https://aws.amazon.com/service-terms/"`> 
>   * `statusPage = "https://status.aws.amazon.com/"`> 
>   * `active = true`> 
>   * `validated = true`

### `aws_cloudfront_distribution -CONNECTS-> internet`

> **Target Filters**
> 
>   * `_key = "global:internet"`

> **Transferred Properties**
> 
>   * `_type = "internet"`> 
>   * `_key = "global:internet"`

### `aws_account <-OWNS- <ROOT>`

### `aws_iam_user -IS-> Person`

> **Target Filters**
> 
>   * `email = [source.username,source.tag.Email]`

### `aws_transfer_server -CONNECTS-> Internet`

### `aws_route53_record -CONNECTS-> Host`

> **Source Filters**
> 
>   * `type = (A|AAAA)`

> **Target Filters**
> 
>   * `publicIpAddress = source.resourceRecords`

### `aws_route53_record -CONNECTS-> Gateway`

> **Source Filters**
> 
>   * `type = (A|AAAA)`

> **Target Filters**
> 
>   * `dnsName = source.aliasTarget`

### `aws_route53_record -CONNECTS-> Gateway`

> **Source Filters**
> 
>   * `type = (A|AAAA)`

> **Target Filters**
> 
>   * `domainName = source.aliasTarget`

### `aws_instance -USES-> aws_iam_role`

> **Target Filters**
> 
>   * `instanceProfileId = source.iamInstanceProfileId`

### `aws_route53_zone <-HAS- Domain`

> **Target Filters**
> 
>   * `name = source.parentDomain`

### `aws_ecs_container_instance <-RUNS- aws_instance`

> **Target Filters**
> 
>   * `instanceId = source.ec2InstanceId`

### `aws_ecs_task <-TRIGGERS- aws_ecs_service`

> **Target Filters**
> 
>   * `deployments = source.startedBy`

### `aws_ecs_task_definition -USES-> aws_ecr_image`

> **Target Filters**
> 
>   * `fullName = source.containerImages`



## sentinelone Mappings

### `sentinelone_account <-HOSTS- Vendor`

> **Target Filters**
> 
>   * `name = "SentinelOne"`

> **Transferred Properties**
> 
>   * `name = "SentinelOne"`> 
>   * `displayName = "SentinelOne"`> 
>   * `_type = "sentinelone"`

### `sentinelone_account <-OWNS- <ROOT>`

### `sentinelone_agent -PROTECTS-> user_endpoint`

> **Target Filters**
> 
>   * `deviceId = source.uuid`

> **Transferred Properties**
> 
>   * `deviceId = source.uuid`> 
>   * `_type = "user_endpoint"`> 
>   * `users = source.lastLoggedInUserName`



## knowbe4 Mappings

### `knowbe4_account <-HOSTS- Vendor`

> **Target Filters**
> 
>   * `name = "KnowBe4"`

> **Transferred Properties**
> 
>   * `name = "KnowBe4"`> 
>   * `displayName = "KnowBe4"`> 
>   * `_type = "knowbe4"`

### `knowbe4_account <-OWNS- <ROOT>`



## cbdefense Mappings

### `carbonblack_psc_account <-HOSTS- Vendor`

> **Target Filters**
> 
>   * `name = "Carbon Black"`

> **Transferred Properties**
> 
>   * `name = "Carbon Black"`> 
>   * `displayName = "Carbon Black"`> 
>   * `_type = "carbonblack"`

### `carbonblack_psc_account <-OWNS- <ROOT>`



## onelogin Mappings

### `onelogin_account <-HOSTS- Vendor`

> **Target Filters**
> 
>   * `name = "OneLogin"`

> **Transferred Properties**
> 
>   * `name = "OneLogin"`> 
>   * `displayName = "OneLogin"`> 
>   * `_type = "onelogin"`

### `onelogin_account <-OWNS- <ROOT>`



## jamf Mappings

### `jamf_account <-HOSTS- Vendor`

> **Target Filters**
> 
>   * `name = "Jamf"`

> **Transferred Properties**
> 
>   * `name = "Jamf"`> 
>   * `displayName = "Jamf"`> 
>   * `_type = "jamf"`

### `jamf_account <-OWNS- <ROOT>`



## veracode Mappings

### `veracode_account <-HOSTS- Vendor`

> **Target Filters**
> 
>   * `name = "Veracode"`

> **Transferred Properties**
> 
>   * `name = "Veracode"`> 
>   * `displayName = "Veracode"`> 
>   * `_type = "veracode"`

### `veracode_scan <-PROVIDES- Vendor`

> **Target Filters**
> 
>   * `name = "Veracode"`

> **Transferred Properties**
> 
>   * `name = "Veracode"`> 
>   * `displayName = "Veracode"`> 
>   * `_type = "veracode"`

### `veracode_account <-OWNS- <ROOT>`



## hackerone Mappings

### `hackerone_account <-HOSTS- Vendor`

> **Target Filters**
> 
>   * `name = "HackerOne"`

> **Transferred Properties**
> 
>   * `name = "HackerOne"`> 
>   * `displayName = "HackerOne"`> 
>   * `_type = "hackerone"`

### `hackerone_account <-OWNS- <ROOT>`



## okta Mappings

### `okta_account <-HOSTS- Vendor`

> **Target Filters**
> 
>   * `name = "Okta"`

> **Transferred Properties**
> 
>   * `name = "Okta"`> 
>   * `displayName = "Okta"`> 
>   * `_type = "okta"`

### `okta_account <-OWNS- <ROOT>`

### `okta_user -IS-> Person`

> **Source Filters**
> 
>   * `employeeType = !(bot|generic|service|shared|system)`> 
>   * `userType = !(bot|generic|service|shared|system)`

> **Target Filters**
> 
>   * `email = toLowerCase(source.login)`

> **Transferred Properties**
> 
>   * `email = toLowerCase(source.login)`> 
>   * `displayName = "{source.firstName} {source.lastName}"`> 
>   * `name = "{source.firstName} {source.lastName}"`> 
>   * `firstName = source.firstName`> 
>   * `lastName = source.lastName`> 
>   * `_type = "employee"`> 
>   * `employeeType = source.employeeType`> 
>   * `employeeId = source.employeeNumber`> 
>   * `userIds = source.username`> 
>   * `title = source.title`> 
>   * `manager = source.manager`> 
>   * `managerId = source.managerId`> 
>   * `managerEmail = source.managerEmail`> 
>   * `bitbucketUsername = source.bitbucketUsername`> 
>   * `githubUsername = source.githubUsername`

### `okta_application -CONNECTS-> source.appAccountType`

> **Source Filters**
> 
>   * `isMultiInstanceApp = true`> 
>   * `isSAMLApp = true`

> **Target Filters**
> 
>   * `accountId = source.appAccountId`

> **Transferred Properties**
> 
>   * `vendor = source.appVendorName`> 
>   * `accountId = source.appAccountId`> 
>   * `primaryDomain = source.appAccountId`> 
>   * `displayName = source.appAccountId`> 
>   * `_type = source.appAccountType`> 
>   * `ssoEnabled = true`

### `okta_application -CONNECTS-> source.appAccountType`

> **Source Filters**
> 
>   * `isMultiInstanceApp = true`> 
>   * `isSAMLApp = true`

> **Target Filters**
> 
>   * `primaryDomain = source.appAccountId`

> **Transferred Properties**
> 
>   * `vendor = source.appVendorName`> 
>   * `accountId = source.appAccountId`> 
>   * `primaryDomain = source.appAccountId`> 
>   * `displayName = source.appAccountId`> 
>   * `_type = source.appAccountType`> 
>   * `ssoEnabled = true`

### `okta_application -CONNECTS-> Account`

> **Source Filters**
> 
>   * `isMultiInstanceApp = false`> 
>   * `isSAMLApp = true`

> **Transferred Properties**
> 
>   * `vendor = source.appVendorName`> 
>   * `name = source.appAccountType`> 
>   * `displayName = source.appAccountType`> 
>   * `_type = source.appAccountType`> 
>   * `ssoEnabled = true`

### `employee <-EMPLOYS- <ROOT>`



## wazuh Mappings

### `wazuh_account <-HOSTS- Vendor`

> **Target Filters**
> 
>   * `name = "Wazuh"`

> **Transferred Properties**
> 
>   * `name = "Wazuh"`> 
>   * `displayName = "Wazuh"`> 
>   * `_type = "wazuh"`

### `wazuh_account <-OWNS- <ROOT>`



## jumpcloud Mappings

### `jumpcloud_account <-HOSTS- Vendor`

> **Target Filters**
> 
>   * `name = "JumpCloud"`

> **Transferred Properties**
> 
>   * `name = "JumpCloud"`> 
>   * `displayName = "JumpCloud"`> 
>   * `_type = "jumpcloud"`

### `jumpcloud_account <-OWNS- <ROOT>`



## tenable-cloud Mappings

### `tenable_account <-HOSTS- Vendor`

> **Target Filters**
> 
>   * `name = "Tenable Cloud"`

> **Transferred Properties**
> 
>   * `name = "Tenable Cloud"`> 
>   * `displayName = "Tenable Cloud"`> 
>   * `_type = "tenable_cloud"`

### `tenable_account <-OWNS- <ROOT>`



## azure Mappings

### `azure_account <-HOSTS- Vendor`

> **Target Filters**
> 
>   * `name = "Azure"`

> **Transferred Properties**
> 
>   * `name = "Azure"`> 
>   * `displayName = "Azure"`> 
>   * `_type = "azure"`

### `azure_account <-OWNS- <ROOT>`



## google Mappings

### `google_account <-HOSTS- Vendor`

> **Target Filters**
> 
>   * `name = "Google"`

> **Transferred Properties**
> 
>   * `name = "Google"`> 
>   * `displayName = "Google"`> 
>   * `_type = "google"`

### `google_account <-OWNS- <ROOT>`

### `google_user -IS-> Person`

> **Source Filters**
> 
>   * `employeeType = !(bot|generic|service|shared|system)`> 
>   * `userType = !(bot|generic|service|shared|system)`

> **Target Filters**
> 
>   * `email = toLowerCase(source.email)`

> **Transferred Properties**
> 
>   * `email = toLowerCase(source.email)`> 
>   * `aliases = toLowerCase(source.aliases)`> 
>   * `displayName = "{source.firstName} {source.lastName}"`> 
>   * `name = "{source.firstName} {source.lastName}"`> 
>   * `firstName = source.firstName`> 
>   * `lastName = source.lastName`> 
>   * `_type = "employee"`> 
>   * `employeeType = source.employeeType`> 
>   * `employeeId = source.employeeNumber`> 
>   * `userIds = source.username`> 
>   * `title = source.title`> 
>   * `manager = source.manager`> 
>   * `managerId = source.managerId`> 
>   * `managerEmail = source.managerEmail`> 
>   * `bitbucketUsername = source.bitbucketUsername`> 
>   * `githubUsername = source.githubUsername`


