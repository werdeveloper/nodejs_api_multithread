exports.getErrorResponse = (error, req, res, next) =>{
    error.statusCode = error.statusCode || 500;
    error.message = error.message || "Internal Server Error";
        console.log('\x1b[31m',`{${error.statusCode} Error - ${error.message}}`)
        return res.status(error.statusCode).json({ status:error.statusCode, msg: error.message, error: true });
}

exports.invalidPathHandler = (req, res, next) => {
    // console.log(req.path)
    console.log('\x1b[31m',"{404 Error - We can't seem to find the page you're looking for.}")
    return res.status(404).json({ status:404, msg: "We can't seem to find the page you're looking for.", error: true });
}

// Not use yet
exports.errorLogger = (err, req, res, next) => {
    console.error('\x1b[31m', err) // adding some color to our logs
    next(err) // calling next middleware
  }