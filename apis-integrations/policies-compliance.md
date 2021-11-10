# Policies and Compliance related data structure

## Compliance Standard and Security Questionnaire JSON Specification

```typescript
type ComplianceStandardSpecification: {
  // name of the standard - e.g. "standard": "PCI DSS"
  standard: string;

  // version of the standard - e.g. "version": "3.2.1"
  version: string;

  // the type of this specification
  type?: 'standard' | 'questionnaire';
 
  // optional web link
  webLink?: string;

  // compliance sections containing individual requirement
  // (a specification has either `sections` or `domains`)
  sections?: Section[];

  // compliance domains containing individual control
  // (a specification has either `sections` or `domains`)
  domains?: Domain[];
}

type Section: {
  // title of the section
  title: string;

  // list of requirements within this section
  requirements: RequirementOrControl[];
}

type Domain: {
  // title of the domain
  title: string;

  // list of controls within this domain
  controls: RequirementOrControl[];
}

type RequirementOrControl: {
  // reference number/id of the requirement or control
  ref: string;

  // title (optional if summary is present)
  title?: string;

  // summary or short description (optional if title is present)
  summary?: string;

  // optional flag to indicate if a control or requirement is applicable
  // defaults to `true`
  applicable?: boolean;
  
  // If the standard is a questionnaire, a response here indicates the answer.
  // This value can also be controlled from the Compliance web app.
  response?: 'yes' | 'no;'
}
```

A **security questionnaire** specification follows the exact same JSON structure
as above, with the addition of a top level property `"type": "questionnaire"`.

Each requirement or control item in a security questionnaire may have an
optional `"response": "yes" | "no"` property to indicate the answer. You can set
this response directly in the JSON or via the Compliance web app. Additional
details and notes can be provided via the web app.

Examples:
<https://github.com/JupiterOne/security-policy-templates/tree/master/templates/standards>

## Policy Procedure to Compliance Mapping JSON Specification

```typescript
type ControlsMappingSpecification {
  procedures: Mapping[];
}

type Mapping {
  // references the id of a security_procedure
  // e.g. "id": "cp-ism-scope"
  id: string;
  implements: Implementation[];
}

type Implementation {
  // name of the standard, matching that of a compliance specification
  // e.g. "standard": "PCI DSS"
  standard: string;

  // a list of requirement references by ref number/id
  // e.g. "requirements": ["1.2", "1.3"]
  requirements?: string[];

  // a list of control references by ref number/id
  // e.g. "requirements": ["1.2", "1.3"]
  controls?: string[];
}
```

Example:
<https://github.com/JupiterOne/security-policy-templates/blob/master/templates/standards/controls-mapping.json>
