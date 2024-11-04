import BaseError from "./baseError.js";

class ConflictError extends BaseError {
    constructor(errors?: any) {
        super(409, "Conflict error", "ConflictError", errors);
    }
}

export default ConflictError;