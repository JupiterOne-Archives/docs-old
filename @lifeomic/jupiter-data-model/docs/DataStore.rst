DataStore
=========

A virtual repository where data is stored, such as aws-s3-bucket, aws-rds-cluster, aws-dynamodb-table, bitbucket-repo, sharepoint-site, docker-registry. The exact type is described in the _type property of the Entity.

Includes properties from:

* `Entity <Entity.html>`_
* `Metadata <Metadata.html>`_

``location`` (string) - Optional
--------------------------------

URI to the data store, e.g. https://docker-registry.lifeomic.com or https://lifeomic.sharepoint.com. Or a description to the physical location.

``encryptionRequired`` (boolean) - Optional
-------------------------------------------

If the data needs to be encrypted

``encryptionAlgorithm`` (string) - Optional
-------------------------------------------

Encryption algorithm used to encrypt the data store

``encryptionKeyRef`` (string) - Optional
----------------------------------------

Reference to the encryption key used to encrypt the data store

``encrypted`` (boolean) - Optional
----------------------------------

If the data store is encrypted

``public`` (boolean) - Optional
-------------------------------

Indicates if the data store is open to public access