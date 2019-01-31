``Workload``
============

A virtual compute instance, it could be an aws-ec2-instance, a docker-container, an aws-lambda-function, an application-process, or a vmware-instance. The exact workload type is described in the _type property of the Entity.

Includes properties from:

* `Entity <Entity.html>`_
* `Metadata <Metadata.html>`_

image (string) - Optional
-------------------------

The image this workload is derived from, such as an AMI or docker image. At the abstract level, this usually maps to the _id of a Resource.

fqdn (string) - Optional
------------------------

The fully qualified domain name of attached to the instance, if applicable