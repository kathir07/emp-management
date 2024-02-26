const mongoose = require('mongoose')
const Company =  require('./company.model')
const { toJSON, paginate } = require('./plugins')

const leavePolicySchema = new mongoose.Schema({
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

// add plugin that converts mongoose to JSON
leavePolicySchema.plugin(toJSON)
leavePolicySchema.plugin(paginate)

/**
 * Check name if aleady exists
 * @param {String} name
 * @param {ObjectId} excludeLeavePolicyId
 * @returns {Promise<Boolean>} 
 */
leavePolicySchema.statics.isNameTaken = async function (name, companyId, excludeLeavePolicyId) {
    const leavePolicy = (excludeLeavePolicyId) ? await this.findOne({name: name, company: companyId, _id: {$ne: excludeLeavePolicyId}}) : await this.findOne({name: name, company: companyId})

    return !!leavePolicy
}

module.exports = mongoose.model('LeavePolicy', leavePolicySchema);
