class ErrorHandler extends Error {
    constructor(statusCode, message){
        super();
        this.statusCode = statusCode;
        this.message = message;
    }
}

const handleError = (err, res) => {
    const { statusCode = 500, message } = err;
    res.status(statusCode).json({
        status: false,
        message,
        data: {},
    });
};
  
module.exports = {
    ErrorHandler,
    handleError,
};
  