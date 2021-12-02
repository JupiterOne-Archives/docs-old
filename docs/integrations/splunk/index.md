# Integration with JupiterOne

## Splunk + JupiterOne Integration Benefits

- Import JupiterOne alert data to your Splunk account
- View alerts on a Splunk dashboard
- Link back to alerts in JupiterOne for easy access to additional information

## How it Works

- Splunk periodically imports alert details from JupiterOne
- Write your own Splunk searches to find data about JupiterOne alerts
- View JupiterOne alerts on a dashboard in Splunk with breakdowns by severity, over time, active and dismissed 

## Requirements

- The JupiterOne integration with Splunk requires an JupiterOne API token and your account ID.
- You need permission to create an API token in JupiterOne.
- You need permission to install new Add-ons and Apps in Splunk.
- The JupiterOne Add-on and JupiterOne App need to be installed in your Splunk instance

## Support

If you need help with this integration, please contact
[JupiterOne Support](https://support.jupiterone.io).

## Integration Walkthrough

### In JupiterOne

1. [Generate an API token](https://support.jupiterone.io/hc/en-us/articles/360025847594-Enable-API-Key-Access)
2. Look up your `accountId` by executing this query in your JupiterOne account: `find jupiterone_account`.  The result should have a column labeled `accountId`

### Install Add-on and App in Splunk

1. On the Splunk Home Dashboard, use the Find More Apps link to find and install the JupiterOne Add-on and JupiterOne App

or

1. Download the [Add-on](https://splunkbase.splunk.com/app/6138) or [App](https://splunkbase.splunk.com/app/6139) package from the Splunkbase marketplace
2. In Splunk navigate to **Apps > Manage Apps**
3. In the top right corner select **Install the app from file**
4. Select **Choose File** and select the Add-on or App package you downloaded
5. Select **Upload** and follow the prompts

### Configure the Add-on in Splunk

1. In Splunk, navigate to the **JupiterOne Add-on for Splunk**
2. Click on **Configuration > JupiterOne Account** then click on **Add**
3. Fill in an **account name**, the **JupiterOne Account ID** and the **JupiterOne API key**
4. If needed configure the proxy
5. If desired configure logging
6. Navigate to **JupiterOne Add-on for Splunk > Inputs**
7. Click on **Create New Input**
8. Fill in the details and click the **Add** button

| Field Name | Field Description                  |
| ------------------ | -----------------------------------|
| Name*               | Unique name for the data input     |
| Interval*           | Time interval of input in seconds  |
| Index*              | Index where data will be stored    |
| JupiterOne Account* | Account that was configured in the **Configuration** tab |
| Pull Alert Related Objects | If enabled, pulls data for entities in Alert |
| Start Date | Date in UTC when you want to start collecting data.  Default is 30 days |

`*` denotes required field

### Configure the App in Splunk

Once the Add-on is configured and running, the App will work.  There is no configuration needed.

More details are available on the Splunkbase marketplace for the [Add-on](https://splunkbase.splunk.com/app/6138) and the [App](https://splunkbase.splunk.com/app/6139)