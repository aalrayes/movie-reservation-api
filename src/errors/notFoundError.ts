import BaseError from "./baseError.js";

class NotFoundError extends BaseError {
    constructor(errors?: any) {
        super(404, "Resource not found", "NotFoundError", errors);
    }
}

export default NotFoundError;