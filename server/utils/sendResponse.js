const httpStatus = require('http-status')

/**
 * Send API response
 * @param {Response} res
 * @param {number} responseCode
 * @param {Object} responseData
 * @param {String} message
 * @returns {Object}
 */

const sendResponse = (res, responseCode, responseData, message = '') => {
    responseCode = (responseCode) ? responseCode : 200;

    switch (httpStatus[`${responseCode}_CLASS`]) {
        case httpStatus.classes.CLIENT_ERROR:
            responseSuccess = false
        break;
        case httpStatus.classes.SERVER_ERROR:
            responseSuccess = false
        break;
        default:
            responseSuccess = true
        break;
    }

    res.status(responseCode).json({success: responseSuccess, data: responseData, message:message});
}

module.exports = sendResponse;
