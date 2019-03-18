.. This file is generated in jupiter-provision-managed-questions.
   Do not edit by hand as this document will be overwritten when
   jupiter-provision-managed-questions is deployed!

=======================
Application Development
=======================

What are the code repos for a particular application or project?
----------------------------------------------------------------

Returns all code repos connected to a given Application or Project. You will need to edit this Application/Project name to match yours.

**Tags:** ``app``, ``dev``, ``DevOps``

Queries
+++++++

- ``Find CodeRepo that relates to (Application|Project) with name='JupiterOne'``

Were there any Code Repos added in the last 24 hours?
-----------------------------------------------------

Returns all code repos whose first version was created within the last 24 hours.

**Tags:** ``app``, ``dev``, ``DevOps``

Queries
+++++++

- ``Find CodeRepo with _beginOn > date.now-24hr and _version=1``

Who are the most recent contributors to this repo?
--------------------------------------------------

Returns the authors of the last five pull requests to a give code repo. Replace the repo name with the name of the repo you are searching for.

**Tags:** ``app``, ``dev``, ``DevOps``

Queries
+++++++

- ``Find User as u that OPENED PR as PR that HAS CodeRepo with name='repo-name' as repo return u.displayName, u.username, PR.displayName, PR.name, PR._createdOn, repo.name ORDER BY PR._createdOn LIMIT 5``

Which PRs did this developer open in the last 5 days?
-----------------------------------------------------

Returns a list of pull requests opened by the given developer. Replace the full text search string (at the very beginning of query in quotes) with the name or github/gitlab/bitbucket username of the developer.

**Tags:** ``app``, ``dev``, ``DevOps``

Queries
+++++++

- ``'Charlie' that OPENED PR with _createdOn > date.now - 5days as PR return PR.displayName, PR.name``