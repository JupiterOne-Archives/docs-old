``Project``
===========

A software development project. Can be used for other generic projects as well but the defined properties are geared towards software development projects.

Includes properties from:

* `Entity <Entity.html>`_
* `Metadata <Metadata.html>`_

key (string) - Optional
-----------------------

A defined project key. It is ideal for a code project to have a consistent key that matches that of issue tracking project. For example, the key for a Bitbucket project should match the key of its corresponding Jira project.

productionURL (string) - Optional
---------------------------------

The Production URL

Format: uri

stagingURL (string) - Optional
------------------------------

The Non-Production / Staging URL

Format: uri

devURL (string) - Optional
--------------------------

The Development URL

Format: uri

testURL (string) - Optional
---------------------------

The Test URL

Format: uri

alternateURLs (array of string) - Optional
------------------------------------------

The additional URLs related to this application.