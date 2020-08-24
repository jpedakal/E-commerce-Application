exports.exceptionHandler = function (err) {
    let status = err.httpStatusCode;
    if (status === 404) {
        return `Unable to connect to target application,  please try after sometime!`
    } else if (status === 400) {
        return `The target system could not understand the request due to invalid syntax. Please connect with Addison support team`
    } else if (status === 401){
        return `Authorization error on target system; missing valid credentials! Please connect with Addison support team`
    } else if(status===403){
        return `The access to the requested resource on target system is forbidden! Please connect with Addison support team`
    } else if(status===413){
        return `The access to the requested resource on target system is forbidden! Please connect with Addison support team`
    }else if(status===414){
        return `The access to the requested resource on target system is forbidden! Please connect with Addison support team`
    }else if(status===500){
        return `The access to the requested resource on target system is forbidden! Please connect with Addison support team`
    }else if(status===503){
        return `The access to the requested resource on target system is forbidden! Please connect with Addison support team`
    }else if(status===504){
        return `The access to the requested resource on target system is forbidden! Please connect with Addison support team`
    }
}