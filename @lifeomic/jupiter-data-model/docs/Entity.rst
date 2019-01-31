``Entity``
==========

A node in the graph database that represents an Entity. This reference schema defines common shared properties among most Entities.

Includes properties from:

* `Metadata <Metadata.html>`_

name (string) - Required
------------------------

Name of this entity

displayName (string) - Required
-------------------------------

Display name, e.g. a person's preferred name or an AWS account alias

summary (string) - Optional
---------------------------

A summary / short description of this entity.

description (string) - Optional
-------------------------------

An extended description of this entity.

classification (string) - Optional
----------------------------------

The sensitivity of the data; should match company data classification scheme

**Example Values**

* critical
* confidential
* internal
* public

criticality (integer) - Optional
--------------------------------

A number that represents the value or criticality of this entity, on a scale between 1-10.

risk (integer) - Optional
-------------------------

The risk level of this entity, on a scale between 1-10.

trust (integer) - Optional
--------------------------

The trust level of this entity, on a scale between 1-10.

complianceStatus (number) - Optional
------------------------------------

The compliance status of the entity, as a percentage of compliancy.

status (string) - Optional
--------------------------

Status of this entity set by the external source system or by a user, e.g. Active, Inactive, Decommissioned

**Options**

* active
* inactive
* suspended
* terminated
* open
* closed
* pending
* unknown
* other

active (boolean) - Optional
---------------------------

Indicates if this entity is currently active.

public (boolean) - Optional
---------------------------

Indicates if this is a public-facing resource (e.g. a public IP or public DNS record) or if the entity is publicly accessible. Default is false.

validated (boolean) - Optional
------------------------------

Indicates if this node has been validated as a known/valid Entity.

temporary (boolean) - Optional
------------------------------

Indicates if this node is a temporary resource, such as a lambda instance or an EC2 instance started by ECS.

expiresOn (string) - Optional
-----------------------------

If the entity is a temporary resource, optionally set the expiration date. For example, the expiration date of an SSL cert.

Format: date-time

webLink (string) - Optional
---------------------------

Web link to the source. For example: https://console.aws.amazon.com/iam/home#/roles/Administrator. This property is used by the UI to add a hyperlink to the entity.

Format: uri

owner (string) - Optional
-------------------------

The owner of this entity. This could reference the name of the owner, or as reference ID/key to another entity in the graph as the owner.

tag.* (string) - Optional
-------------------------

Named tags assigned to the entity (i.e., 'tag.Name', 'tag.OtherName')

tags (array of string) - Optional
---------------------------------

An array of unnamed tags

notes (array of string) - Optional
----------------------------------

User provided notes about this entity