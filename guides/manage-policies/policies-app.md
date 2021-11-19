# Managing Policies and Procedures on JupiterOne

The J1 Policies app enables you to generate and manage
corporate security policies and procedures. It has the following capabilities:

- Generating policies and procedures from templates
- Managing policies and procedures online via the webapp
- Mapping controls/procedures to compliance requirements
- Policy Builder CLI

## Generating Policies and Procedures from Templates

The J1 Policies app provides over 120 policy and procedure templates to 
help your organization build your security program and operations.
These templates derive from the J1 internal policies and procedures, which
have been through several compliance assessments.

If your account is new, when you go to the Policies app, a webform displays
for you to provide the following information:

- Company information
- Key personnel information (such as your security and privacy officer)
- Security and devops tooling information

It may take a few minutes for the policy and procedure documents to generate
for the first time.

## Managing Policies and Procedures Online

Similar to the concept of micro-services, the policies and procedures are
written as micro-docs.  Each policy and procedure document is written in its
own individual file, in Markdown format, and linked together by configuration.

The templates are open source and available here:
<https://github.com/JupiterOne/security-policy-templates>

The online web app allows you to directly edit a policy or procedure. Click the 
edit pencil icon in the upper-right corner of a policy or procedure document to
open the Markdown editor.

You need to have administrator access to your J1 account to edit or export policies.

### Variables

The Markdown text contains both global and local variables in this
format: `{{variableName}}`. It is recommended that you do not edit the 
variables in the templates as they would be auto-replaced by the relevant text.

A procedure document may contain an optional local `{{provider}}` variable.
This variable allows you to configure the control provider that implements 
or is designated to fulfill that procedure. For example, the provider for 
"Single Sign On" could be "Okta", "OneLogin", "JumpCloud", "Google",
for example. You can enter this `provider` value at the top of the document editor
when it is open, below the document title.

The procedure editor also presents a short summary guidance description.
Additionally, you can toggle the Adopted flag on or off, depending on your
readiness to adopt a particular procedure.

### Versioning

Edits to policies and procedure documents are automatically versioned upon saving.
The `{{defaultRevision}}` variable is populated with the date the document
was last edited.

Currently the web app does not have a UI to view previous versions of documents.

### Download or Export Policy and Procedure Documents

Click **Export / Download Zip** in the upper-right corner of the screen to
generate a zip file containing these three sets of files:

- Templates in Markdown format
- Final policies and procedures in Markdown format
- Final policies and procedures in HTML format

## Policy Builder CLI

J1 provides an offline CLI that enables you to manage your policies
and procedures offline, for example, as code in a git repo. You can
then publish to your JupiterOne account, as necessary.

Read more in the [`jupiter-policy-builder` repo and README](https://github.com/JupiterOne/jupiter-policy-builder).

### Using Your Own Existing Policies

The J1 Policies app is an optional component of the J1 platform. It is not
a prerequisite for the rest of the platform. The J1 Compliance app is
the only app that depends on it for proper mapping to compliance framework
requirements and controls.

You are not required to use J1 provided policy/procedure templates.
If your organization already has written documents for security policies and
procedures, and you would like to take advantage of the J1 Compliance app
and its mapping capabilities, you can transform your existing policies and
publish them to J1.

The structure is defined here:
<https://github.com/JupiterOne/security-policy-templates>
