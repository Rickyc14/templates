// Only allow access from a specific IP address.

/**
 * Handler that will be called during the execution of a Client Credentials exchange.
 *
 * @param {Event} event - Details about client credentials grant request.
 * @param {CredentialsExchangeAPI} api - Interface whose methods can be used to change the behavior of client credentials grant.
 */
exports.onExecuteCredentialsExchange = async (event, api) => {
    // obtain the list of allowed IPs
    const ips = event.secrets.ALLOW_LIST?.split(',');
    if (!ips) {
        return api.access.deny('server_error', 'Invalid configuration');
    }

    // ensure the request IP is from an allowed IP address
    if (!ips.includes(event.request.ip)) {
        return api.access.deny(
            'invalid_request',
            'Access denied for this IP address'
        );
    }
};
