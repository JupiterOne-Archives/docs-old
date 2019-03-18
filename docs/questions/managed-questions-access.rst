.. This file is generated in jupiter-provision-managed-questions.
   Do not edit by hand as this document will be overwritten when
   jupiter-provision-managed-questions is deployed!

======
Access
======

Find anything that allows public access to everyone.
----------------------------------------------------

Returns all entities that have an 'ALLOWS' permission directly to the global 'everyone' entity.

**Tags:** ``access``, ``SecOps``

Queries
+++++++

- ::

  Find Everyone that ALLOWS * return tree

- ::

  Find Everyone that ALLOWS * as resource return resource.tag.AccountName, resource._type, resource.name, resource.classification, resource.description, resource.webLink

Show me the current password policy and compliance status.
----------------------------------------------------------

Returns all password policies and details. The second query finds all ControlPolicy entities with 'password' as a search string and the entity resources that each matched ControlPolicy evaluates -- this works if you have AWS Config enabled to evaluate your account password policy.

**Tags:** ``access``, ``compliance``, ``HIPAA``, ``HITRUST CSF``

Queries
+++++++

- ::

  Find PasswordPolicy

- ::

  'password' with _class='ControlPolicy' as p that evaluates * as e return p.displayName as Policy, e.displayName as TargetEnv, p.compliant as Compliant, p.inputParameters as Details

Compliance Mappings
+++++++++++++++++++

**HITRUST CSF:** ``01.d``, ``01.p``, ``01.r``

Are there external users with access to our systems?
----------------------------------------------------

Returns all User entities that are a Person (i.e. users accounts owned by an individual) who is not employed by your organization (i.e. the Root entity). Note that the query finds relationships bidirectionally. `!EMPLOYS` here translates to 'is not employed by'. The second query returns user accounts owned by contractors.

**Tags:** ``access``, ``compliance``, ``HIPAA``, ``HITRUST CSF``

Queries
+++++++

- ::

  Find User that IS Person that !EMPLOYS Root

- ::

  Find User as u that IS Person as p where u.userType='contractor' or p.employeeType='contractor'

Compliance Mappings
+++++++++++++++++++

**HITRUST CSF:** ``01.j``, ``05.i``

Organizations must show due diligence managing the information security risks posed by external parties. This includes identifying and managing the access to data/systems by external parties such as service providers and contractors.

Who has been assigned permissions with administrator/privileged access?
-----------------------------------------------------------------------

Returns policies with admin access and the entities that are assigned each policy. Note that in most cases, integrations set the 'admin' boolean to true if the policy name contains the keyword 'admin'.

**Tags:** ``access``, ``SecOps``, ``compliance``, ``CIS Controls``, ``HITRUST CSF``, ``PCI DSS``

Queries
+++++++

- ::

  Find AccessPolicy with admin=true as policy that ASSIGNED * as e return policy.displayName, policy.webLink, e.displayName, e.webLink

Compliance Mappings
+++++++++++++++++++

**CIS Controls:** ``4.1``

**HITRUST CSF:** ``01.c``

**PCI DSS:** ``7.1``, ``7.3``, ``8.1``, ``8.3``, ``8.7``

Who has access to what systems/resources?
-----------------------------------------

Returns all users and their access.

**Tags:** ``access``, ``SecOps``, ``compliance``, ``HIPAA``, ``HITRUST CSF``

Queries
+++++++

- ::

  Find (User|Person) as u that (ASSIGNED|TRUSTS|HAS|OWNS) (Application|AccessPolicy|AccessRole|Account|Device|Host) as a return u.displayName, u._type, u.username, u.email, a._type, a.displayName, a.tag.AccountName order by u.displayName

Compliance Mappings
+++++++++++++++++++

**HITRUST CSF:** ``01.e``, ``01.v``

Access should be reviewed at least quarterly and whenever an employee's status changes.

Who owns which user accounts?
-----------------------------

Returns all User entities (i.e. user accounts) that are mapped to a Person.

**Tags:** ``access``, ``SecOps``, ``compliance``, ``HIPAA``, ``HITRUST CSF``

Queries
+++++++

- ::

  Find User that IS Person

Compliance Mappings
+++++++++++++++++++

**HITRUST CSF:** ``01.e``

Access should be reviewed at least quarterly and whenever an employee's status changes.

What are the shared/generic/service accounts or access roles? (Including user accounts that are not individually owned)
-----------------------------------------------------------------------------------------------------------------------

Returns all AccessRoles (e.g aws_iam_role) that trusts a service (i.e. can be assumed/used by a service). Additionally, the second query returns all User entities (i.e. user accounts) that are NOT mapped to a Person.

**Tags:** ``access``, ``SecOps``

Queries
+++++++

- ::

  Find AccessRole that TRUSTS Service

- ::

  Find User with mfaEnabled != true that !IS Person

Did we remove all access from employees who left?
-------------------------------------------------

Returns any User entity (i.e. user account) that is mapped to a Person no longer employed by your organization (Root). If access is properly configured and mapped in JupiterOne, this query should return nothing.

**Tags:** ``access``, ``SecOps``, ``compliance``, ``HIPAA``, ``HITRUST CSF``

Queries
+++++++

- ::

  Find User that IS Person that !EMPLOYS Root

Compliance Mappings
+++++++++++++++++++

**HIPAA:** 

**HITRUST CSF:** ``02.i``

Which user accounts do not have multi-factor authentication enabled?
--------------------------------------------------------------------

Returns all user entities that do not have the `mfaEnabled` property set to true and have no MFA device assigned/in use.

**Tags:** ``access``, ``SecOps``, ``compliance``, ``CIS Controls``, ``PCI DSS``

Queries
+++++++

- ::

  Find User with mfaEnabled != true that !(ASSIGNED|USES|HAS) mfa_device

- ::

  Find User with mfaEnabled = true

- ::

  Find User that (ASSIGNED|USES|HAS) mfa_device

Compliance Mappings
+++++++++++++++++++

**CIS Controls:** ``4.5``, ``12.11``, ``16.3``

**PCI DSS:** ``8.2``, ``8.3``