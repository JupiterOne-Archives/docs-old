User
====

A user account/login to access certain systems and/or services. Examples include okta-user, aws-iam-user, ssh-user, local-user (on a host), etc.

Includes properties from:

* `Entity <Entity.html>`_
* `Metadata <Metadata.html>`_

``username`` (string) - Required
--------------------------------

Username

``email`` (string) - Optional
-----------------------------

The email address associated with the user account

Format: email

``shortLoginId`` (string) - Optional
------------------------------------

The shortened login Id. For example, if the username is the full email address (first.last@company.com), the shortLoginId would be the part before @ (first.last).

``mfaEnabled`` (boolean) - Optional
-----------------------------------

Specifies whether multi-factor authentication (MFA) is enabled for this user.