``Relationship``
================

A Relationship is the edge between two Entity nodes in the graph. The `_class` of the relationship should be, in most cases, a generic descriptive verb, such as 'HAS' or 'IMPLEMENTS'.

Includes properties from:

* `Metadata <Metadata.html>`_

_class (string) - Optional
--------------------------

Contains an enumeration of defined Relationship classes.

**Options**

* ALLOWS
* ASSIGNED
* CONNECTS
* CONTAINS
* CONTRIBUTES_TO
* DENIES
* DEPLOYED_TO
* EVALUATES
* EXPLOITS
* EXTENDS
* HAD
* HAS
* IS
* IDENTIFIED
* IMPACTS
* IMPLEMENTS
* MANAGES
* MITIGATES
* MONITORS
* PERFORMED
* PERMITS
* PROTECTS
* PROVIDES
* REJECTS
* OWNS
* TRIGGERS
* TRUSTS
* USES

displayName (string) - Optional
-------------------------------

Display name of this relationship. By default, or if this property is not set, the Relationship should display the value of its _class, such as 'HAS' or 'IMPLEMENTS'.

webLink (string) - Optional
---------------------------

Web link to the source. For example, with a relationship like `CodeRepo -HAS-> Vulnerability`, there could be a webLink on the `HAS` relationship that points to a Jira issue to track that particular finding instance.

Format: uri

isValidated (boolean) - Optional
--------------------------------

Indicates if this relationship has been validated.

isTemporary (boolean) - Optional
--------------------------------

Indicates if this is a temporary relationship.

isGroupLayout (boolean) - Optional
----------------------------------

Indicates if relationship represent a group. If true, visually this should be implemented with group styling such that the child nodes are shown contained within their parent boundary, instead of shown as lines connecting the nodes.

tag.* (string) - Optional
-------------------------

Named tags assigned to the entity (i.e., 'tag.Name', 'tag.OtherName')

tags (array of string) - Optional
---------------------------------

An array of unnamed tags