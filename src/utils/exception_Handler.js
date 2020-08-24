exports.exceptionHandler = function (err) {
    let status = err.httpStatusCode;
    if (status === 404) {
        return `Unable to connect to target application,  please try after sometime!`
    } else if (status === 400) {
        return `The target system could not understand the request due to invalid syntax. Please connect with Addison support team`
    } else if (status === 401)
}