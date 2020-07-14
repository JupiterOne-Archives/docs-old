# CloudTrail Event Streaming with the AWS Integration

The AWS integration can continuously update the graph using CloudTrail events
streamed over EventBridge. This feature is currently in beta and only supports a
subset of CloudTrail events.

To enable this feature, first contact the JupiterOne development team either via
the community Slack or by creating a support ticket. Provide the AWS account ID
of the account from which you'd like to stream events to JupiterOne and the
region of the CloudTrail that will be producing the events. The JupiterOne
development team will add your AWS account to the list of those permitted to
send events to the AWS integration's event bus.

Once the JupiterOne development team has confirmed with you that your account
has been added to the list of permitted accounts, create a rule on your AWS
account's default event bus that targets the AWS integration's event bus. If
you're unsure of how to do this, you can follow the instructions in [the AWS
integration's CloudFormation project on
GitHub](https://github.com/JupiterOne/jupiterone-aws-cloudformation#jupiterone-aws-cloudformation).

If you set up your event rule to send events to JupiterOne using the
CloudFormation provided by JupiterOne, it will be configured to only send events
that the AWS integration can actually interpret. This is achieved by listing the
supported CloudTrail events' names in the event rule's `EventPattern`. Any
events sent to JupiterOne will be charged to the sending account (yours) so if
you don't care about a subset of events that JupiterOne supports, you should
consider removing them from your rule's event pattern. On the other hand, when
JupiterOne adds support for more events, you will need to add those events'
names to your rule's event pattern.

See the article ["Sending and Receiving Events Between AWS Accounts"][1] in the
AWS EventBridge documentation for more details.

## Supported Services

- S3

The full list of supported API calls can be found in the [AWS integration's
CloudFormation project on
GitHub][2].

[1]: https://docs.aws.amazon.com/eventbridge/latest/userguide/eventbridge-cross-account-event-delivery.html
[2]: https://github.com/JupiterOne/jupiterone-aws-cloudformation#supported-events
