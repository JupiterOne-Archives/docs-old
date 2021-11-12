# Integration with JupiterOne

## HackerOne + JupiterOne Integration Benefits

- Visualize HackerOne bounty programs and submitted findings in the JupiterOne
  graph.
- Monitor HackerOne findings within the alerts app.
- Monitor changes to HackerOne bounty programs using JupiterOne alerts.

## How it Works

- JupiterOne periodically fetches HackerOne bounty programs and submitted
  findings to update the graph.
- Write JupiterOne queries to review and monitor updates to the graph.
- Configure alerts to take action when the JupiterOne graph changes.

## Requirements

- JupiterOne requires an API key, API key name, and the name/handle of your
  HackerOne program.
- You must have permission in JupiterOne to install new integrations.

## Support

If you need help with this integration, please contact
[JupiterOne Support](https://support.jupiterone.io).

## Integration Walkthrough

### In HackerOne

HackerOne provides [detailed instructions on creating an API token][1] within
your HackerOne account. When selecting the programs and groups you want to add,
choose Admin.

### In JupiterOne

1. From the configuration **Gear Icon**, select **Integrations**.
2. Scroll to the **HackerOne** integration tile and click it.
3. Click the **Add Configuration** button and configure the following settings:

- Enter the **Account Name** by which you'd like to identify this HackerOne
  account in JupiterOne. Ingested entities will have this value stored in
  `tag.AccountName` when **Tag with Account Name** is checked.
- Enter a **Description** that will further assist your team when identifying
  the integration instance.
- Select a **Polling Interval** that you feel is sufficient for your monitoring
  needs. You may leave this as `DISABLED` and manually execute the integration.
- Enter the **API Key** used to authenticate with HackerOne.
- Enter the **API Key Name** used to authenticate with HackerOne.
- Enter the **Program Handle** or name of your HackerOne program.

4. Click **Create Configuration** once all values are provided.

## How to Uninstall

1. From the configuration **Gear Icon**, select **Integrations**.
2. Scroll to the **HackerOne** integration tile and click it.
3. Identify and click the **integration to delete**.
4. Click the **trash can** icon.
5. Click the **Remove** button to delete the integration.

## Data Model

### Entities

The following entity resources are ingested when the integration runs:

| Example Entity Resource | \_type : \_class of the Entity  |
| ----------------------- | ------------------------------- |
| Program                 | `hackerone_program` : `Service` |
| Finding Report          | `hackerone_report` : `Finding`  |

### Relationships

The following relationships are created/mapped:

| From                | Relationship   | To                 |
| ------------------- | -------------- | ------------------ |
| `hackerone_program` | **IDENTIFIED** | `hackerone_report` |
| `hackerone_report`  | **IS**         | `cve`              |
| `hackerone_report`  | **IS**         | `cwe`              |

[1]: https://docs.hackerone.com/programs/api-tokens.html
