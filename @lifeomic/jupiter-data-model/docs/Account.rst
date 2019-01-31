Account
=======

An organizational account for a service or a set of services (e.g. AWS, Okta, Bitbucket Team, Google G-Suite account, Apple Developer Account). Each Account should be connected to a Service.

Includes properties from:

* `Entity <Entity.html>`_
* `Metadata <Metadata.html>`_

``production`` (boolean) - Required
-----------------------------------

Indicates if this is a production account, defaults to false.

``accessURL`` (string) - Optional
---------------------------------

The main URL to access this account, e.g. https://lifeomic.okta.com

Format: uri

``mfaEnabled`` (boolean) - Optional
-----------------------------------

Specifies whether multi-factor authentication (MFA) is enabled/required for users of this account.