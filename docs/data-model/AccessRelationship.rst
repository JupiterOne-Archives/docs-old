AccessRelationship
==================

A Relationship that represents permission settings/rules between two entities.

Includes properties from:

* `Relationship <Relationship.html>`_
* `Metadata <Metadata.html>`_

``_class`` (string) - Optional
------------------------------

Contains an enumeration of defined Relationship classes.

**Options**

* ALLOWS
* CAN_ACCESS
* DENIES
* PERMITS
* REJECTS

``permissions`` (array of string) - Optional
--------------------------------------------

Defines permissions of a Relationship. For example, `ses:Get*`, `s3:GetObjects` for access policy; or `<protocol>.<port-range>` for firewall rules.

``accessLevel`` (array) - Optional
----------------------------------

Defines the CRUD level of access - CREATE, READ, UPDATE, DELETE - and additionally, ADMIN. For CAN_ACCESS Relationship.

**Options**

* CREATE
* READ
* UPDATE
* DELETE
* ADMIN

``protocol`` (string) - Optional
--------------------------------

Network traffic protocol (e.g. TCP, UDP, ICMP)

**Options**

* TCP
* UDP
* ICMP
* ALL

``portRange`` (string) - Optional
---------------------------------

Network traffic port range. This can be a single port (e.g. 80), or a range (e.g. 8080-8082), or any/all (represented by the string 'any' or '0-65535').

``type`` (string) - Optional
----------------------------

Named type of access. For example: 'SSH', 'HTTPS', or 'S3 Read Access'.