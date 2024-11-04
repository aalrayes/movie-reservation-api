import BaseError from "./baseError.js";

class InternalServerError extends BaseError {
    constructor(errors?: any) {
        super(500, "Internal server error", "InternalServerError", errors);
    }
}

export default InternalServerError;