``Metadata``
============

The standard metadata properties of a given entity/relationship. These properties are system generated (e.g. set by an integration).  They are viewable in the UI but not directly editable by a user.

_accountId (string) - Required
------------------------------

The account / tenant identifier

_id (string) - Required
-----------------------

An auto-generated and globally unique ID

_key (string) - Required
------------------------

A unique identifier of an entity/relationship within the scope of a single integration instance. For example, for a Bitbucket repo, this _id will be the GUID of the repo as assigned by Bitbucket. For an IAM Role, the _id will be the ARN of the role.

__iconPath (string) - Optional
------------------------------

Path to the icon used in the web app UI

_class (string) - Required
--------------------------

Used to create an abstract security data model. For example, a EC2 instance will have '_class':'Host'. An integration can supply one or more classes which can be used to indicate if a particular entity/relationship conforms to one or more standard classifications. This property is similar to _type except that _class refers to a type that has been standardized while _type is an entity type that only has to be unique in the scope of the provider. It is possible that an entity/relationship has a _type value but no _class value in cases where there is no standard classification for a given entity/relationship.

_type (string) - Required
-------------------------

Describes the type of entity/relationship as identified by the data source (often the integration or sometimes manual user input). The _class property is similar to _type but _class refers to a categorization that has been standardized and it is not unique to a single data integration.

_integrationName (string) - Optional
------------------------------------

Name of the integration that created this entity.

_integrationDefinitionId (string) - Optional
--------------------------------------------

The unique ID of the integration definition that created this entity.

_integrationInstanceId (string) - Optional
------------------------------------------

The unique ID of the integration instance that created this entity.

_createdOn (string) - Required
------------------------------

The datetime in ISO 8601 format when this node was created - the earliest timestamp for this entity as known by the security platform (might be different from when entity was actually created in external system)

Format: date-time

_createdBy (string) - Optional
------------------------------

The entityId of the user who created this node, if it is created manually and not by an integration.

_beginOn (string) - Required
----------------------------

The datetime in ISO 8601 format when this node was updated

Format: date-time

_endOn (string) - Optional
--------------------------

The datetime in ISO 8601 format when a new version of this node was created

Format: date-time

_updatedBy (string) - Optional
------------------------------

The entityId of the user who last updated this node, if it is created manually and not by an integration.

_lastSeenOn (string) - Required
-------------------------------

The datetime in ISO 8601 format when this node was last seen in events/logs or other ingested data sources

Format: date-time

_version (integer) - Required
-----------------------------

Numerical auto-incrementing value that represents the version number of this node. Increments every time the node is updated.

_latest (boolean) - Optional
----------------------------

Indicates if this node is the latest version of the Entity.

_deleted (boolean) - Optional
-----------------------------

Indicates if this node is soft-deleted.

vendorManaged (boolean) - Optional
----------------------------------

Indicates if this entity/relationship is managed by the vendor.

inUse (boolean) - Optional
--------------------------

Indicates if this entity/relationship is in use.

ignore (boolean) - Optional
---------------------------

Instructs the query to ignore this entity/relationship by default.