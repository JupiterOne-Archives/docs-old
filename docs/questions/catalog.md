# JupiterOne Query Questions

## Questions

### Access

- Find anything that allows public access to everyone.
- Show me the current password policy and compliance status.
- Are there external users with access to our systems?
- Who has been assigned permissions with administrator/privileged access?
- Who has access to what systems/resources?
- Who owns which user accounts?
- What are the shared/generic/service accounts or access roles? (Including user accounts that are not individually owned)
- Did we remove all access from employees who left?
- Which user accounts do not have multi-factor authentication enabled?
- Which team members have been assigned to a group or role with appropriate access to PHI/ePHI?

### Application Development

- What are the code repos for a particular application or project?
- Were there any Code Repos added in the last 24 hours?
- Who are the most recent contributors to this repo?
- Which PRs did this developer open in the last 5 days?
- Which developer opened the most PRs in the past year?
- Are code changes reviewed and approved?
- Are there code commits by an unknown developer in a PR?
- Are there records for production changes?
- Are changes to system images documented and reviewed during development?
- What are the public/private code repos?
- Who are the developers with access to code repos?

### Data

- Are there any non-public data stores incorrectly configured with public access to everyone?
- Which user or group or network or host has access to data stores containing PHI/ePHI?
- Which user or group or network or host has access to data stores containing critical or sensitive data?
- Who has been assigned access role and policy with access to critical or sensitive data?
- Which server instances store PHI/ePHI?
- Which server instances store critical or sensitive data?
- Which access keys / SSH keys allow access to instances that contain critical or sensitive data?
- Which data stores do not have proper classification tags?
- What is the inventory of my sensitive data stores?
- Which production data stores do not have proper classification tags?
- Is there any known confidential or critical data outside of production?
- Are there disks not in use?
- Evidence of data-at-rest encryption for production servers
- Are my production or PHI/PII data stores encrypted?
- Is my critical data in production encrypted?
- Is there unencrypted ePHI or PII?
- Is data in production backed up?
- Are publicly available data or systems protected against unauthorized modification?
- What are the crypto keys and certificates in use?

### Endpoints

- Whose endpoint is out of compliance?
- Is there anybody who does not have a user endpoint device (e.g. a laptop or workstation)?
- Are there devices not assigned to a user/person?
- What is the configuration and compliance status of my endpoint devices?
- Is there malware protection for all endpoints?
- Is there protection for all user endpoints/devices?
- Is operating system patching and auto-update enabled on endpoint hosts?
- Is application patching and auto-update enabled on endpoint hosts?
- Are my servers and systems protected by hosted-based firewall?
- Are user devices configured with screen lock protection?
- Are there security agents monitoring and protecting my endpoint hosts/devices?
- Is operating system patching and auto-update enabled on endpoint hosts?
- Is application patching and auto-update enabled on endpoint hosts?
- Are my servers and systems protected by hosted-based firewall?
- What are the approved server/system images?
- Are all system images updated in the past six months?
- Which hosts are (or are not) using approved standard images?
- Which devices have been disposed in the last 12 months?
- What applications are in use by endpoint hosts/devices?

### Governance

- What are the corporate security policies and procedures?
- Have security policies and procedures been updated or reviewed within the past 12 months?
- Are access control policies and procedures documented and reviewed?
- Are password policies established and made aware to users?
- What are the policies and procedures related to network access or remote/vpn access?
- What are the policies and procedures for acceptable use?
- Who is the appointed security officer?
- Who are the security team members?
- What are my documented risks?
- Was there at least one risk assessment performed within the past year?
- Who are my vendors?
- Which vendors have access to sensitive information? Do I have an appropriate BAA/DPA/NDA for them?
- Is vendor SLA being monitored? Is there regular status reporting for my vendors?
- Are NDA documents maintained with vendors who have access to confidential information?
- Is security review performed for ISP/CSP vendors?
- Is security review performed for high risk vendors with access to sensitive data?
- What security assessments have been done in the past year and who performed them?

### Incident Response

- What are the documented incidents within the last year?
- Are there documented learnings (i.e. postmortem activities) from incidents or outages?

### Infrastructure

- What is the network architecture?
- What resources are directly connected to the Internet?
- What production resources are directly connected/exposed to the Internet/everyone?
- What firewall rules allow ingress or egress Internet access in production environments?
- Are there potential IP collisions among the networks/subnets within the same site or region?
- What hosts or devices are connected to my internal networks?
- Show all inbound SSH firewall rules across my network environments.
- Is inbound SSH allowed directly from an external host or network?
- What network traffic is allowed between internal and external (i.e. between trusted and untrusted) networks?
- Is there proper segmentation/segregation of internal networks?
- Are wireless networks segmented and protected by firewalls?
- Show listing of network layer firewall protection across all my environments.
- Are there VPNs configured for remote access?
- Are there separate production and dev/test environments?
- What are the load balancers in production?
- What are the distribution gateways in my production CDN?

### Activity and Log Monitoring

- Sample user activity monitoring findings within the past year.
- Sample administrator activity monitoring findings within the past year.
- Where are system logs stored?
- Are logs protected? Who has access to logs?
- How long are logs retained?

### Privacy

- Where is the privacy policy published?
- When was the last privacy assessment performed?
- Is there signed privacy agreement (e.g. data processing agreement - DPA) with each vendor with access to PII/PHI?
- Is privacy training provided to relevant personnel?

### Threat Analysis

- Show me a graph of the inbound attacks.
- Show me a graph of the outbound attacks.
- List the threat intel sources and/or special interest groups the security team subscribes to.

### Training

- What training courses were provided last year?
- Who has not completed assigned training?
- Who has not completed required training?
- Is HIPAA training provided to relevant personnel?
- Is secure development training provided to relevant personnel?
- Did all applicable personnel receive training on security policies and procedures?

### Vulnerability Management

- What open vulnerabilities do I have?
- Which applications are vulnerable?
- Which hosts are vulnerable?
- Sample findings of vulnerability or weakness from the past year.
- Are there software licensing related findings?

### General

- How many billable assets do I have in JupiterOne?
- Are my assets tracked? How many entities are there?
- What are my production information assets and their classifications?
- What are my production information assets and their owners?
- What are my production information assets?
- What are my production systems and servers?
- What are my production data stores and databases?
- What are my production resources?
- What vendor software applications are in use?
- What operating systems are in use?
- What are my production applications?
- Do I have proper vendor support for my software applications?
- Are there sensitive systems or data stores outside of production environments?
- Who are the new hires within the last 12 months?
- What applications are we developing?
- What changed in my environment in the last 24 hours?
- What was added to my environment in the last 24 hours?
- What is the organizational reporting structure (org chart)?

## Integration Questions

- [aws] Was the root account user recently used to log in or access?
- [aws] Is MFA enabled for the Account Root User for all my AWS accounts?
- [aws] Are there root user access keys in use for any of my AWS accounts?
- [aws] Is MFA enabled for all IAM users that have a console password?
- [aws] Are there active IAM user access keys unused for more than 90 days?
- [aws] Which IAM user has password older than 90 days?
- [aws] Which IAM user has not logged in to the console in more than 90 days?
- [aws] Which IAM user account has not been accessed in 90 days?
- [aws] Which IAM user access keys are older than 90 days?
- [aws] Are there inactive IAM user access keys?
- [aws] IAM password policy should require at least one uppercase letter.
- [aws] IAM password policy should require at least one lowercase letter.
- [aws] IAM password policy should require at least one symbol.
- [aws] IAM password policy should require at least one number.
- [aws] IAM password policy should require minimum length of 14 characters.
- [aws] IAM password policy should prevent reuse of the same password (for at least past 10 history).
- [aws] IAM password policy should enforce password expiration within 90 days.
- [aws] Are there IAM Users with inline policy directly attached?
- [aws] Which IAM policies allow full admin access to any and all resources?
- [aws] Find all the IAM user access keys in production AWS accounts.
- [aws] Find all the SSH key pairs in production AWS accounts.
- [aws] Are there SSH keys not in use?
- [aws] Is there anything that connects to an external AWS account that is not part of my organization?
- [aws] What Lambda functions are in my environment, and what triggers them?
- [aws] How are my Lambda functions invoked?
- [aws] List Lambda Functions by Runtime
- [aws] Which Lambda functions are inside a VPC?
- [aws] Which IAM roles are assigned which IAM policies?
- [aws] Who has been assigned full Administrator access?
- [aws] Who has direct user access to my AWS accounts?
- [aws] Who has direct user access to my production AWS accounts?
- [aws] Who has access to my AWS accounts via SSO?
- [aws] Who has access to my production AWS accounts via SSO?
- [aws] Who has access to my AWS accounts via SSO in a multi-account environment?
- [aws] Who can assume which role across my AWS environment?
- [aws] Are there assume role trusts to external entities?
- [aws] What are the service roles in my AWS accounts (i.e. an IAM Role that has a trust policy to an AWS Service)?
- [aws] What trusts are configured to a federated identity provider?
- [aws] Are there users with non-compliant endpoint devices that can access AWS?
- [aws] What compute resources are configured for use by AWS Batch?
- [aws] What are the active Batch container job definitions?
- [aws] How many inactive Batch job definitions are there?
- [aws] Which EC2 instances have actively running ECS container instances?
- [aws] Show me details of currently running ECS tasks.
- [aws] Are all EBS volumes encrypted?
- [aws] Is default server side encryption enabled for all S3 Buckets?
- [aws] Is public access block configured for non-public S3 Buckets?
- [aws] Is public read access enabled for any S3 Bucket?
- [aws] Is public write access enabled for any S3 Bucket?
- [aws] Is public access enabled for any S3 Bucket?
- [aws] Is S3 bucket access granted to anybody outside of the account?
- [aws] Is there any S3 bucket that grants full control access to anybody other than the owner?
- [aws] Which S3 buckets are used to store cloudtrail logs?
- [aws] Which S3 buckets have inventory reports enabled? And where do they publish to?
- [aws] Is CloudTrail logging enabled?
- [aws] Who has access to cloudtrail logs?
- [aws] Is the S3 bucket containing cloudtrail logs publicly accessible?
- [aws] Is CloudTrail logging / trails integrated with CloudWatch logs?
- [aws] Is access logging enabled on the S3 bucket containing cloudtrail logs?
- [aws] Is encryption enabled on the S3 bucket containing cloudtrail logs?
- [aws] Is there any leak credential or secret in CloudFormation stack parameters or outputs?
- [aws] Which EC2 instances or Lambda functions are configured to write logs to CloudWatch?
- [aws] Are there any EBS volumes not in use?
- [aws] Which security group rules allow inbound traffic from a public network or host on the Internet?
- [aws] Which security group rules allow outbound traffic to a public network or host on the Internet?
- [aws] Which security group rules allow inbound SSH traffic from the Internet?
- [aws] Which security group rules allow inbound RDP (remote desktop) traffic from the Internet?
- [aws] Which security group rules allow inbound traffic from the Internet?
- [aws] Which security group rules allow outbound traffic to the Internet?
- [aws] Are there EC2 instances exposed to the Internet?
- [aws] Which EC2 instances may have external network connections?
- [aws] Are there ENIs not in use?
- [aws] Are there EIPs not in use?
- [aws] Are all the AWS Config rules complaint?
- [aws] Are there any noncompliant production resources in AWS per Config evaluation?
- [aws] Show me correlation of instances impacted by Inspector findings and GuardDuty findings
- [aws] Are there public facing instances that are allowed to access non-public S3 buckets?
- [aws] What IAM roles and policies can external facing instances use?
- [aws] S3 buckets referenced in IAM or bucket policies that do not exist in integrated accounts
- [aws] AWS Cross-Account Assume Role Trusts Diagram
- [aws] Are VPC Flow Logs enabled?
- [aws] What is the estimated monthly cost of my RDS database backups?
- [aws] What's behind elastic load balancers?
- [hackerone] Show me the total bug bounty awarded by hacker.
- [knowbe4] Which developers have not completed secure development training?
- [okta] Is every Okta user using MFA? Anyone not assigned an MFA device?
- [okta] Which Okta user has access to the greatest number of applications?
