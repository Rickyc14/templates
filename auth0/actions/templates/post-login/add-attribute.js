// Add an attribute to the user only for the login transaction. This
// is useful for cases where you want to enrich the user information
// for a specific application.

/**
 * Handler that will be called during the execution of a PostLogin flow.
 *
 * @param {Event} event - Details about the user and the context in which they are logging in.
 * @param {PostLoginAPI} api - Interface whose methods can be used to change the behavior of the login.
 */
exports.onExecutePostLogin = async (event, api) => {
    // ensure the connection secret is valid
    if (!event.secrets.CONNECTION_NAME) {
        return api.access.deny('Invalid configuration');
    }

    // ensure the claim name secret is valid
    if (!event.secrets.CLAIM_NAME) {
        return api.access.deny('Invalid configuration');
    }

    // add an additional claim conditionally
    if (event.connection.name === event.secrets.CONNECTION_NAME) {
        api.idToken.setCustomClaim(event.secrets.CLAIM_NAME, true);
    }
};

/**
 * Handler that will be invoked when this action is resuming after an external redirect. If your
 * onExecutePostLogin function does not perform a redirect, this function can be safely ignored.
 *
 * @param {Event} event - Details about the user and the context in which they are logging in.
 * @param {PostLoginAPI} api - Interface whose methods can be used to change the behavior of the login.
 */
// exports.onContinuePostLogin = async (event, api) => {
// };
