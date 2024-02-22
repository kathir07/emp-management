const mongoose =  require('mongoose')
const { toJSON, paginate }  = require('./plugins')

const userTypeSchema = new mongoose.Schema({
    type: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    status: {
        type: Number,
        default: 1,
    },
}, {timestamps: true})

// add plugin to convert mongoose to json
userTypeSchema.plugin(toJSON)
userTypeSchema.plugin(paginate)

/**
 * Check if t is already taken
 * @param {String} type -  
 * @returns {Promise<Boolean}
 */
userTypeSchema.statics.isTypeTaken = async function (type, excludeUserTypeId) {
    const userType = (excludeUserTypeId) ? await this.findOne({type: type, _id:{$ne: excludeUserTypeId}}) : await this.findOne({type: type});
    return !!userType
}


module.exports = mongoose.model('UserType', userTypeSchema);