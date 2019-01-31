CodeCommit
==========

A code commit to a repo. The commit id is captured in the _id property of the Entity.

Includes properties from:

* `Entity <Entity.html>`_
* `Metadata <Metadata.html>`_

``branch`` (string) - Required
------------------------------

The branch the code was committed to.

``message`` (string) - Required
-------------------------------

The commit message.

``merge`` (boolean) - Required
------------------------------

Indicates if this commit is a merge, defaults to false.

``versionBump`` (boolean) - Required
------------------------------------

Indicates if this commit is a versionBump, defaults to false.