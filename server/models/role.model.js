const mongoose = require('mongoose')
const { toJSON, paginate } = require('./plugins')

const roleSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    description: {
        type: String,
    },
    status: {
        type: Number,
        default: 1,
    },
})

// add plugins that converts mongoose to json
roleSchema.plugin(toJSON)
roleSchema.plugin(paginate)

/**
 * Check if role name already exists
 * @param {String} name - role name
 * @param {ObjectId} excludeRegionId
 * @return {Promise<Boolean>}
 */
roleSchema.statics.isNameTaken = async function(name, excludeRoleId) {
    const result = (excludeRoleId) ? await this.findOne({name: name, _id:{$ne: excludeRoleId}}) : await this.findOne({name: name})
    return !!result
}

module.exports = new mongoose.model('Role', roleSchema)
