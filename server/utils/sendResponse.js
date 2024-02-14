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
    responseSuccess = (responseCode < 300) ? true : false;
    res.status(responseCode).json({success: responseSuccess, data: responseData, message:message});
}

module.exports = sendResponse;
