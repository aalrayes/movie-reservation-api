import BaseError from "./baseError.js";

class BadRequestError extends BaseError {
    constructor(errors?: any) {
        super(400, "Validation error", "BadRequest", errors);
    }
}

export default BadRequestError;
