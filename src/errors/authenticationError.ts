import BaseError from "./baseError.js";

class AuthenticationError extends BaseError {
    constructor(errors?: any) {
        super(401, "Authentication error", "AuthenticationError", errors);
    }
}

export default AuthenticationError;