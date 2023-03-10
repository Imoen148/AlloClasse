const AppError = require("../utils/appError");

const handleCastErrorDb = err => {
    const message = `Invalid ${err.path} : ${err.value}`;
    return new AppError(message,400);

}

const handleDuplicateFieldsDb = err => {
    // const value = err.errmsg.match(/([""'])(\\?.)*?\1/)[0];
    // console.log(err.keyValue);
    const value = JSON.stringify(err.keyValue).replace(/\"/g, ' ');
    const message = `Duplicate field value: ${value}. Please use another value!`
    return new AppError(message,400);
}

const handleValidationErrorDb = err => {
    const errors = Object.values(err.errors).map(el => el.message)
    const message = `Invalid input data. ${errors.join('. ')}`;
    return new AppError(message,400);
}


// ES6 allow to simply put a one line code after the arrow and return automatically this line of code
// no need bracket
const handleJWTError = () => 
    new AppError('Invalid Token, Please log in again', 401)

const handleJWTExpiredError = () => 
    new AppError('Your token has expired! Please log in again', 401)


const sendErrorDev = (err, res) => {
    res.status(err.statusCode).json({
        status: err.status,
        message: err.message,
        error : err,
        stack: err.stack
    });
}

const sendErrorProd = (err, res) => {
    if(err.isOperational){
        res.status(err.statusCode).json({
            status: err.status,
            message: err.message,
        });
    } else {
        console.error('ERROR!!!!!!', err)
        res.status(500).json({
            status: 'error',
            message: 'Something went very wrong!'
        })
    }
}

module.exports = (err, req, res, next) => {
    // console.log(err.stack);
    
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';

    if (process.env.NODE_ENV === 'development'){
        sendErrorDev(err, res);
    } else if (process.env.NODE_ENV === 'production'){
        let error = Object.assign(err); 
        if(error.name === 'CastError') error = handleCastErrorDb(error);
        if (error.code === 11000) error = handleDuplicateFieldsDb(error);
        if (error.name === 'ValidationError') error = handleValidationErrorDb(error);
        if (error.name === 'JsonWebTokenError') error = handleJWTError();
        if (error.name === 'TokenExpiredError') error = handleJWTExpiredError();
        
        
        sendErrorProd(error, res);
    }
}