# Import Compliance Standard or Security Questionnaire

The JupiterOne compliance platform allows users to import a compliance
standard/framework or a security questionnaire in either JSON or CSV format.

In the Compliance app:

- click ![+][plus-icon] **Add standard or questionnaire**
- copy/paste the JSON/CSV content into the modal view

[plus-icon]: https://raw.githubusercontent.com/feathericons/feather/master/icons/plus-circle.svg?sanitize=true

See this github repository for example compliance standards in JSON format:

<https://github.com/JupiterOne/security-policy-templates/tree/master/templates/standards>

> Note: You must have obtained the necessary license and permission to use the
> framework for your organization. **Licensing is not provided by JupiterOne**,
> except for CIS Controls and Benchmarks.

## JSON Structure

See the schema documented [here](../../docs/schemas/policies-compliance.md).

## CSV Import

A compliance standard specification can be imported from a CSV, as long as the
CSV header contains the following as column headers:

- `ID`
- `Requirement` or `Control`
- `Section` or `Domain`
