class BaseError extends Error {
    constructor(
      public status: number,
      public message: string,
        public type: string,
        public errors?: any
    ) {
        super(message);
        this.name = this.constructor.name;
        Error.captureStackTrace(this, this.constructor);
    }
}

export default BaseError;
