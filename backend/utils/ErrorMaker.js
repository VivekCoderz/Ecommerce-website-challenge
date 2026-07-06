class ErrorMaker extends Error{
    constructor(statusCode=500,message){
        super(message);
        this.statusCode = statusCode;
        this.message = message;
        this.success = false
    }
}

module.exports = ErrorMaker