const errorConstant = {
    ERR_INVALID_INPUT: {
        message: "Resources Not Found",
    },
    ERR_URL: {
        message: "Url Not Found",
    },
    ERR_DATABASE: {
        message: "Unable to connect to the database"
    },
    ERR_DATABASE_SYNC: {
        message: "Error synchronizing database"
    },
    INT_SERVER_ERR: {
        message: "Internal Server Error"
    },
    ERR_LOGIN:{
        message:"Error during login",
    },
    INVALID_INPUT: {
        message: "Invalid input",
    },
    USER_ALREADY_EXISTS: {
        message: "This user is already in use",
    },
    EMAIL_VERIFICATION_ERROR: {
        message: "Error during email verification",
    },
    INVALID_CREDENTIALS: {
        message: "Email or Password is incorrect!",
    },
    INTERNAL_SERVER_ERROR: {
        message: "An internal server error occurred",
    },
    RESOURCE_NOT_FOUND: {
        message: "Resource not found",
    }
};

export default errorConstant;
