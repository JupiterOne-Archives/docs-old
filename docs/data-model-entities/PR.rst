PR
==

A pull request.

Includes properties from:

* `RecordEntity <RecordEntity.html>`_
* `Metadata <Metadata.html>`_

``title`` (string) - Required
-----------------------------

The title text of the PR.

``summary`` (string) - Optional
-------------------------------

The summary text of the PR.

``state`` (string) - Required
-----------------------------

The state of the PR.

**Options**

* open
* merged
* declined
* superseded

``source`` (string) - Required
------------------------------

The source branch.

``target`` (string) - Required
------------------------------

The target/destination branch.

``repository`` (string) - Required
----------------------------------

The name of the CodeRepo this PR belongs to.

``approved`` (boolean) - Optional
---------------------------------

Indicates if every commit associated with this PR has been approved by a reviewer other than the code author.

``validated`` (boolean) - Optional
----------------------------------

Indicates if every commit associated with this PR was submitted by a validated author known to the organization.