# Findings

JupiterOne provides a centralized repository and dashboard to let you easily
manage security findings from different sources, including:

- AWS Inspector findings
- AWS GuardDuty findings
- Veracode static and dynamic analysis findings
- WhiteHat application security findings
- Tenable Cloud scanning findings
- HackerOne report findings
- Manual penetration testing findings (imported via API - see [this guide][1])

*More vulnerability scanner integrations are being added. Current roadmap
includes: Rapid7, Qualys, Bugcrowd, White Source, Source Clear, and Snyk.*

## Managing Findings

Consolidated findings can be accessed in the **Alerts** app, under the
**Findings** tab. The header tab shows a total count of currently open findings.
Selecting it will bring you to the detailed findings view:

![](../assets/alerts-findings-grid.png)

JupiterOne will automatically map resources impacted by or related to each
finding based on the available attributes from the finding source.

Selecting a finding from the list will show you a graph of those relationships.
This allows you to visualize the context to further analyze the finding's impact
and to determine a course of action for remediation.

![](../assets/alerts-findings-graph.png)

## Create Alerts for Findings

You can create custom alert rules to notify you on certain findings, using J1QL
to filter and correlate.

### Examples:

The following three rules are included in the J1 **Common Alerts** Rule Pack:

- **high-severity-finding**

  *Alerts on Findings with a severity of High or a numeric severity rating
  higher than 7 that were new within the last 24 hours.*

  ```j1ql
  Find Finding with
    (severity='High' or severity='high' or numericSeverity>7) and
    _createdOn > date.now-24hours
  ```

- **prod-resources-with-high-severity-finding**

  *Alerts when Production resources are impacted by high severity findings.*

  ```j1ql
  Find (Host|DataStore|Application|CodeRepo|Account|Service|Network)
    with tag.Production=true
    that has Finding with severity=('High' or 'high') or numericSeverity=(7 or 8)
  ```

- **prod-resources-with-critical-finding**

  *Alerts when Production resources are impacted by critical findings.*

  ```j1ql
  Find (Host|DataStore|Application|CodeRepo|Account|Service|Network)
    with tag.Production=true
    that has Finding with severity=('Critical' or 'critical') or numericSeverity=(9 or 10)
  ```

The following rule is included in the J1 **AWS Threat** Rule Pack:

- **aws-guardduty-inspector-finding-instance-correlation**

  *Identifies vulnerable EC2 instances (i.e. with medium or higher rated open
  Inspector finding) that are also targets of suspicious activities (i.e. with
  medium or higher rated open GuardDuty finding).*

  ```j1ql
  Find aws_guardduty_finding with numericSeverity>5 and open=true as guardduty
    that relates to aws_instance as i
    that has aws_inspector_finding with numericSeverity>5 and open=true as inspector
    return i.*, guardduty.*, inspector.*
  ```

[1]: secops-artifacts-in-j1.md