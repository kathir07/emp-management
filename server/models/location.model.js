const mongoose =  require('mongoose')
const { toJSON, paginate } = require('./plugins')

const locationSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true, 
    },
    code: {
        type: String,
        required: true,
        trim: true,
    },
    status: {
        type: Number,
        default: 1,
    },
}, {timestamps: true});

// add plugin that converts mongoose to json
locationSchema.plugin(toJSON);
locationSchema.plugin(paginate)

/**
 * Check if name is taken
 * @param {string} name - That's location name
 * @returns {Promise<boolean>}
 */
locationSchema.statics.isNameTaken = async function (name, excludeLocationId) {
    const location = (excludeLocationId) ? await this.findOne({name, _id: {$ne: excludeLocationId}}) :  await this.findOne({name});
    return !!location;
}



module.exports = mongoose.model('Location', locationSchema)

