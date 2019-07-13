# Endpoint agent related FAQs

## Endpoint compliance data isn't appearing as expected. How can I troubleshoot this?

For the Stethoscope-powered compliance data to report successfully:

- Endpoint devices must be running Stethoscope-app.
- Endpoint devices must be running the powerup agent.
- The powerup agent must be sucessfully activated.

Stethoscope-app and the powerup agent are both installed via the same powerup
installation bundle. You should check to see that the Stethoscope giraffe
icon is present in the device's system tray. If it is not, you will need to
launch Stethoscope-app. You can verify that the powerup agent is running as a
system service by checking for its process. On MacOS or Linux, issue a
command like `ps -ef | grep j1-endpoint-agen[t]` to verify that there
is indeed an agent service running.

To verify that the powerup agent is successfully activated, you can perform a
manual scan from within a shell terminal:

`/opt/j1endpointagent/bin/j1-endpoint-agent scan --verbose`

The output of this scan will indicate success if your agent has been
successfully activated and can communicate securely with JupiterOne. If this
is unsuccessful, you should resend an activation email to this device from
the JupiterOne Powerup administration UI for Endpoint Compliance, and perform
the activation step as indicated in the email. If you suspect there may have
been a problem with installation, or if other errors persist, please try
re-downloading and executing the installation script, and performing the
activation step.

Additional diagnostic information may be available in the device's system
log. You can search this for "jupiterone" or "ECA:" to quickly filter the
results.
