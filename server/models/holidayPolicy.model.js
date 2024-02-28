const mongoose = require('mongoose')
const { toJSON, paginate} = require('./plugins')

const holidayPolicySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    company: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Company',
        required: true,
    },
    status: {
        type: Number,
        default: 1,
    }
}, { timestamps: true})

// add plugins to convert mongoose to document
holidayPolicySchema.plugin(toJSON)
holidayPolicySchema.plugin(paginate)

/**
 * Check name if aleady exists
 * @param {String} name
 * @param {ObjectId} excludeHolidayPolicyId
 * @returns {Promise<Boolean>} 
 */
holidayPolicySchema.statics.isNameTaken = async function (name, companyId, excludeHolidayPolicyId) {
    const holidayPolicy = (excludeHolidayPolicyId) ? await this.findOne({name: name, company: companyId, _id: {$ne: excludeHolidayPolicyId}}) : await this.findOne({name: name, company: companyId})

    return !!holidayPolicy
}


module.exports = new mongoose.model('HolidayPolicy', holidayPolicySchema)