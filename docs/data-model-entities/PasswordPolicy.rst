PasswordPolicy
==============

A password policy is a specific `Ruleset`. It is separately defined because of its pervasive usage across digital environments and the well known properties (such as length and complexity) unique to a password policy.

Includes properties from:

* `Entity <Entity.html>`_
* `Metadata <Metadata.html>`_

``minLength`` (integer) - Optional
----------------------------------

Minimum password length

``requireSymbols`` (boolean) - Optional
---------------------------------------

Indicates if a password must contain at least one symbol

``requireNumbers`` (boolean) - Optional
---------------------------------------

Indicates if a password must contain at least one number

``requireUppercase`` (boolean) - Optional
-----------------------------------------

Indicates if a password must contain at least one uppercase character

``requireLowercase`` (boolean) - Optional
-----------------------------------------

Indicates if a password must contain at least one lowercase character

``maxAgeDays`` (integer) - Optional
-----------------------------------

Specifies how long (in days) a password remains valid before it expires (0 indicates no limit - passwords do not expire)

``minAgeMins`` (integer) - Optional
-----------------------------------

Specifies the minimum time interval (in minutes) between password changes (0 indicates no limit)

``historyCount`` (integer) - Optional
-------------------------------------

Specifies the number of previous passwords that users are prevented from reusing (0 indicates none)

``preventReset`` (boolean) - Optional
-------------------------------------

Indicates if the user is allowed/prevented to change their own password

``expiryWarningDays`` (integer) - Optional
------------------------------------------

Specifies the number of days prior to password expiration when a user will be warned to reset their password (0 indicates no warning)

``hardExpiry`` (boolean) - Optional
-----------------------------------

Specifies whether users are prevented from setting a new password after their password has expired

``excludeUsername`` (boolean) - Optional
----------------------------------------

Indicates if the username must be excluded from the password

``excludeAttributes`` (array of string) - Optional
--------------------------------------------------

The user profile attributes whose values must be excluded from the password

``excludeCommonPasswords`` (boolean) - Optional
-----------------------------------------------

Indicates whether to check passwords against a common/weak password dictionary

``lockoutAttempts`` (integer) - Optional
----------------------------------------

Specifies the number of times users can attempt to log in to their accounts with an invalid password before their accounts are locked (0 indicates no limit)

``autoUnlockMins`` (integer) - Optional
---------------------------------------

Specifies the time interval (in minutes) a locked account remains locked before it is automatically unlocked (0 indicates no limit)

``requireMFA`` (boolean) - Optional
-----------------------------------

Specifies whether multi-factor authentication (MFA) is required