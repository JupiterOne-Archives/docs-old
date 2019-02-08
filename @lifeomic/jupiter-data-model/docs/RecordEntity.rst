RecordEntity
============

A node in the graph database that represents a Record Entity, with a set of different defined common properties than standard (resource) entities.

Includes properties from:

* `Metadata <Metadata.html>`_

``name`` (string) - Required
----------------------------

Name of this entity

``displayName`` (string) - Required
-----------------------------------

Display name, e.g. a person's preferred name or an AWS account alias

``summary`` (string) - Optional
-------------------------------

A summary / short description of this entity.

``description`` (string) - Optional
-----------------------------------

An extended description of this entity.

``classification`` (string) - Optional
--------------------------------------

The sensitivity of the data; should match company data classification scheme. For example: critical - confidential - internal - public.

**Example Values**

* critical
* confidential
* internal
* public

``category`` (string) - Optional
--------------------------------

The category of the official record

**Options**

* exception
* finding
* hr
* incident
* issue
* job
* legal
* request
* policy
* procedure
* problem
* review
* risk
* other

``webLink`` (string) - Optional
-------------------------------

Hyperlink to the location of this record, e.g. URL to a Jira issue

Format: uri

``content`` (string) - Optional
-------------------------------

Text content of the record/documentation

``open`` (boolean) - Optional
-----------------------------

Indicates if this record is currently open. For example, an open Vulnerability finding (Vulnerability extends Record).

``public`` (boolean) - Optional
-------------------------------

If this is a public record. Defaults to false.

``production`` (boolean) - Optional
-----------------------------------

If this is a production record. For example, a production change management ticket would have this set to `true`, and have a `category` = `change` property. Another example would be a Vulnerability finding in production.

``approved`` (boolean) - Optional
---------------------------------

If this is record has been reviewed and approved.

``approvedOn`` (number) - Optional
----------------------------------

The timestamp (in milliseconds since epoch) when this record was approved.

Format: date-time

``approvers`` (array of string) - Optional
------------------------------------------

The list of approvers on the record.

``reporter`` (string) - Optional
--------------------------------

The person or system that reported or created this record.

``reportedOn`` (number) - Optional
----------------------------------

The timestamp (in milliseconds since epoch) when this record was reported/opened. In most cases, this would be the same as `createdOn` but occasionally a record can be created at a different time than when it was first reported.

Format: date-time

``createdOn`` (number) - Optional
---------------------------------

The timestamp (in milliseconds since epoch) when the entity was created at the source. This is different than `_createdOn` which is the timestamp the entity was first ingested into JupiterOne.

Format: date-time

``updatedOn`` (number) - Optional
---------------------------------

The timestamp (in milliseconds since epoch) when the entity was last updated at the source.

Format: date-time