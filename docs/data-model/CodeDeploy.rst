CodeDeploy
==========

A code deploy job.

Includes properties from:

* `RecordEntity <RecordEntity.html>`_
* `Metadata <Metadata.html>`_

``jobName`` (string) - Optional
-------------------------------

Build/deploy job name.

``jobNumber`` (integer) - Optional
----------------------------------

Build/deploy job number.

``summary`` (string) - Optional
-------------------------------

Descriptive text of the job.

``action`` (string) - Optional
------------------------------

Deploy action (e.g. plan, apply, destroy, rollback).

``target`` (string) - Optional
------------------------------

Name of the target system or environment.

``production`` (boolean) - Optional
-----------------------------------

Indicates if this is a production deploy, defaults to true.