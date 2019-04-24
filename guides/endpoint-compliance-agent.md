# JupiterOne Endpoint Compliance Agent "Power Up"

JupiterOne is not an endpoint security solution. Rather, it is a graph platform
designed for security operations and compliance. So, why are we even talking
about an endpoint agent?

The JupiterOne team's internal security operations is a highly distributed and
self-managed. We needed a lightweight approach to ensure that users have
correctly configured their own endpoint devices (i.e. laptops) and prompt them
to remediate if a non-compliant configuration is detected.

Read [this blog][1] for more on our journey in solving endpoint compliance in a
cloud-first landscape.

We are offering this endpoint agent as a "Power Up" to all JupiterOne customers.

## The Agent

The endpoint agent has two components:

1. **Stethoscope-app** - an open-source solution by Netflix. This is a community
   project and it is _not officially supported_ by the JupiterOne team. See the
   [Github project][2] for more details.

1. **J1 integration agent** - a native agent binary to connect Stethoscope-app
   with JupiterOne as the management backend for policy and configuration status
   reporting.

## Installation

Installing and activating the JupiterOne endpoint compliance agent follows a
self-service approach.

1. A JupiterOne administrator needs to send an activation email to users:

   - From the JupiterOne web UI, go to **Settings** (the gear icon near the top
     right), and then **Power Ups** for the Settings menu.

   - Select **JupiterOne Endpoint Compliance Agent** from the Power Ups menu.

   - Select one of three options to **Send Activations** to:

     - All users
     - User devices without Endpoint Agent
     - Specify emails individually

     Note the first two options requires you to have an identity provider (IdP)
     integration configured in JupiterOne so that the platform knows about the
     users of your organization. Example IdP integrations include Okta, OneLogin,
     Google G Suite, JumpCloud.

1. Users should then follow the simple instructions in the activation email to
   download, install and activate the endpoint agent.

## Advanced Use Cases

For organizations using an automated package deployment tool such as SaltStack or
Jamf, we are often asked if the JupiterOne power up agent can be included in the
auto-rollout from the deployment tool. This is technically doable (see below for
more details below), but not officially supported at the moment.

Technically the Stethoscope agent installation and JupiterOne integration
process has three moving parts:

1. [Stethoscope-app][2]: You would likely need to build this yourself from the
   code in this repo. It supports an optional “publish”/distribution URL for
   distributing updates. The Stethoscope-app build that we ship with our installer
   is configured to pull updates from our S3 bucket location. Since you intend to
   roll-out updates via your deployment tool, you would likely not use this mech-
   anism. Once built without a publishing configuration, and installed at a certain
   version of Stethoscope, that version would remain until you replace it.

1. Our native agent binary for JupiterOne integration: This is bundled into the
   installer (`.pkg` for macOS, `.msi` for Windows, or a `.sh` script for Linux),
   which can be downloaded from the download link within an JupiterOne endpoint
   activation email (see above). We could provide this to you for distribution
   with your own Stethoscope builds, or you could run the packaged installer and
   pull the binary agent from that. It is a data-driven GraphQL client that
   doesn’t change often.

1. A one-time activation step that is performed using the agent binary in a CLI
   mode. This is automatically done via the installer wizard, but can certainly
   be done in the deployment using a command of the form:

   ```bash
   # macOS example:
   j1-endpoint-agent-darwin activate --email <your.email> --account <your J1 account name> --code <one-time-use activation code>
   ```

   Ordinarily, these account codes are generated at email-send time, using the
   send email feature of the administrative Endpoint Compliance Power Up UI.
   Contact JupiterOne Support to pre-generate a CSV of activation codes for a
   list of your email addresses. This activation step registers each particular
   endpoint device with JupiterOne, sending along the device-specific UUID along
   with the activation information provided at the command line, and generates
   an API token used to retrieve the Stethoscope policy and upload scan results
   to J1.

[1]: https://jupiterone.com/blog/solving-for-endpoint-compliance-in-a-cloud-first-landscape/
[2]: https://github.com/Netflix-Skunkworks/stethoscope-app/
