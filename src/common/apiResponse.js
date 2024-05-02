const apiResponse = {
    success: 200,
    badRequest: 400,
    unauthorized: 401,
    notFound: 404,
    networkError: 500,
}

function successResponse(message, request) {
    let successObj = {
        message: message,
        status: true,
        data: request,
    }
    return successObj;
}

function validationFailedResponse(error) {
    let validationFailedObj = {
        message: error?.message?.replace(/[^a-zA-Z ]/g, ""),
        status: false,
    }
    return validationFailedObj;
}

module.exports = {
    apiResponse,
    successResponse,
    validationFailedResponse,
}