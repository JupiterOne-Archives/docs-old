# How to configure SAML SSO integration with JupiterOne

Single Sign On is supported via a custom authentication client configured within
a JupiterOne account. This feature is available to all enterprise customers upon
request. To request SSO integration to be enabled for your account, please open
a support ticket or contact your technical account manager.

## Supported Features

- **SP-initiated SSO**

  Service Provider Initiated (SP-initiated) SSO means when SAML authentication
  is initiated by the Service Provider (SP). This is triggered when the end user
  tries to access a resource in the Service provider or login directly to the
  Service Provider.

- **JIT (Just In Time) Provisioning**

  Users are created/updated on the fly using the SAML attributes sent as part of
  the SAML response coming from the Identity Provider. The A user is created
  during initial login to the Service Provider and updated during subsequent
  logins. Turning on JIT Provisioning is normally a configuration value in the
  Service Provider.

_IdP-initiated SSO is currently unsupported due to a limitation of Amazon Cognito._

## Configuration Steps

1. Log in to your JupiterOne account -- your user must be a member of the
   *Administrators* group.

1. Go to the **Auth Clients** setup from the configrations menu.

   ![auth-clients-menu](/assets/configure-sso/j1-auth-clients-menu.png)

1. Click on **Add Client**.

   ![add-auth-client](/assets/configure-sso/j1-auth-clients-add.png)

1. In the client configuration screen, copy the following two variables to be
   used in when adding JupiterOne as an application in your SAML IdP account:

   - **Single Sign On URL**
   - **Audience URI (SP Entity ID)**

1. In your IdP Account, add a new SAML Application and name it "JupiterOne".
   
   - Copy/paste the previous two variable values in the SAML settings.
   - Leave the **Default Relay State** blank.
   - Select *EmailAddress* for **Name ID Format**.
   - Select *Email* or *Username* for **Application Username**.
   - See next section for details on **Attribute Mappings**.

1. Complete setup of the SAML application within your IdP account, and copy
   the **Identity Provider Metadata** link.

   In Okta, this link can be found on the **Sign On** tab of the application,
   under **View Setup Instructions**, as shown below:

   ![okta-idp-metadata](/assets/configure-sso/okta-idp-metadata.png)

1. Go back to **JupiterOne Auth Client Settings** screen, paste the above link
   to the **SAML Metadata Document URL** field.

1. Enter a **Client Name**, such as "Okta", and save.

You are all set. Next time you access your JupiterOne account via the vanity URL
(e.g. https://your_company.apps.us.jupiterone.io), you should be redirected to
your SAML IdP for authentication.

## Attribute Mappings

The following attribute mappings are supported:

- `email`: User's email address
- `family_name`: User's last name
- `given_name`: User's first name
- `name`: User's display name
- `group_names`: Dynamically assigns user to specified groups within JupiterOne.
  Use a comma to separate multiple group names (without spaces). Users without
  `group_names` mapping are assigned to the **Users** group within your
  JupiterOne account by default.

Here's an example of attribute mapping configuration in Okta:

![okta-attribute-mappings](/assets/configure-sso/okta-attribute-mappings.png)

We highly recommend adding a custom *group attribute* to the JupiterOne within
your IdP's app profile, This is typically added using the **Profile Editor** for
the app. You can name the attribute something like `jupiterone_groups`.

Below is an example within Okta:

![okta-app-profile-editor](/assets/configure-sso/okta-app-profile-editor.png)

You can then use this custom app attribute to assign group memberships to your
users based on their IdP group assignments. The actual values for the attribute
is typically configured on the group(s) assigned to the app.

Below is an example within Okta:

![okta-app-group-assignment](/assets/configure-sso/okta-app-group-assignment.png)

Note that provisioning users with `group_names` attribute mapping is *OPTIONAL*.
Users without `group_names` mapping are assigned to the **Users** group within
your JupiterOne account by default.

## Removing Users

When you unassign / remove a user from the JupiterOne app within your IdP, the
user will immediately lose access to your JupiterOne account because the
authentication happens with your IdP. However, the user memberships will remain
in the Groups. You can manually remove them from the groups within JupiterOne.

![remove-user](/assets/configure-sso/j1-remove-user.png)

--