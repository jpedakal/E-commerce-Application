exports.exceptionHandler = function (err) {
    let status = err.httpStatusCode;
    if (status === 404) {
        return `Unable to connect to target application,  please try after sometime!`
    } else if (status === 400) {
        return `The target system could not understand the request due to invalid syntax. Please connect with Addison support team`
    } else if (status === 401) {
        return `Authorization error on target system; missing valid credentials! Please connect with Addison support team`
    } else if (status === 403) {
        return `The access to the requested resource on target system is forbidden! Please connect with Addison support team`
    } else if (status === 413) {
        return `The request entity is larger than limits defined by target system! Please connect with Addison support team`
    } else if (status === 414) {
        return `The URI requested by the client is longer than the target system is willing to interpret! Please connect with Addison support team`
    } else if (status === 500) {
        return `The target system encountered an unexpected condition that prevented it from fulfilling the request! Please connect with Addison support team`
    } else if (status === 503) {
        return `The target system is currently unable to handle the request due to a temporary overloading or maintenance! Please try after some time.`
    } else if (status === 504) {
        return `A timely response was not received from target system. Please connect with Addison support team`
    } else {
        return boom.serverUnavailable('Unable to connect to target system, please try after sometime.');
    }
}