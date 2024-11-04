import BaseError from "./baseError.js";

class AuthorizationError extends BaseError {
    constructor(errors?: any) {
        super(403, "Authorization error", "AuthorizationError", errors);
    }
}

export default AuthorizationError;