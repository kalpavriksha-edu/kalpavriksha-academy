const errorConstant = {
    ERR_INVALID_INPUT: {
        code: 'ERR_INVALID_INPUT',
        message: 'Resources Not Found',
    },
    ERR_URL: {
        code: 'ERR_URL',
        message: 'URL NOT FOUND',
    },
    ERR_DATABASE: {
        code: 'ERR_DATABASE',
        message: 'Unable to connect to the database',
    },
    ERR_DATABASE_SYNC: {
        code: 'ERR_DATABASE_SYNC',
        message: 'Error synchronizing database'
    },
    INT_SERVER_ERR: {
        code: 'INT_SERVER_ERR',
        message: 'Internal Server Error',
    }
};

module.exports =  errorConstant;
