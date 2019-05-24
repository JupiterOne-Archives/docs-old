Person
======

An entity that represents an actual person, such as an employee of an organization.

Includes properties from:

* `Entity <Entity.html>`_
* `Metadata <Metadata.html>`_

``firstName`` (string) - Required
---------------------------------

The person's official first name in the system (such as HR database)

``lastName`` (string) - Required
--------------------------------

The person's official last name in the system (such as HR database)

``middleName`` (string) - Optional
----------------------------------

The person's official middle name in the system (such as HR database)

``email`` (array of string) - Required
--------------------------------------

The email addresses of the person; the first one in the array is the primary email.

``title`` (string) - Optional
-----------------------------

The person's role or title within an organization

``phone`` (array of string) - Optional
--------------------------------------

The person's phone numbers; the first one in the array is the primary contact number.

``address`` (string) - Optional
-------------------------------

The person's physical contact address

``employeeId`` (string) - Optional
----------------------------------

The person's employee ID/number within an organization

``employeeType`` (string) - Optional
------------------------------------

The type of employment

**Options**

* employee
* contractor
* intern
* vendor
* advisor
* other

``userIds`` (array of string) - Optional
----------------------------------------

One or more user Ids associated with this person

``manager`` (string) - Optional
-------------------------------

Name of the person's manager

``managerId`` (string) - Optional
---------------------------------

Employee ID of the person's manager

``managerEmail`` (string) - Optional
------------------------------------

Email of the person's manager

Format: email