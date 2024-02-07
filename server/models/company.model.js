const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const companySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    code: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    status: {
        type: Number,
        default: 1,
    },

}, { timestamps: true });

// add plugin that converts mongoose to json
companySchema.plugin(toJSON);
companySchema.plugin(paginate);

/**
 * Check name if already exists
 * @param {String} name - company name
 * @returns {Promise<Boolean>}
 */
companySchema.statics.isNameTaken = async function(name, excludeCompanyId) {
    const company = (excludeCompanyId) ? await findOne({name: name, _id: {$ne: excludeCompanyId}}) : await findOne({name: name});
    return !!company;
    
}

/**
 * Check code if already exists
 * @param {String} code - company name
 * @returns {Promise<Boolean>}
 */
companySchema.statics.isCodeTaken = async function(code, excludeCompanyId) {
    const company = (excludeCompanyId) ? await findOne({code: code, _id: {$ne: excludeCompanyId}}) : await findOne({code: code});
    return !!company;
    
}

module.exports = mongoose.model('Company', companySchema); 