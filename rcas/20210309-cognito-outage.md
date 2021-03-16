# Prod Cognito Outage

## Date

2021-03-09

## Timeline

4:58 PM EST - JupiterOne notices an issue with logging into the JupiterOne web app

5:00 PM EST - A customer reports authentication issues and their automation
failing (API access)

5:02 PM EST - JupiterOne identifies additional authentication issues related to login and API access

5:08 PM EST - JupiterOne confirms the issue and notifies customers via the community `#status`
channel.

5:11 PM EST - AWS posts a message in the Personal Health Dashboard of JupiterOne's production AWS account.
The message indicates that Cognito error rates were increasing in the `us-east-2` region, 
which is where JupiterOne's production environment is located.

5:17 PM EST - JupiterOne confirms the authentication issues are directly related to the AWS cognito error

5:20 PM EST - JupiterOne makes an additional update in the community Slack `#status`
channel that Cognito is in a degraded state and that the team is trying to
identify workarounds.

5:46 PM EST - JupiterOne continues to monitor the sutiation and notices that logins are working again

5:54 PM PST - AWS posts an update identifying the root cause and notifies us that the bad change
has been rolled back. JupiterOne works on confirming the update from AWS. 

> We can confirm increased Cognito User Pool API errors in the US-EAST-2 Region.
> We have confirmed the root cause to be a subsystem deployment which we are now
> in the process of rolling back. We are observing steady signs of recovery as
> the rollback has progressed.

6:00 PM EST - JupiterOne confirms the fix is in place and posts an update to the community `#status`
channel that the issue was resolved.

## Summary

The AWS Cognito Service had a brief outage and caused authentication failures
to the JupiterOne app and APIs. The outage lasted
approximately one hour. Calls to Cognito for authenticating or fetching a token
if already authenticated consistently failed until AWS rolled back the change.

## Customer impact

Between 5:00 PM EST and 5:45 PM EST, customers were not able to log into the J1
app. Customers also reported issues with being unable to use API keys to access
the J1 app as well.

## Causes

AWS rolled out a change that caused Cognito to start timing out with 504 errors.

Customers that have custom automation that interacts with the J1 APIs had some
of their requests fail because the API gateway authorizer makes requests to
fetch Cognito's well known JSON Web Key Sets (JWKS) via the
`/.well-known/jwks.json` route. This route is used to fetch public keys that are
used to verify that the API key, which is encoded as a JSON Web Token (JWT), was
signed by either `account-service` or Cognito.

During the outage a J1 developer noted that they were able to still access J1 APIs via the CLI
tool. The reason why this occurred was because the lambda authorizer caches the
public keys associated with the issuer. The developer that used the CLI tool
must have exercised a warmed lambda instance that had the values
cached. It is also possible that API Gateway had decided to accept the request
and avoid invoking the authorizer due to it's built in authorization caching.
However, the latter is a less likely scenario considering the default TTL is 5
minutes and the developer that noted that successful usage of the CLI had posted
the message at 5:17 EST, almost 20 minutes into the outage.

The underlying root cause for the authentication issues was the AWS Cognito outage.
JupiterOne could not provide a workaround within the timespan of this outage,
but JupiterOne has active plans to avoid Cognito JKWS calls for API usage
in the future.

## Resolution

## Lessons Learned

-   What went well?

    -   AWS acknowledged the issue fairly quickly and got Cognito back into a
        working state within an hour.
    -   Our internal monitor identified the issue proactively at 4:59 PM EST, almost the
        the same time JupiterOne employees and customers noticed the issue.

-   What went badly?

    -   No significant action could be taken by JupiterOne to reduce time to recovery.
    -   Customers were actively trying to use the product while the outage
        occurred.
    -   Customers reported their automations broken because they were unable
        to access J1 APIs via API keys.

*   Where did we get lucky?

    -   AWS acted quickly and the outage did not last too long.

## Next steps

-   Identify if the Cognito SLAs were broken

-   Move away from the legacy API keys associated with individual users and adopt the newer tokens
    issued by JupiterOne's `token-service`. This flow avoids the additional calls to Cognito JKWS.
    This would allow API keys to continue to function even while Cognito authentication is down.
