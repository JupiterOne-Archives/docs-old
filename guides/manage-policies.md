# Policies and Procedures

JupiterOne provides a **Policies** app that allows users to generate and manage
corporate security policies and procedures. It has the following capabilities:

- Generating policies and procedures from templates
- Managing policies and procedures online via the webapp
- Mapping controls/procedures to compliance requirements
- Policy Builder CLI

## Generating policies and procedures from templates

JupiterOne's Policies app provides a set of over 120 policy and procedure
templates to help your organization build your security program and operations
from scratch.  These templates are derived from our own internal policies and
procedures, and have been through several rounds of compliance assessments.

To get started, simply navigate to the **Policies** app, fill in the following
three sections of information in the web form:

- Company information
- Key personnel information (such as your Security and Privacy Officer)
- Security and DevOps tooling information

It may take a few minutes for the policy and procedure documents to be generated
for the first time.

## Managing policies and procedures online via the webapp

Similar to the concept of "micro-services", the policies and procedures are
written as "micro-docs".  Each policy and procedure document is written in its
own individual file, in Markdown format, and linked together via configuration.

The templates are open source and you can check out more details in this repo:
<https://github.com/JupiterOne/security-policy-templates>

The web app allows you to edit a policy or procedure directly online. Simply
click the "Edit" button at the upper corner of a policy or procedure document to
bring up the Markdown editor.

You need to have Administrator access to your JupiterOne account in order to
edit or export policies.

### Variables

Note that the Markdown text contains both global and local variables -- in this
format: `{{variableName}}`. It is best not to edit the variables in the
templates since they would be auto-replaced by the relevant text.

A **Procedure** document may contains an optional local `{{provider}}` variable.
This allows you to configure the control provider that implements or has been
designated the responsibility to fulfill that procedure. For example, the
provider for "Single Sign On" could be "Okta", "OneLogin", "JumpCloud", "Google",
etc. This `provider` value can be entered near the top of the document editor
when it is open, right below the Document Title.

The procedure editor also presents you a short summary guidance description.
Additionally, you may toggle the "Adopted" flag on or off depending on your
readiness to adopt a particular procedure.

### Versioning

Edits to policies and procedure documents are automatically versioned upon save.
The `{{defaultRevision}}` variable will be populated with the date the document
was last edited.

Currently the web app does not have a UI to view previous versions of documents.

### Download / export policy and procedure documents

The "Export / Download Zip" button at the upper right corner of the screen will
generate a zip file containing the following three sets of files:

- templates in Markdown format
- final policies and procedures in Markdown format
- final policies and procedures in HTML format

## Policy Builder CLI

JupiterOne provides an offline CLI that allows your to manage your policies
and procedures offline (for example, as code in a git repo), and publish to
your JupiterOne account as needed.

Detailed usage can be found in the `jupiter-policy-builder` repo and README:
<https://github.com/JupiterOne/jupiter-policy-builder>

### Using your own existing policies

JupiterOne Policies app is an optional component of the platform. It is not
a prerequisite for the rest of the platform. The JupiterOne Compliance app is
the only app that depends on it for proper mapping to compliance framework
requirements and controls.

You are not required to use JupiterOne provided policy/procedure templates.
If your organization already has written documents for security policies and
procedures, and you would like to take advantage of JupiterOne Compliance app
and its mapping capabilities, you can transform your existing policies and
publish them to JupiterOne.

The structure is defined here:
<https://github.com/JupiterOne/security-policy-templates>
