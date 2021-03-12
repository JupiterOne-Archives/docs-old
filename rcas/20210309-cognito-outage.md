# Prod Cognito Outage

## Date

2021-03-09

## Timeline

4:58 PM EST - An issue with logging in is noticed by JupiterOne Sales

5:00 PM EST - A customer reports authentication issues and their automation
failing

5:02 PM EST - Issue with logging in and automation failure reported by
JupiterOne Support

5:08 PM EST - A developer notifies customers via the community `#status`
channel.

5:11 PM EST - AWS posts a message in our Personal Health Dashboard that Cognito
error rates were increasing in the `us-east-2` region.

5:17 PM EST - A developer notes that they were able to access J1 APIs via the J1
CLI tool.

5:20 PM EST - Another developer posts an update in the community Slack `#status`
channel that Cognito is in a degraded state and that the team is trying to
identify workarounds.

5:46 PM EST - A JupiterOne employee notes that they are able to get back into
the app.

5:54 PM PST - AWS posts an update identifying the root cause and notifies us
that the bad change has been rolled back.

> We can confirm increased Cognito User Pool API errors in the US-EAST-2 Region.
> We have confirmed the root cause to be a subsystem deployment which we are now
> in the process of rolling back. We are observing steady signs of recovery as
> the rollback has progressed.

6:00 PM EST - A JupiterOne employee posts an update to the community `#status`
channel that the issue was resolved.

## Summary

The AWS Cognito Service broke and made it so that users could no longer
authenticate and access the JupiterOne app and APIs. The outage lasted
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

A J1 developer noted that they were able to still access J1 APIs via the CLI
tool. The reason why this occurred was because the lambda authorizer caches the
public keys associated with the issuer. The developer that used the CLI tool
must have gotten lucky and hit a warmed lambda instance that had the values
cached. It is also possible that API Gateway had decided to accept the request
and avoid invoking the authorizer due to it's built in authorization caching.
However, the latter is a less likely scenario considering the default TTL is 5
minutes and the developer that noted that successful usage of the CLI had posted
the message at 5:17 EST, almost 20 minutes into the outage.

It's difficult to present concrete evidence to pinpoint the exact issue since
logging in via the authorizer is not perfect and the lambda timeout is set to 2
seconds. Since calls to Cognito were resulting in 504 errors, it's very possible
that authorizer started to time out in situations where the JWKS needed to be
fetched, meaning error logging would also not take place.

## Resolution

## Lessons Learned

-   What went well?

    -   AWS acknowledged the issue fairly quickly and got Cognito back into a
        working state within an hour.
    -   The monitor started erroring and alerting around 4:59 PM EST, almost the
        the same time J1 employees noticed the issue.

-   What went badly?

    -   There was not much that could have been done to rectify the issue.
    -   Customers were actively trying to use the product while the outage
        occurred.
    -   Customers reported that their automation broken because they were unable
        to access J1 APIs via API keys.

*   Where did we get lucky?

    -   AWS acted quickly and the outage did not last too long.

## Next steps

-   Identify if the Cognito SLAs were broken

-   Move away from the legacy API keys and adopt the newer tokens
    issued by `token-service`. This flow avoids the additional calls to Cognito.

