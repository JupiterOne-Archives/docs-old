# JupiterOne Endpoint Compliance Agent with Stethoscope v4.0.0

The JupiterOne Endpoint Compliance Agent with Stethoscope now supports
Stethoscope v4.0.0!

This version of the tool has improved support for the latest versions of MacOS,
as well as supporting a new policy schema for verifying the installation status
(or absence) of certain applications. See the full CHANGELOG here for changes
since the 3.0.5 release:
<https://github.com/Netflix-Skunkworks/stethoscope-app/blob/master/CHANGELOG.md>

## Endpoint applications policy

By using this version of Stethoscope, you will be able to specify endpoint
policies that enforce the presence or absence of certain applications, or
application versions. For example, using the following policy fragment, you can
check to ensure that a recent version of Carbon Black is installed on MacOS and
Windows devices.

```json
 "applications": [
   {
     "name": "Confer",
     "description": "Confer.app is the Carbon Black agent for mac",
     "assertion": "ALWAYS",
     "version": ">2.0.0",
     "platform": {
       "darwin": ">=10.0.0"
     }
   },
   {
     "name": "cb.exe",
     "description": "cb.exe is the Carbon Black agent for Windows",
     "assertion": "ALWAYS",
     "version": ">2.0.0",
     "platform": {
       "win32": ">=7.0.0"
     }
   }
 ]
```

NOTE: support for `applications` checks like the above is not backwards
compatible with previous versions of Stethoscope. You will want to ensure that
all of your JupiterOne endpoint devices are using v4.0.0 or later before
specifying a policy fragment like the above example in the JupiterOne Endpoint
Power-Up configuration panel.

## Upgrading from a previous version

To check to see how many endpoints currently need upgrading to v4.0.0, you can
use a query like:

```j1ql
Find stethoscope_agent with
  lastReport >= date.now - 7days and stethoscopeVersion != '4.0.0' as agent
return count(agent)
```

When this count is zero, you may safely use the v4.0.0 policy schema. For more
details on this schema, see the [Stethoscope Policies Documentation][1].
To upgrade from a previous version of Stethoscope to v4.0.0, send an endpoint
activation email from the [JupiterOne Endpoint Power-Up configuration panel][2]
to all affected users, and have them reinstall and activate from the details
provided in that email. You can get a copy/paste-able list of affected user
emails with a query like:

```j1ql
Find stethoscope_agent with
  lastReport >= date.now - 7days and stethoscopeVersion != '4.0.0' as agent
return agent.email
```

[1]: https://github.com/Netflix-Skunkworks/stethoscope-app/blob/master/docs/POLICIES.md
[2]: https://apps.us.jupiterone.io/powerups/endpoint-agent
