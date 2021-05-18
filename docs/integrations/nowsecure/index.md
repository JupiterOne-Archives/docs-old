# Integration with JupiterOne

## NowSecure + JupiterOne Integration Benefits

- Visualize NowSecure users, services, applications, and findings
in the JupiterOne graph.
- Map NowSecure users to employees in your JupiterOne account.
- Monitor changes to NowSecure users, services, and applications using
JupiterOne alerts.
- Monitor NowSecure findings within the alerts app.

## How it Works

- JupiterOne periodically fetches users and mobile application security 
testing resources from NowSecure to update the graph.
- Write JupiterOne queries to review and monitor updates to the graph, 
or leverage existing queries.
- Configure alerts to take action when the JupiterOne graph changes, 
or leverage existing alerts.

## Requirements

- JupiterOne requires a NowSecure API Token to interact with the API.
- You must have permission in JupiterOne to install new integrations.

## Support

If you need help with this integration, please contact
[JupiterOne Support](https://support.jupiterone.io).

## Integration Walkthrough

### In NowSecure

The integration connects directly to [NowSecure REST API][1] to obtain 
application scan assets, reports, and findings.

Configure the integration by providing an API Key from your NowSecure account.
JupiterOne by default ingests findings from the past 30 days. The configuration
can be changed to ingest findings from the latest scan reports (this option
requires Enterprise Plan from NowSecure).

### In JupiterOne

1. From the configuration **Gear Icon**, select **Integrations**.
2. Scroll to the **NowSecure** integration tile and click it.
3. Click the **Add Configuration** button and configure the following settings:
- Enter the **Account Name** by which you'd like to identify this NowSecure
   account in JupiterOne. Ingested entities will have this value stored in
   `tag.AccountName` when **Tag with Account Name** is checked.
- Enter a **Description** that will further assist your team when identifying
   the integration instance.
- Select a **Polling Interval** that you feel is sufficient for your monitoring
   needs. You may leave this as `DISABLED` and manually execute the integration.
- Enter the **API Token** with access to your NowSecure account.
4. Click **Create Configuration** once all values are provided.

## How to Uninstall

1. From the configuration **Gear Icon**, select **Integrations**.
2. Scroll to the **NowSecure** integration tile and click it.
3. Identify and click the **integration to delete**.
4. Click the **trash can** icon.
5. Click the **Remove** button to delete the integration.

## Data Model

JupiterOne vulnerability management and scanner integration is built on this
high level data model:

```text
Vendor   - HOSTS    ->       Account
Account  - PROVIDES ->       Service (*)
Service  - SCANS or TESTS -> <Entity> (*)
<Entity> - HAS      ->       Finding
```

> (\*) Examples:
>
> - `Service` (e.g. SAST, DAST, IAST, MAST, PenTest, etc.)
> - `<Entity>` (e.g. Application or Host or Device)

Optionally, the following is added when each scan/assessment/report is also
tracked by the integration:

```text
Service    - PERFORMS   -> Assessment
Assessment - IDENTIFIED -> Finding
```

### Entities

The following entity resources are ingested when the integration runs.

| NowSecure Resources | \_type of the Entity | \_class of the Entity |
| ------------------- | -------------------- | --------------------- |
| Account             | `nowsecure_account`  | `Account`             |
| Service             | `nowsecure_service`  | `Service`             |
| User                | `nowsecure_user`     | `User`                |
| Application         | `mobile_app`         | `Application`         |
| Finding             | `nowsecure_finding`  | `Finding`             |

### Relationships

The following relationships are created:

| From                | Relationship | To                  |
| ------------------- | ------------ | ------------------- |
| `nowsecure_account` | **HAS**      | `nowsecure_user`    |
| `nowsecure_account` | **PROVIDES** | `nowsecure_service` |
| `nowsecure_account` | **HAS**      | `mobile_app`        |
| `nowsecure_service` | **TESTS**    | `mobile_app`        |
| `mobile_app`        | **HAS**      | `nowsecure_finding` |

The following relationships are mapped:

| From     | Relationship | To           |
| -------- | ------------ | ------------ |
| `<ROOT>` | **DEVELOPS** | `mobile_app` |

[1]: https://developer.nowsecure.com/
