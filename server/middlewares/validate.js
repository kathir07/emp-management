const Joi = require('joi')
const httpStatus =  require('../helpers/httpStatus')
const pick = require('../utils/pick')
const sendResponse = require('../utils/sendResponse');

const validate = (schema) => (req, res, next) => {
    const validSchema = pick(schema, ['body', 'params', 'query']);
    const object = pick(req, Object.keys(validSchema))
    const { value, error } = Joi.compile(validSchema)
        .prefs({ errors: { label: 'key' }, abortEarly: false }).validate(object)

    if(error) {
        const errorMessage = error.details.map((details) => details.message).join(', ');
        return sendResponse(res, httpStatus.BAD_REQUEST, '', errorMessage);
    }

    Object.assign(req, value);
    return next();
}

module.exports = validate