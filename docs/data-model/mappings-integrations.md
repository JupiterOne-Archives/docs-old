# Integrations Mappings

## godaddy Mappings

### `godaddy_account <-OWNS- <ROOT>`



## google_cloud Mappings



## bitbucket Mappings

### `bitbucket_workspace <-HOSTS- Vendor`

> **Target Filters**
>
>   * `name = "Atlassian"`

> **Transferred Properties**
>
>   * `name = "Atlassian"`
>   * `displayName = "Atlassian"`
>   * `_type = "atlassian"`

### `bitbucket_workspace <-OWNS- <ROOT>`

### `bitbucket_user -IS-> Person`

> **Target Filters**
>
>   * `bitbucketNickname = source.nickname`



## sysdig Mappings

### `sysdig_account <-OWNS- <ROOT>`

### `sysdig_account <-HOSTS- Vendor`

> **Target Filters**
>
>   * `name = "Sysdig"`

> **Transferred Properties**
>
>   * `name = "Sysdig"`
>   * `displayName = "Sysdig"`
>   * `_type = "sysdig"`



## atspoke Mappings

### `atspoke_account <-OWNS- <ROOT>`



## jira Mappings

### `jira_account <-HOSTS- Vendor`

> **Target Filters**
>
>   * `name = "Jira"`

> **Transferred Properties**
>
>   * `name = "Jira"`
>   * `displayName = "Jira"`
>   * `_type = "jira"`

### `jira_account <-OWNS- <ROOT>`



## whitehat Mappings

### `whitehat_account <-HOSTS- Vendor`

> **Target Filters**
>
>   * `name = "WhiteHat"`

> **Transferred Properties**
>
>   * `name = "WhiteHat"`
>   * `displayName = "WhiteHat"`
>   * `_type = "whitehat"`

### `whitehat_scan <-PROVIDES- Vendor`

> **Target Filters**
>
>   * `name = "WhiteHat"`

> **Transferred Properties**
>
>   * `name = "WhiteHat"`
>   * `displayName = "WhiteHat"`
>   * `_type = "whitehat"`

### `whitehat_account <-OWNS- <ROOT>`



## cisco_amp Mappings

### `cisco_amp_account <-HOSTS- Vendor`

> **Target Filters**
>
>   * `name = "Cisco"`

> **Transferred Properties**
>
>   * `name = "Cisco"`
>   * `displayName = "Cisco"`
>   * `_type = "cisco"`

### `cisco_amp_account <-OWNS- <ROOT>`



## github Mappings

### `github_account <-HOSTS- Vendor`

> **Target Filters**
>
>   * `name = "GitHub"`

> **Transferred Properties**
>
>   * `name = "GitHub"`
>   * `displayName = "GitHub"`
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
>   * `name = "Threat Stack"`
>   * `displayName = "Threat Stack"`
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



## nowsecure Mappings

### `nowsecure_account <-OWNS- <ROOT>`

### `mobile_app <-DEVELOPS- <ROOT>`

### `nowsecure_account <-HOSTS- Vendor`

> **Target Filters**
>
>   * `name = "NowSecure"`

> **Transferred Properties**
>
>   * `name = "NowSecure"`
>   * `displayName = "NowSecure"`
>   * `_type = "nowsecure"`



## malwarebytes Mappings

### `malwarebytes_account <-OWNS- <ROOT>`



## pagerduty Mappings

### `pagerduty_account <-HOSTS- Vendor`

> **Target Filters**
>
>   * `name = "PagerDuty"`

> **Transferred Properties**
>
>   * `name = "PagerDuty"`
>   * `displayName = "PagerDuty"`
>   * `_type = "pagerduty"`

### `pagerduty_account <-OWNS- <ROOT>`



## gitlab Mappings

### `gitlab_account <-OWNS- <ROOT>`

### `gitlab_account <-HOSTS- Vendor`

> **Target Filters**
>
>   * `name = "GitLab"`

> **Transferred Properties**
>
>   * `name = "GitLab"`
>   * `displayName = "GitLab"`
>   * `_type = "gitlab"`



## artifactory Mappings

### `artifactory_account <-OWNS- <ROOT>`

### `artifactory_account <-HOSTS- Vendor`

> **Target Filters**
>
>   * `name = "Artifactory"`

> **Transferred Properties**
>
>   * `name = "Artifactory"`
>   * `displayName = "Artifactory"`
>   * `_type = "artifactory"`



## salesforce Mappings

### `salesforce_account <-OWNS- <ROOT>`

### `salesforce_account <-HOSTS- Vendor`

> **Target Filters**
>
>   * `name = "Salesforce"`

> **Transferred Properties**
>
>   * `name = "Salesforce"`
>   * `displayName = "Salesforce"`
>   * `_type = "salesforce"`



## digicert Mappings

### `digicert_account <-HOSTS- Vendor`

> **Target Filters**
>
>   * `name = "DigiCert"`

> **Transferred Properties**
>
>   * `name = "DigiCert"`
>   * `displayName = "DigiCert"`
>   * `_type = "digicert"`

### `digicert_account <-OWNS- <ROOT>`

### `digicert_certificate <-HAS- (Domain|DomainZone)`

> **Target Filters**
>
>   * `name = source.domainName`

### `digicert_certificate <-HAS- (Domain|DomainZone)`

> **Target Filters**
>
>   * `name = source.dnsNames`



## feroot Mappings

### `feroot_account <-OWNS- <ROOT>`



## crowdstrike Mappings

### `crowdstrike_account <-OWNS- <ROOT>`

### `crowdstrike_account <-HOSTS- Vendor`

> **Target Filters**
>
>   * `name = "CrowdStrike"`

> **Transferred Properties**
>
>   * `name = "CrowdStrike"`
>   * `displayName = "CrowdStrike"`
>   * `_type = "crowdstrike"`

### `crowdstrike_sensor -PROTECTS-> user_endpoint`

> **Source Filters**
>
>   * `instanceId = null`
>   * `serialNumber = !null`
>   * `productTypeDesc = Workstation`

> **Target Filters**
>
>   * `_key = source.serialNumber`

> **Transferred Properties**
>
>   * `_type = "user_endpoint"`
>   * `_key = source.serialNumber`
>   * `name = source.name`
>   * `displayName = source.displayName`
>   * `hostname = source.hostname`
>   * `serialNumber = source.serialNumber`
>   * `macAddress = source.macAddress`
>   * `localIp = source.localIp`
>   * `externalIp = source.externalIp`
>   * `machineDomain = source.machineDomain`
>   * `osVersion = source.osVersion`

### `crowdstrike_sensor -PROTECTS-> aws_instance`

> **Source Filters**
>
>   * `ec2InstanceArn = !null`

> **Target Filters**
>
>   * `_key = source.ec2InstanceArn`

> **Transferred Properties**
>
>   * `_key = source.ec2InstanceArn`
>   * `_type = "aws_instance"`
>   * `accountId = source.serviceProviderAccountId`
>   * `instanceId = source.instanceId`
>   * `availabilityZone = source.zoneGroup`



## snyk Mappings

### `snyk_account <-HOSTS- Vendor`

> **Target Filters**
>
>   * `name = "Snyk"`

> **Transferred Properties**
>
>   * `name = "Snyk"`
>   * `displayName = "Snyk"`
>   * `_type = "snyk"`

### `snyk_account <-OWNS- <ROOT>`



## bugcrowd Mappings

### `bugcrowd_account <-OWNS- <ROOT>`

### `bugcrowd_account <-HOSTS- Vendor`

> **Target Filters**
>
>   * `name = "Bugcrowd"`

> **Transferred Properties**
>
>   * `name = "Bugcrowd"`
>   * `displayName = "Bugcrowd"`
>   * `_type = "bugcrowd"`



## zoom Mappings

### `zoom_account <-OWNS- <ROOT>`

### `zoom_account <-HOSTS- Vendor`

> **Target Filters**
>
>   * `name = "Zoom"`

> **Transferred Properties**
>
>   * `name = "Zoom"`
>   * `displayName = "Zoom"`
>   * `_type = "zoom"`



## detectify Mappings

### `detectify_account <-OWNS- <ROOT>`

### `web_app_domain <-HAS- <ROOT>`

### `detectify_account <-HOSTS- Vendor`

> **Target Filters**
>
>   * `name = "Detectify"`

> **Transferred Properties**
>
>   * `name = "Detectify"`
>   * `displayName = "Detectify"`
>   * `_type = "detectify"`



## duo Mappings

### `duo_account <-HOSTS- Vendor`

> **Target Filters**
>
>   * `name = "Duo"`

> **Transferred Properties**
>
>   * `name = "Duo"`
>   * `displayName = "Duo"`
>   * `_type = "duo"`

### `duo_account <-OWNS- <ROOT>`

### `duo_phone <-IS- Device`

> **Transferred Properties**
>
>   * `mobileNumber = source.number`
>   * `displayName = "Duo"`
>   * `_type = "mobile_phone"`



## AWS Mappings

### `aws_account <-HOSTS- Vendor`

> **Target Filters**
>
>   * `name = "Amazon Web Services"`

> **Transferred Properties**
>
>   * `name = "Amazon Web Services"`
>   * `displayName = "AWS"`
>   * `_type = "aws"`
>   * `category = "CSP"`
>   * `webLink = "https://aws.amazon.com/"`
>   * `website = "https://aws.amazon.com/"`
>   * `linkToDPA = "https://d1.awsstatic.com/legal/aws-gdpr/AWS_GDPR_DPA.pdf"`
>   * `linkToISA = "https://aws.amazon.com/compliance/programs/"`
>   * `linkToMSA = "https://aws.amazon.com/agreement/"`
>   * `linkToSLA = "https://aws.amazon.com/legal/service-level-agreements/"`
>   * `privacyPolicy = "https://aws.amazon.com/privacy/"`
>   * `termsConditions = "https://aws.amazon.com/service-terms/"`
>   * `statusPage = "https://status.aws.amazon.com/"`
>   * `active = true`
>   * `validated = true`

### `Vendor -PROVIDES-> Control`

> **Target Filters**
>
>   * `_key = "aws::control:data-center-security"`

> **Transferred Properties**
>
>   * `_type = "aws_control"`
>   * `_key = "aws::control:data-center-security"`
>   * `name = "AWS Data Center Security Controls"`
>   * `description = "AWS Data Center Security Controls"`
>   * `category = "physical"`
>   * `function = "data-center-security"`
>   * `vendor = "AWS"`
>   * `webLink = "https://aws.amazon.com/compliance/data-center/controls/"`

### `aws_cloudfront_distribution -CONNECTS-> internet`

> **Target Filters**
>
>   * `_key = "global:internet"`

> **Transferred Properties**
>
>   * `_type = "internet"`
>   * `_key = "global:internet"`

### `aws_account <-OWNS- <ROOT>`

### `aws_organization <-HAS- <ROOT>`

### `aws_iam_user -IS-> Person`

> **Target Filters**
>
>   * `email = [source.username,source.tag.Email]`

### `aws_transfer_server -CONNECTS-> Internet`

### `aws_instance -USES-> aws_iam_role`

> **Target Filters**
>
>   * `instanceProfileId = source.iamInstanceProfileId`

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

### `aws_guardduty_finding <-HAS- aws_account`

> **Target Filters**
>
>   * `id = source.accountId`

### `aws_guardduty_finding <-HAS- aws_iam_role`

> **Target Filters**
>
>   * `id = source.roleId`

### `aws_guardduty_finding <-HAS- aws_iam_user`

> **Target Filters**
>
>   * `id = source.userId`

### `aws_guardduty_finding <-HAS- aws_iam_access_key`

> **Target Filters**
>
>   * `id = source.accessKeyId`

### `aws_guardduty_finding <-HAS- Person`

> **Target Filters**
>
>   * `userId = source.userName`

### `aws_ecr_image <-USES- (Host|Function|Container)`

> **Target Filters**
>
>   * `containerImages = source.fullName`

### `aws_efs_file_system <-USES- (Host|Function|Container)`

> **Target Filters**
>
>   * `efsArns = source.arn`

### `aws_route53_record -CONNECTS-> (aws_lb|aws_nlb|aws_alb|aws_elb)`

> **Target Filters**
>
>   * `dualstackDnsName = source.value`

### `aws_shield_protection -PROTECTS-> *`

> **Target Filters**
>
>   * `_key = source.resourceArn`

### `aws_shield_protection_group -HAS-> *`

> **Target Filters**
>
>   * `_key = source.members`

### `DataStore -LOGS-> *`

> **Source Filters**
>
>   * `loggingTargetBucket = !null`

> **Target Filters**
>
>   * `bucketName = source.loggingTargetBucket`

### `aws_cloudwatch_metric_alarm -TRIGGERS-> *`

> **Target Filters**
>
>   * `_key = source.okActions`



## sonarqube Mappings

### `sonarqube_account <-HOSTS- Vendor`

> **Target Filters**
>
>   * `name = "SonarQube"`

> **Transferred Properties**
>
>   * `name = "SonarQube"`
>   * `displayName = "SonarQube"`
>   * `_type = "sonarqube"`

### `sonarqube_account <-OWNS- <ROOT>`



## fastly Mappings

### `fastly_account <-OWNS- <ROOT>`



## sentinelone Mappings

### `sentinelone_account <-HOSTS- Vendor`

> **Target Filters**
>
>   * `name = "SentinelOne"`

> **Transferred Properties**
>
>   * `name = "SentinelOne"`
>   * `displayName = "SentinelOne"`
>   * `_type = "sentinelone"`

### `sentinelone_account <-OWNS- <ROOT>`

### `sentinelone_agent -PROTECTS-> user_endpoint`

> **Target Filters**
>
>   * `deviceId = source.uuid`

> **Transferred Properties**
>
>   * `deviceId = source.uuid`
>   * `_type = "user_endpoint"`
>   * `users = source.lastLoggedInUserName`
>   * `hostname = toLowerCase(source.computerName)`
>   * `displayName = source.displayName`

### `sentinelone_agent -PROTECTS-> user_endpoint`

> **Target Filters**
>
>   * `hostname = toLowerCase(source.computerName)`

> **Transferred Properties**
>
>   * `deviceId = source.uuid`
>   * `_type = "user_endpoint"`
>   * `users = source.lastLoggedInUserName`
>   * `hostname = toLowerCase(source.computerName)`
>   * `displayName = source.displayName`



## servicenow Mappings

### `servicenow_account <-OWNS- <ROOT>`



## wpengine Mappings

### `wpengine_account <-OWNS- <ROOT>`

### `wpengine_account <-HOSTS- Vendor`

> **Target Filters**
>
>   * `name = "WP Engine"`

> **Transferred Properties**
>
>   * `name = "WP Engine"`
>   * `displayName = "WP Engine"`
>   * `_type = "wpengine"`



## microsoft-365 Mappings

### `microsoft_365_account <-HOSTS- Vendor`

> **Target Filters**
>
>   * `name = "Microsoft"`

> **Transferred Properties**
>
>   * `name = "Microsoft"`
>   * `displayName = "Microsoft"`
>   * `_type = "microsoft_365"`

### `microsoft_365_account <-OWNS- <ROOT>`

### `azure_user -IS-> Person`

> **Source Filters**
>
>   * `email = !null`

> **Target Filters**
>
>   * `email = toLowerCase(source.email)`

> **Transferred Properties**
>
>   * `email = toLowerCase(source.email)`
>   * `displayName = source.name`
>   * `name = source.name`
>   * `firstName = source.firstName`
>   * `lastName = source.lastName`
>   * `_type = "employee"`
>   * `userId = source.username`
>   * `title = source.jobTitle`



## heroku Mappings

### `heroku_account <-HOSTS- Vendor`

> **Target Filters**
>
>   * `name = "Heroku"`

> **Transferred Properties**
>
>   * `name = "Heroku"`
>   * `displayName = "Heroku"`
>   * `_type = "heroku"`

### `heroku_account <-OWNS- <ROOT>`



## knowbe4 Mappings

### `knowbe4_account <-HOSTS- Vendor`

> **Target Filters**
>
>   * `name = "KnowBe4"`

> **Transferred Properties**
>
>   * `name = "KnowBe4"`
>   * `displayName = "KnowBe4"`
>   * `_type = "knowbe4"`

### `knowbe4_account <-OWNS- <ROOT>`



## cbdefense Mappings

### `carbonblack_psc_account <-HOSTS- Vendor`

> **Target Filters**
>
>   * `name = "Carbon Black"`

> **Transferred Properties**
>
>   * `name = "Carbon Black"`
>   * `displayName = "Carbon Black"`
>   * `_type = "carbonblack"`

### `carbonblack_psc_account <-OWNS- <ROOT>`



## onelogin Mappings

### `onelogin_account <-HOSTS- Vendor`

> **Target Filters**
>
>   * `name = "OneLogin"`

> **Transferred Properties**
>
>   * `name = "OneLogin"`
>   * `displayName = "OneLogin"`
>   * `_type = "onelogin"`

### `onelogin_account <-OWNS- <ROOT>`

### `onelogin_user -IS-> Person`

> **Target Filters**
>
>   * `email = toLowerCase(source.email)`

> **Transferred Properties**
>
>   * `email = toLowerCase(source.email)`
>   * `displayName = "{source.firstName} {source.lastName}"`
>   * `name = "{source.firstName} {source.lastName}"`
>   * `firstName = source.firstName`
>   * `lastName = source.lastName`
>   * `_type = "employee"`
>   * `company = source.company`
>   * `department = source.department`
>   * `state = source.state`
>   * `title = source.title`
>   * `phone = source.phone`
>   * `status = source.status`



## airwatch Mappings

### `airwatch_account <-OWNS- <ROOT>`

### `airwatch_account <-HOSTS- Vendor`

> **Target Filters**
>
>   * `name = "Airwatch"`

> **Transferred Properties**
>
>   * `name = "Airwatch"`
>   * `displayName = "Airwatch"`
>   * `_type = "airwatch"`



## jamf Mappings

### `jamf_account <-HOSTS- Vendor`

> **Target Filters**
>
>   * `name = "Jamf"`

> **Transferred Properties**
>
>   * `name = "Jamf"`
>   * `displayName = "Jamf"`
>   * `_type = "jamf"`

### `jamf_account <-OWNS- <ROOT>`



## veracode Mappings

### `veracode_account <-HOSTS- Vendor`

> **Target Filters**
>
>   * `name = "Veracode"`

> **Transferred Properties**
>
>   * `name = "Veracode"`
>   * `displayName = "Veracode"`
>   * `_type = "veracode"`

### `veracode_scan <-PROVIDES- Vendor`

> **Target Filters**
>
>   * `name = "Veracode"`

> **Transferred Properties**
>
>   * `name = "Veracode"`
>   * `displayName = "Veracode"`
>   * `_type = "veracode"`

### `veracode_account <-OWNS- <ROOT>`



## checkmarx Mappings

### `checkmarx_account <-OWNS- <ROOT>`



## hackerone Mappings

### `hackerone_account <-HOSTS- Vendor`

> **Target Filters**
>
>   * `name = "HackerOne"`

> **Transferred Properties**
>
>   * `name = "HackerOne"`
>   * `displayName = "HackerOne"`
>   * `_type = "hackerone"`

### `hackerone_account <-OWNS- <ROOT>`



## okta Mappings

### `okta_account <-HOSTS- Vendor`

> **Target Filters**
>
>   * `name = "Okta"`

> **Transferred Properties**
>
>   * `name = "Okta"`
>   * `displayName = "Okta"`
>   * `_type = "okta"`

### `okta_account <-OWNS- <ROOT>`

### `okta_user -IS-> Person`

> **Source Filters**
>
>   * `employeeType = !(admin|bot|generic|service|shared|system)`
>   * `userType = !(admin|bot|generic|service|shared|system)`

> **Target Filters**
>
>   * `email = toLowerCase(source.login)`

> **Transferred Properties**
>
>   * `email = toLowerCase(source.login)`
>   * `displayName = "{source.firstName} {source.lastName}"`
>   * `name = "{source.firstName} {source.lastName}"`
>   * `firstName = source.firstName`
>   * `lastName = source.lastName`
>   * `_type = "employee"`
>   * `employeeType = source.employeeType`
>   * `employeeId = source.employeeNumber`
>   * `userId = source.id`
>   * `username = source.username`
>   * `department = source.department`
>   * `division = source.division`
>   * `location = source.location`
>   * `title = source.title`
>   * `manager = source.manager`
>   * `managerId = source.managerId`
>   * `managerEmail = source.managerEmail`
>   * `bitbucketUsername = source.bitbucketUsername`
>   * `githubUsername = source.githubUsername`

### `okta_application -CONNECTS-> azure_account`

> **Source Filters**
>
>   * `appAccountType = office365_account`
>   * `isSAMLApp = true`

> **Target Filters**
>
>   * `verifiedDomains = source.appDomain`

### `okta_application -CONNECTS-> source.appAccountType`

> **Source Filters**
>
>   * `isMultiInstanceApp = true`
>   * `isSAMLApp = true`

> **Target Filters**
>
>   * `accountId = source.appAccountId`

> **Transferred Properties**
>
>   * `vendor = source.appVendorName`
>   * `accountId = source.appAccountId`
>   * `primaryDomain = [source.appAccountId,source.appDomain]`
>   * `displayName = source.appAccountId`
>   * `_type = source.appAccountType`
>   * `ssoEnabled = true`

### `okta_application -CONNECTS-> source.appAccountType`

> **Source Filters**
>
>   * `isMultiInstanceApp = true`
>   * `isSAMLApp = true`

> **Target Filters**
>
>   * `primaryDomain = [source.appAccountId,source.appDomain]`

> **Transferred Properties**
>
>   * `vendor = source.appVendorName`
>   * `accountId = source.appAccountId`
>   * `primaryDomain = [source.appAccountId,source.appDomain]`
>   * `displayName = source.appAccountId`
>   * `_type = source.appAccountType`
>   * `ssoEnabled = true`

### `okta_application -CONNECTS-> Account`

> **Source Filters**
>
>   * `isMultiInstanceApp = false`
>   * `isSAMLApp = true`

> **Transferred Properties**
>
>   * `vendor = source.appVendorName`
>   * `name = source.appAccountType`
>   * `displayName = source.appAccountType`
>   * `_type = source.appAccountType`
>   * `ssoEnabled = true`

### `employee <-EMPLOYS- <ROOT>`



## cobalt Mappings

### `cobalt_account <-OWNS- <ROOT>`



## cloudflare Mappings

### `cloudflare_account <-OWNS- <ROOT>`

### `cloudflare_account <-HOSTS- Vendor`

> **Target Filters**
>
>   * `name = "Cloudflare"`

> **Transferred Properties**
>
>   * `name = "Cloudflare"`
>   * `displayName = "Cloudflare"`
>   * `_type = "cloudflare"`



## wazuh Mappings

### `wazuh_account <-HOSTS- Vendor`

> **Target Filters**
>
>   * `name = "Wazuh"`

> **Transferred Properties**
>
>   * `name = "Wazuh"`
>   * `displayName = "Wazuh"`
>   * `_type = "wazuh"`

### `wazuh_account <-OWNS- <ROOT>`



## jumpcloud Mappings

### `jumpcloud_account <-HOSTS- Vendor`

> **Target Filters**
>
>   * `name = "JumpCloud"`

> **Transferred Properties**
>
>   * `name = "JumpCloud"`
>   * `displayName = "JumpCloud"`
>   * `_type = "jumpcloud"`

### `jumpcloud_account <-OWNS- <ROOT>`

### `jumpcloud_user -IS-> Person`

> **Source Filters**
>
>   * `employeeType = !(bot|generic|service|shared|system)`
>   * `sambaServiceUser = !true`

> **Target Filters**
>
>   * `email = toLowerCase(source.email)`

> **Transferred Properties**
>
>   * `email = toLowerCase(source.email)`
>   * `displayName = source.displayName`
>   * `name = "{source.firstName} {source.lastName}"`
>   * `firstName = source.firstName`
>   * `lastName = source.lastName`
>   * `_type = "employee"`
>   * `employeeType = source.employeeType`
>   * `employeeId = source.employeeId`
>   * `userIds = source.username`
>   * `title = source.jobTitle`
>   * `bitbucketUsername = source.bitbucketUsername`
>   * `githubUsername = source.githubUsername`



## snipe-it Mappings

### `snipeit_account <-OWNS- <ROOT>`

### `snipeit_account <-HOSTS- Vendor`

> **Target Filters**
>
>   * `name = "Snipe-IT"`

> **Transferred Properties**
>
>   * `name = "Snipe-IT"`
>   * `displayName = "Snipe-IT"`
>   * `_type = "snipeit"`



## whois Mappings



## tenable-cloud Mappings

### `tenable_account <-HOSTS- Vendor`

> **Target Filters**
>
>   * `name = "Tenable.io"`

> **Transferred Properties**
>
>   * `name = "Tenable.io"`
>   * `displayName = "Tenable.io"`
>   * `_type = "tenable_io"`

### `tenable_account <-OWNS- <ROOT>`



## azure Mappings

### `azure_account <-HOSTS- Vendor`

> **Target Filters**
>
>   * `name = "Microsoft"`

> **Transferred Properties**
>
>   * `name = "Microsoft"`
>   * `displayName = "Microsoft"`
>   * `_type = "azure"`

### `azure_account <-OWNS- <ROOT>`

### `azure_user -IS-> Person`

> **Source Filters**
>
>   * `email = !null`

> **Target Filters**
>
>   * `email = toLowerCase(source.email)`

> **Transferred Properties**
>
>   * `email = toLowerCase(source.email)`
>   * `displayName = source.name`
>   * `name = source.name`
>   * `firstName = source.firstName`
>   * `lastName = source.lastName`
>   * `_type = "employee"`
>   * `userId = source.username`
>   * `title = source.jobTitle`



## auth0 Mappings

### `auth0_account <-OWNS- <ROOT>`

### `auth0_account <-HOSTS- Vendor`

> **Target Filters**
>
>   * `name = "Auth0"`

> **Transferred Properties**
>
>   * `name = "Auth0"`
>   * `displayName = "Auth0"`
>   * `_type = "auth0"`



## sentry Mappings

### `sentry_account <-OWNS- <ROOT>`

### `sentry_account <-HOSTS- Vendor`

> **Target Filters**
>
>   * `name = "Sentry"`

> **Transferred Properties**
>
>   * `name = "Sentry"`
>   * `displayName = "Sentry"`
>   * `_type = "sentry"`



## azure-devops Mappings

### `azure_devops_account <-OWNS- <ROOT>`



## qualys Mappings

### `qualys_account <-HOSTS- Vendor`

> **Target Filters**
>
>   * `name = "Qualys"`

> **Transferred Properties**
>
>   * `name = "Qualys"`
>   * `displayName = "Qualys"`
>   * `_type = "qualys"`

### `qualys_account <-OWNS- <ROOT>`



## integration-benchmark Mappings



## github2 Mappings

### `github2_account <-OWNS- <ROOT>`

### `github2_account <-HOSTS- Vendor`

> **Target Filters**
>
>   * `name = "GitHub 2"`

> **Transferred Properties**
>
>   * `name = "GitHub 2"`
>   * `displayName = "GitHub 2"`
>   * `_type = "github2"`



## bamboohr Mappings

### `bamboohr_user -IS-> Person`

> **Target Filters**
>
>   * `email = toLowerCase(source.email)`

> **Transferred Properties**
>
>   * `email = toLowerCase(source.email)`
>   * `displayName = source.displayName`
>   * `name = source.name`
>   * `firstName = source.firstName`
>   * `lastName = source.lastName`
>   * `_type = "employee"`
>   * `employeeId = source.employeeId`
>   * `location = source.location`
>   * `title = source.jobTitle`
>   * `workEmail = source.workEmail`
>   * `department = source.department`
>   * `division = source.division`
>   * `manager = source.supervisor`
>   * `mobilePhone = source.mobilePhone`
>   * `workPhone = source.workPhone`

### `bamboohr_employee -IS-> Person`

> **Target Filters**
>
>   * `email = toLowerCase(source.email)`

> **Transferred Properties**
>
>   * `email = toLowerCase(source.email)`
>   * `displayName = source.displayName`
>   * `name = source.name`
>   * `firstName = source.firstName`
>   * `lastName = source.lastName`
>   * `_type = "employee"`
>   * `location = source.location`
>   * `title = source.jobTitle`
>   * `workEmail = source.workEmail`
>   * `department = source.department`
>   * `division = source.division`
>   * `manager = source.supervisor`
>   * `mobilePhone = source.mobilePhone`
>   * `workPhone = source.workPhone`

### `bamboohr_account <-HOSTS- Vendor`

> **Target Filters**
>
>   * `name = "BambooHR"`

> **Transferred Properties**
>
>   * `name = "BambooHR"`
>   * `displayName = "BambooHR"`
>   * `_type = "bamboohr"`

### `bamboohr_account <-OWNS- <ROOT>`



## trend_micro Mappings

### `trend_micro_account <-HOSTS- Vendor`

> **Target Filters**
>
>   * `name = "Trend Micro"`

> **Transferred Properties**
>
>   * `name = "Trend Micro"`
>   * `displayName = "Trend Micro"`
>   * `_type = "trend_micro"`

### `trend_micro_account <-OWNS- <ROOT>`



## slack Mappings



## google Mappings

### `google_account <-HOSTS- Vendor`

> **Target Filters**
>
>   * `name = "Google"`

> **Transferred Properties**
>
>   * `name = "Google"`
>   * `displayName = "Google"`
>   * `_type = "google"`

### `google_account <-OWNS- <ROOT>`

### `google_user -IS-> Person`

> **Source Filters**
>
>   * `employeeType = !(admin|bot|generic|service|shared|system)`
>   * `userType = !(admin|bot|generic|service|shared|system)`
>   * `role = !(bot|generic|service|shared|system)`

> **Target Filters**
>
>   * `email = toLowerCase(source.email)`

> **Transferred Properties**
>
>   * `email = toLowerCase(source.email)`
>   * `aliases = toLowerCase(source.aliases)`
>   * `displayName = "{source.firstName} {source.lastName}"`
>   * `name = "{source.firstName} {source.lastName}"`
>   * `firstName = source.firstName`
>   * `lastName = source.lastName`
>   * `_type = "employee"`
>   * `department = source.department`
>   * `division = source.division`
>   * `location = source.location`
>   * `employeeType = source.employeeType`
>   * `employeeId = source.employeeNumber`
>   * `userId = source.id`
>   * `username = source.username`
>   * `title = source.title`
>   * `manager = source.manager`
>   * `managerId = source.managerId`
>   * `managerEmail = source.managerEmail`
>   * `bitbucketUsername = source.bitbucketUsername`
>   * `githubUsername = source.githubUsername`



## snowflake Mappings

### `snowflake_account <-OWNS- <ROOT>`

### `snowflake_account <-HOSTS- Vendor`

> **Target Filters**
>
>   * `name = "Snowflake"`

> **Transferred Properties**
>
>   * `name = "Snowflake"`
>   * `displayName = "Snowflake"`
>   * `_type = "snowflake"`



## cisco_meraki Mappings

### `cisco_meraki_account <-HOSTS- Vendor`

> **Target Filters**
>
>   * `name = "Cisco Meraki"`

> **Transferred Properties**
>
>   * `name = "Cisco Meraki"`
>   * `displayName = "Cisco Meraki"`
>   * `_type = "cisco_meraki"`

### `cisco_meraki_account <-OWNS- <ROOT>`

### `meraki_organization <-HAS- <ROOT>`

### `user_endpoint -CONNECTS-> meraki_device`

> **Target Filters**
>
>   * `publicIp = source.publicIp`



## npm Mappings

### `npm_account <-OWNS- <ROOT>`

### `npm_account <-HOSTS- Vendor`

> **Target Filters**
>
>   * `name = "npm"`

> **Transferred Properties**
>
>   * `name = "npm"`
>   * `displayName = "npm"`
>   * `_type = "npm"`

### `npm_account <-OWNS- <ROOT>`

### `npm_package <-PUBLISHED- CodeRepo`

> **Target Filters**
>
>   * `name = source.name`
>   * `owner = source.scope`



## kubernetes Mappings



## addigy Mappings

### `addigy_account <-OWNS- <ROOT>`

### `addigy_account <-HOSTS- Vendor`

> **Target Filters**
>
>   * `name = "Addigy"`

> **Transferred Properties**
>
>   * `name = "Addigy"`
>   * `displayName = "Addigy"`
>   * `_type = "addigy"`



## rapid7 Mappings

### `rapid7_account <-OWNS- <ROOT>`
