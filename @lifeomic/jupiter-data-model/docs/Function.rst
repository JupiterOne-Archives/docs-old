``Function``
============

A virtual application function. For example, an aws_lambda_function, azure_function, or google_cloud_function

Includes properties from:

* `Entity <Entity.html>`_
* `Metadata <Metadata.html>`_

image (string) - Optional
-------------------------

The image of this function, typically refers to a zip package.

version (string) - Optional
---------------------------

The version of this function.

runtime (string) - Optional
---------------------------

The runtime of this function. For example: 'nodejs6.10', 'nodejs8.10', or 'python2.7'.

memorySize (string) - Optional
------------------------------

The allocated memory of this function to execute.

codeSize (string) - Optional
----------------------------

The size of code of this function.

codeHash (string) - Optional
----------------------------

The hash of code of this function.

trigger (string) - Optional
---------------------------

What triggers this function to execute.

handler (string) - Optional
---------------------------

The handler of this function