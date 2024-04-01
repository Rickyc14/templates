# Auth0 Actions


- **[Understand How Auth0 Actions Work](https://auth0.com/docs/customize/actions/actions-overview)**
- **[Write Your First Action](https://auth0.com/docs/customize/actions/write-your-first-action)**
- **[Explore Flows and Triggers](https://auth0.com/docs/customize/actions/flows-and-triggers)**
- [Event Object](https://auth0.com/docs/customize/actions/flows-and-triggers/post-user-registration-flow/event-object)
- Marketplace Integration (actions):
  - [Country-based Access control](https://manage.auth0.com/dashboard/us/dev-uygh2yta4kl2j8ll/actions/library/actions/packaged/country-based-access)
  - [Require Email Verification](https://manage.auth0.com/dashboard/us/dev-uygh2yta4kl2j8ll/actions/library/actions/packaged/auth-0-require-email-verification)


> Actions are secure, tenant-specific, versioned functions written in Node.js that execute
> at certain points within the Auth0 platform. Actions are used to customize and extend
> Auth0's capabilities with custom logic.

> The processes that can be extended in this way are called flows. Each flow is made up
> of one or more triggers and represents the logical pipeline through which information
> moves during a single point in the Auth0 journey. Multiple Actions can be added to a
> trigger, with each Action executing in the order in which it was placed. Some triggers
> are executed synchronously, blocking the flow in which they are involved, and some are
> executed asynchronously, as indicated in the table below.

> Actions are a cornerstone to our overall extensibility product at Auth0. With Actions,
> you can add essential custom logic to your login and identity flows specific to your
> needs. Actions also allow you to connect external integrations that enhance your overall
> extensibility experience. For example, you can add an Action to your login flow to
> verify credentials such as a License or Passport using a Marketplace Partner who
> specializes in identity proofing.

<br>

#### Action basics

- Use the minimum number of HTTP requests possible and set a reasonable timeout (less than 10 seconds) to avoid accumulated requests during login.
- Use application metadata to filter for specific applications to determine if an Action should be run.
- Ensure that Actions, which provide verification or trigger MFA, cannot be bypassed unintentionally or maliciously.
- Actions should never intentionally throw an error; if processes stop because of an error or condition, use the appropriate api method like api.access.deny().
- Use event.request.hostname for the domain used in Authentication API calls; this could be the default Auth0 tenant domain or a custom domain.

<br>

#### Security basics

- Do not transmit unencrypted personally-identifiable information (PII) in plain sight, like in URLs or error messages.
- Always use HTTPS URLs for redirects and API calls.
- AllowList IP addresses when possible.
- Watch for incoming data that can be tampered with (URL parameters, user agent, and so on).

<br>

#### User data

- Check if an email is verified with event.user.email_verified if it is being used in a sensitive or high-security context.
- Different Connections provide different user profile data; the only guaranteed user profile field is the user_id.

<br>

#### Actions Limitations

- Each Action should not exceed 100 kB. The larger the size, the more latency is introduced, which may have an impact on the performance of your system. This size limit limit does not include any npm modules that may be referenced as part of any require statements.
- Each execution of a flow must complete in 20 seconds or less or the processing will end in an error. Limiting HTTP requests is the best way to keep within this time limit. 
- Each execution of a flow must complete in 20 seconds or less or the processing will end in an error. Limiting long-running processes, like outbound HTTP requests without a timeout, is necessary to keep within this time limit. An Action that redirects users to an external page has a separate timeout before the redirect and after.
- Calls made to the Auth0 Management API and User Metadata updates are rate limited.
- See [limitations](https://auth0.com/docs/customize/actions/limitations) for more information.


<br>

#### Trigger Example (post-user-registration)

```javascript
// Store the Auth0 user id in a remote system.

const axios = require("axios");

/**
 * @param {Event} event - Details about registration event.
 */
exports.onExecutePostUserRegistration = async (event) => {
  await axios.post("https://my-api.exampleco.com/users", { params: { email: event.user.email }});
};
```

<br>

#### Trigger Example (pre-user-registration)

```javascript
// Deny registration by location.

/**
 * @param {Event} event - Details about registration event.
 * @param {PreUserRegistrationAPI} api
 */
exports.onExecutePreUserRegistration = async (event, api) => {
  if (event.request.geoip.continentCode === "NA") {

    // localize the error message 
    const LOCALIZED_MESSAGES = {
      en: 'You are not allowed to register.',
      es: 'No tienes permitido registrarte.'
    };

    const userMessage = LOCALIZED_MESSAGES[event.request.language] || LOCALIZED_MESSAGES['en'];
    api.access.deny('no_signups_from_north_america', userMessage);
  }
};
```

<br>

#### Trigger Example (post-login)

```javascript
// Access control.

/**
 * @param {Event} event - Details about the user and the context in which they are logging in.
 * @param {PostLoginAPI} api - Interface whose methods can be used to change the behavior of the login.
 */
exports.onExecutePostLogin = async (event, api) => {
  if (event.user.email && event.user.email.endsWith("@example.com") && event.client.name === "My SPA") {
    api.access.deny(`Access to ${event.client.name} is not allowed.`);
  }
};
```
