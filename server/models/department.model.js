const mongoose = require('mongoose')
const { toJSON, paginate } =  require('./plugins')
const Company = require('./company.model')

const departmentSchema = new mongoose.Schema({
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
    },
}, { timestamps: true })

// add plugin that converts mongoose to json
departmentSchema.plugin(toJSON);
departmentSchema.plugin(paginate);

/**
 * Check name already exists
 * @param {String} name
 * @param {ObjectId} companyId
 * @param {ObjectId} excludeDepartmentId
 * @returns {Promise<Boolean>}
 */
departmentSchema.statics.isNameTaken = async function (name, companyId, excludeDepartmentId) {
    const department = (excludeDepartmentId) ? await this.findOne({name: name, company: companyId, _id:{$ne: excludeDepartmentId}}) : await this.findOne({name: name, company: companyId});
    return !!department;
}

module.exports = mongoose.model('Department', departmentSchema)