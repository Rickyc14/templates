// Confirm the user email is verified before allowing the password reset to complete.

/**
 * Handler that will be called during the execution of a Password Reset / Post Challenge Flow.
 *
 * @param {Event} event - Details about the post challenge request.
 * @param {PasswordResetPostChallengeAPI} api - Interface whose methods can be used to change the behavior of the post challenge flow.
 */
exports.onExecutePostChallenge = async (event, api) => {
    if (!event.user.email_verified) {
        api.access.deny(
            'Please verify your email before changing your password.'
        );
    }
};

/**
 * Handler that will be invoked when this action is resuming after an external redirect. If your
 * onExecutePostChallenge function does not perform a redirect, this function can be safely ignored.
 *
 * @param {Event} event - Details about the user and the context in which they are logging in.
 * @param {PasswordResetPostChallengeAPI} api - Interface whose methods can be used to change the behavior of the post challenge flow.
 */
// exports.onContinuePostChallenge = async (event, api) => {
// };
