# Bulk Upload

JupiterOne supports the bulk upload of entity and relationship data via a JSON file.
This is done in the **Assets** app.

## Data Format

For the bulk upload process to succeed, the file must adhere to the bulk upload
schema defined [here][1].

## Guide

Navigate to the **Assets** app -> Click the plus (Add Entity) button ->
Either drag your file into the drop zone, or click the drop zone to select
your file.

## Public API

JupiterOne exposes a public REST API to programatically perform bulk entity and relationship
uploads.  The details on that API can be seen [here][2].

## Notes

Depending on the size of the uploaded file, the entities and relationships may not
show up in the Inventory Table right away.  Hold tight!  JupiterOne is processing your
data, and it will show up in your Inventory soon.

[1]: ./schemas/bulk-upload.md
[2]: ./jupiterone-api.md#entity-and-relationship-synchronization
