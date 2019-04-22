# Using JupiterOne as a central repository for SecOps and compliance artifacts

JupiterOne already includes several out-of-box managed integration with security
and compliance solutions to consolidate data. For example, security assessments
and findings data from AWS Inspector, GuardDuty, Veracode, WhiteHat, etc.

Inevitably there will be operational and compliance artifacts produced outside
of an automated tools. For example:

- **Assessments** performed manually (such as a risk assessment or manual
  penetration test)
- **Findings** and **Risks** identified from those assessments

These efforts are typically documented in an unstructured format. For example,
as a Word or PDF document. Or they could be maintained in separate repositories
such as a governance, risk and compliance (GRC) or vulnerability
management system/software/service (VMS) application.

JupiterOne serves as a lightweight GRC and VMS so that no separate, siloed tools
are needed, and allows security and compliance artifacts to be managed as code.

## Security artifacts as code

Instead of writing security documents in a Word document that is difficult to
track and maintain, you should create and store artifacts and records as code.
The artifacts can be easily uploaded to JupiterOne for querying and reporting.

Below are some examples. Note these common properties across all entity types:

- `entityId` property is not required. The JupiterOne API will create a new
  entity without an ID, and will update an existing entity with an ID.

- `entityKey` property is required and must be unique. The JupiterOne create
  entity API will update an existing entity with identical key.

- `entityType` and `entityClass` are both required.

- `name` and `displayName` are required properties for all entities.

- All other properties listed in the examples are recommended but not required.

You can create these in either JSON or YAML format to be later uploaded to
JupiterOne. We chose YAML in the examples below because it is much easier to
deal with long, multi-line text in YAML.

### **Assessment** Entity Example

```yaml
---
  - entityId:
    entityKey: assessment:hipaa:2018
    entityType: risk_assessment
    entityClass: Assessment
    properties:
      name: HIPAA Risk Assessment 2018
      displayName: company-hipaa-risk-assessment-2018
      summary: 2018 Annual HIPAA Risk Assessment
      description:
        (sample text)
        Organization's security and compliance team assessed policies, controls
        and procedures to ensure they meet and exceed
        the requirements specified by HIPAA privacy rule and security rule.
      details:
        additional report details
      category: risk-assessment
      status: complete
      assessors:
        - security.staff@yourcompany.com
        - internal.audit@yourcompany.com
      open: false
      classification: confidential
      completedOn: 2018-07-23
      reportURL: <link to full report>
      webLink: <link to full report>

  - entityId:
    entityKey: assessment:pentest:2019q1
    entityType: penetration_test
    entityClass: Assessment
    properties:
      name: internal-pen-test-2019q1
      displayName: Company Internal Penetration Test 2019Q1
      summary: Company Internal Penetration Test Q1 2019 conducted between Mar 18th - Mar 29th
      description:
        (sample text)
        Performed a thorough security assessment of the company product line.
        Scope includes product A, B and C.
      details:
        additional report details
      category: penetration-testing
      status: complete
      assessors:
        - pen.tester1@yourcompany.com
        - pen.tester2@yourcompany.com
      open: false
      classification: confidential
      completedOn: 2019‑04‑05
```

The above example contains an array of two assessment objects - one HIPAA Risk
Assessment and one Internal Penetration Test. If there is a more detailed report
stored elsewhere, such as on company's SharePoint or Google Docs account, you
can link to it using the `reportURL` and `webLink` properties. The `webLink`
property is a known property by the JupiterOne UI to render a hyperlink.

We recommend writing a full report in markdown and also store that in source
code control. The `reportURL` / `webLink` in that case will be something like

```text
https://bitbucket.org/yourorg/security-assessments/src/master/2018/hipaa-risk-assessment-report.md
```

By specifying the email address(es) of the assessor(s), JupiterOne will look up
those individuals (the `Person` entities) and create the following mapped
relationship:

```text
Person (with matching email address) - PERFORMED -> Assessment
```

### **Risk** Entity Example

```yaml
---
  - entityId:
    entityKey: risk:endpoint-management-gaps
    entityType: technical_risk
    entityClass: Risk
    properties:
      name: Endpoint management gaps
      displayName: Endpoint management gaps
      summary: Lack of visibility on how user endpoint systems/devices are configured
      description:
        (sample text)
        Endpoint systems should be configured according to the company's IT and
        security standards. Because currently all enduser systems (e.g. laptops)
        are self managed, there is a lack of centralized visibility into how
        each system is configured and if they meet the compliance requirements

      details:
        'Systems should be configured with at least the following:'

          1. Disk encryption enabled
          2. Screensaver protection/screen lock on
          3. Local firewall enabled
          4. Remote login disabled
          5. Auto install OS security patches enabled
          6. (if it is Windows) Has Windows Defender or equivalent malware protection running

      category: technical
      threats: malware
      targets: enduser devices
      probability: 2
      impact: 2
      score: 4
      status: open
      reporter: security@yourcompany.com
      open: true
      mitigation:
      jiraKey: SEC-112
      webLink: https://yourcompany.atlassian.net/browse/SEC-112
```

Notes:

- The Risk `score` = `probability` times `impact`

  - Both `probability` and `impact` are numeric values, between 0-3.
    (you may choose to use a different scale)

  - Probability rating:

    - 3: high/certain
    - 2: medium/likely
    - 1: low/unlikely
    - 0: none/negligible
  
  - Impact rating:
  
    - 3: high/severe
    - 2: medium/moderate
    - 1: low/minor
    - 0: none/insignificant

- Example valid Risk `status`:

  - `accepted`
  - `mitigated`
  - `transferred`
  - `reported`
  - `planned`
  - `acknowledged`
  - `prioritized`

- The Risk is considered `open` unless it is `accepted`, `mitigated` or
  `transferred` status.

- When uploaded to JupiterOne, it will automatically map a relationship using
  the email address specified in the `reporter` property to an employee/Person:

  ```text
  Person (with matching email address) - REPORTED -> Risk
  ```

- Similarly, specify the assessment name in the `assessment` property to create
  the following mapping:

  ```text
  Assessment (with matching name) - IDENTIFIED -> Risk
  ```

- The `webLink` property is optional.

- Note the `jiraKey` property and the `webLink` URL in the example points to a
  Jira issue -- if Jira is used to track the workflow of this Risk item.

### **Finding** Entity Example

A vulnerability finding is similar to a risk item:

```yaml
---
  - entityId:
    entityKey: finding:pentest:2019q1:appcode-1
    entityType: pentest_finding
    entityClass: Finding
    properties:
      name: XSS in application {appname}
      displayName: XSS in application {appname}
      summary: Stored cross side scripting identified in application {appname}
      targets:
        - appname
      description:
        description of the finding
      stepsToReproduce:
        - '1 - Sign in to application... navigate to page...'
        - '2 - Enter <script>alert(1)</script> in textbox...'
        - '3 - Hit save...'
      impact:
        Attacker may store malicious javascript...
      recommendation:
        Perform input validation in the code...
      severity: high
      priority: 2
      remediationSLA: 30
      status: open
      assessment: internal-pen-test-2019q1
      open: true
      classification: confidential
      jiraKey: SEC-99
      webLink: https://yourcompany.atlassian.net/browse/SEC-99
```

Again, here the `assessment` property is used to connect the finding to the
assessment that identified it.

Additionally, if the `targets` contains one or more entries that match the
`name` of an `Application` or `CodeRepo` or `Project` entity, this finding will
be linked to that matching entity, so that you can easily run a query like:

```j1ql
Find (Application|CodeRepo|Project) that has Finding with severity='high'
```

Also note the `remediationSLA` property above. This specifies the number of days
your team has to address this finding per your company policy.

## Uploading to JupiterOne

Once you have these artifacts created, they can be easily uploaded to JupiterOne
using the CLI. Just follow these three simple steps below:

1. Obtain an API Key from JupiterOne account

1. Install JupiterOne client/CLI:

  ```bash
  npm install @jupiterone/jupiterone-client-nodejs -g
  ```

1. Upload the artifacts (entities) to the LifeOmic account on JupiterOne:

  ```bash
  export J1_API_TOKEN={api_key}
  j1 -o create --entity -a lifeomic -f ./risks.yml
  j1 -o create --entity -a lifeomic -f ./assessments.yml
  j1 -o create --entity -a lifeomic -f ./findings.yml
  ```

We highly recommended you use a source code control system such as Github or
Bitbucket to maintain these artifacts. This way, you can easily set up your CI
system (e.g. Travis CI or Jenkins) to run the above commands to automatically
keep the entities updated in JupiterOne with every approved code change (i.e.
when a PR is merged to master).

### Reporting and Visualization

You can see and export these assessments, risks, and findings from the Asset
Inventory app in JupiterOne. Or easily query and visualize them.

For example:

![pentest-findings](../assets/graphs/person-performed-pentest-findings.png)

Lastly, these artifacts are automatically tracked and mapped to the supported
compliance requirements as evidences for conducting the necessary assessments.

For example:

![risk-assessments](../assets/compliance-hitrust-risk-assessments.png)
