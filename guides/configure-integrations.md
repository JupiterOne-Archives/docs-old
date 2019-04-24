# Configure Managed Integrations

You will need to have data in the JupiterOne platform to take advantage of its
capabilities. The more data, the more powerful these capabilities become.

There are over a dozen managed integrations available out-of-the-box for turnkey
configuration. More are added regularly.

Each integration may have a slightly different mechanism for authentication and
configuration, as required by the provider. For example, the AWS integration
uses an IAM Role and Assume Role Trust policies for access. Other integrations
may use an API key/token, OAuth, or Basic Auth.

This recording below shows an example of how to configure an AWS integration.

![configure-aws-integration](../assets/integrations-aws.gif)

For details on other integrations, please see their corresponding documentation
page under the **Managed Integrations** section.

## Other Data

Additionally, you can upload data outside of these managed integrations using
the JupiterOne [API Client or CLI][1]. This allows you to centrally track,
monitor and visualize any of your data such as on-premise systems and security /
compliance artifacts.

[1]: ./j1-client-and-cli