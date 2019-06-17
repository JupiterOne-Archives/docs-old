# Risks and Vulnerability Management

## Which applications or code repos are vulnerable?

_Requires at least one application scanner integration such as Veracode or WhiteHat._

```j1ql
Find (Application|CodeRepo) as app that has (Finding|Vulnerability) as vuln
  return
    app._type, app.displayName,
    vuln._type, vuln.displayName, vuln.severity, vuln.numericSeverity
```

## Which systems/instances are vulnerable?

_Requires enabling AWS Inspector, GuardDuty, Tenable or similar integration._

```j1ql
Find (Host|Workload|DataStore) as system
  that has (Finding|Vulnerability) as vuln
  return
    system._type, system.displayName,
    vuln._type, vuln.displayName, vuln.severity, vuln.numericSeverity
```

## What open vulnerabilities do I have?

```j1ql
Find (Finding|Vulnerability) with open=true
```

_This is best viewed in the **Alerts** app under **Open Findings** tab._

## What vulnerabilities are suppressed/resolved/marked as exception?

Similar, you can query for vulnerability findings that are resolved/suppressed
or marked as exception:

```j1ql
Find (Finding|Vulnerability)
  with open=false or suppressed=true or exception=true
```

## Do I have proper vendor support for my software applications?

```j1ql
// This returns data that is derived from a SSO application
// Requires integration with Okta or OneLogin or similar SSO identity provider
Find Application as app that
  CONNECTS Account that RELATES TO Vendor as v
  return app.displayName as app, v.name as vendor, v.linkToSLA, v.linkToMSA

// Or in a more generic way
Find Application that RELATES TO (Vendor|Account)

// Returns all applications that does not have a vendor or
// vendor account associated
Find Application that !RELATES TO (Vendor|Account)
```

## Are all system images updated in the past six months?

```j1ql
// Find images that have been updated within 6 months
Find Image with createdOn > date.now - 6 months

// Find images that have not be updated within 6 months
Find Image with createdOn < date.now - 6 months
```

## What are the approved server/system images?

```j1ql
// Find private images or the ones that have been specifically approved
Find Image with public=false or approved=true
```

## Who are my vendors? Do I have a BAA/DPA/NDA/MSA and SLA/Support Agreement with them?

```j1ql
Find Vendor
```

_This is best viewed in the Asset Inventory app by selecting the Vendor class
from the quick filter._
