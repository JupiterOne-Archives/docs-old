Finding
=======

A security finding, which may be a vulnerability or just an informative issue. A single finding may impact one or more resources. The `IMPACTS` relationship between the Vulnerability and the resource entity that was impacted serves as the record of the finding. The `IMPACTS` relationship carries properties such as 'identifiedOn', 'remediatedOn', 'remediationDueOn', 'issueLink', etc.

Includes properties from:

* `RecordEntity <RecordEntity.html>`_
* `Metadata <Metadata.html>`_

``category`` (string) - Required
--------------------------------

The category of the finding. For example: 'event', 'app-scan', 'system-scan', 'pen-test'

``assessment`` (string) - Optional
----------------------------------

The name/id of the assessment that produced this finding.

``status`` (string) - Optional
------------------------------

Status of the vulnerability

``severity`` (string) - Required
--------------------------------

Severity rating based on impact and exploitability. Can be a string such as 'critical', 'high', 'medium', 'low', 'info'.  Or an integer usually between 0-5.

``priority`` (string) - Optional
--------------------------------

Priority level mapping to Severity rating. Can be a string such as 'critical', 'high', 'medium', 'low', 'info'.  Or an integer usually between 0-5.

``score`` (number) - Optional
-----------------------------

The overall vulnerability score, e.g. CVSSv3.

``impact`` (string) - Optional
------------------------------

The impact description or rating.

``exploitability`` (number) - Optional
--------------------------------------

The exploitability score/rating.

``vector`` (string) - Optional
------------------------------

The vulnerability attack vector. (e.g. a CVSSv3 vector looks like this - 'AV:N/AC:L/PR:N/UI:R/S:C/C:L/I:L/A:N')

``stepsToReproduce`` (array of string) - Optional
-------------------------------------------------

Steps to reproduce this finding.

``recommendation`` (string) - Optional
--------------------------------------

Recommendation on how to remediate/fix this finding.

``targets`` (array of string) - Optional
----------------------------------------

The target listing of projects, applications, repos or systems this vulnerability impacts. Specifying either the project/repo name or the application URL here will auto-map this Vulnerability to the corresponding Project/CodeRepo/Application entity if a match is found.

``targetDetails`` (array of string) - Optional
----------------------------------------------

Additional details about the targets. Can be a string or an array.

``remediationSLA`` (integer) - Optional
---------------------------------------

The number of days that the Vulnerability must be remediated within, based on SLA set by the organization's internal vulnerability management program policy. The actually due date is set by 'remediationDueOn' property on the `IMPACTS` relationship between the Vulnerability and its impacted resource entity.

``blocksProduction`` (boolean) - Optional
-----------------------------------------

Indicates whether this vulnerability finding is a blocking issue. If true, it should block a production deploy. Defaults to false.

``open`` (boolean) - Required
-----------------------------

Indicates if this is an open vulnerability.

``production`` (boolean) - Required
-----------------------------------

Indicates if this vulnerability is in production.

``public`` (boolean) - Required
-------------------------------

Indicates if this is a publicly disclosed vulnerability. If yes, this is usually a CVE and the 'webLink' should be set to 'https://nvd.nist.gov/vuln/detail/${CVE-Number}' or to a vendor URL. If not, it is most likely a custom application vulnerability.

``validated`` (boolean) - Optional
----------------------------------

Indicates if this Vulnerability finding has been validated by the security team.

``references`` (array of string) - Optional
-------------------------------------------

The array of links to references.