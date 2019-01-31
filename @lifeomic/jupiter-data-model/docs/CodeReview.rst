``CodeReview``
==============

A code review (in git, a pull request). A CodeReview is also an official Record.

Includes properties from:

* `RecordEntity <RecordEntity.html>`_
* `Metadata <Metadata.html>`_

title (string) - Required
-------------------------

The title text of the code review / PR.

summary (string) - Optional
---------------------------

The summary text of the code review / PR.

state (string) - Required
-------------------------

The state of the code review / PR.

**Options**

* open
* merged
* declined
* superseded

source (string) - Required
--------------------------

The source branch.

target (string) - Required
--------------------------

The target/destination branch.

repository (string) - Required
------------------------------

The name of the CodeRepo this CodeMerge (PR) belongs to.