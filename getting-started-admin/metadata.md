# Entity/Relationship Metadata

The following metadata is assigned by JupiterOne internally to entities and
relationships. All internal metadata has `_` prefix to the property name.

## Class, Type, Key and ID

| Property  | Type                | Description                                |
| --------- | ------------------- | -------------------------------------------|
| `_class`  | `string | string[]` | The abstract class label(s) assigned to an entity/relationship. An entity can have multiple class labels while a relationship can only have one.
| `_type`   | `string`            | The specific type of the resource.         |
| `_key`    | `string`            | An identifier of the resource unique within an integration instance or data source scope.
| `_id`     | `string`            | A globally unique identifier of the resource within JupiterOne.

## Timestamps

_All timestamps are store in Epoch milliseconds and displayed in the UI in ISO date string format._

| Property     | Type     | Description                                         |
| ------------ | -------- | --------------------------------------------------- |
| `_createdOn` | `number` | The timestamp the entity/relationship was first created in JupiterOne. Usually represents a time after the resource was created in the provider environment.
| `_beginOn`   | `number` | The timestamp when the latest version of entity/relationship was created. Equivalent to last updated timestamp within JupiterOne (_not_ the timestamp of the resource updated in the provider environment).
| `_endOn`     | `number` | THe timestamp a version of the entity/relationship was deleted in JupiterOne.

> Timestamps from the resource provider, if available, are generally normalized
> to one of the following:
>
> - `createdOn`
> - `updatedOn`
> - `deletedOn`
> - `startedOn`
> - `stoppedOn`

## State and source related metadata

| Property     | Type      | Description                                        |
| ------------ | --------- | -------------------------------------------------- |
| `_deleted`   | `boolean` | Indicates whether a resource was deleted from JupiterOne graph/CMDB. This typically means the resource was recently deleted from the provider source environment.
| `_version`   | `number`  | The version number, which increments every time a change to the resource configuration/attribute is captured.
| `_source`    | `string`  | The source from where the resource was created. Valid options include: `integration-managed`, `powerup-managed`, `system-internal`, `system-mapper`, and `api`.

## Integration specific metadata

_The following metadata only exists on resources created via an integration._

| Property            | Type                | Description                                        |
| ------------------- | ------------------- | -------------------------------------------------- |
| `_integrationClass` | `string | string[]` | Class of the integration that represents the category or domain of the service provider.  For example: `CSP`, `IdP`, `EDR`, `MDM`, etc.
| `_integrationType`  | `string`            | Type of the integration. Typically the service provider name. For example: `aws`, `google`, `azure`, `okta`, `knowbe4`, `vmware`, etc.
| `_integrationName`  | `string`            | User-provided friendly name of the integration instance.
| `_integrationDefinitionId` | `string`     | Internal UUID that identifies the definition for this integration, e.g. AWS, Azure, etc.
| `_integrationInstanceId`   | `string`     | Internal UUID that identifies the integration instance. An integration can have more than one configuration instances. For example, multiple AWS accounts have multiple AWS integration instances.
