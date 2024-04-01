// Only allow access from a specific IP address.

/**
 * Handler that will be called during the execution of a PreUserRegistration flow.
 *
 * @param {Event} event - Details about the context and user that is attempting to register.
 * @param {PreUserRegistrationAPI} api - Interface whose methods can be used to change the behavior of the signup.
 */
exports.onExecutePreUserRegistration = async (event, api) => {
    // obtain the list of allowed IPs
    const ips = event.secrets.ALLOW_LIST?.split(',');
    if (!ips) {
        // special note for this flow: userMessage (the second parameter) is displayed to the user.
        return api.access.deny('IP not allowed', 'Invalid configuration');
    }

    // ensure the request IP is from an allowed IP address
    if (!ips.includes(event.request.ip)) {
        // special note for this flow: userMessage (the second parameter) is displayed to the user.
        return api.access.deny(
            'IP not allowed',
            'Access denied for this IP address'
        );
    }
};
