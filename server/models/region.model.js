const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const regionSchema = new mongoose.Schema({
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
    currency: {
        type: String,
        required: true,
        trim: true,
    },
    timezone: {
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
regionSchema.plugin(toJSON);
regionSchema.plugin(paginate);

/**
 * Check if name is already taken
 * @param {String} name - The Region Name
 * @returns {Promise<boolean>}
 */
regionSchema.statics.isNameTaken = async function (name, excludeRegionId) {
    const region = (excludeRegionId) ? await this.findOne({name, _id: {$ne: excludeRegionId}}) : await this.findOne({name});
    return !!region;
}

/** 
 * Check if code is already taken
 * @param {String} code - The Region Code
 * @returns {Promise<Boolean>}
 */
regionSchema.statics.isCodeTaken = async function(code, excludeRegionId) {
    const region = (excludeRegionId) ? await this.findOne({code, _id: {$ne: excludeRegionId}}) : await this.findOne({code});
    return !!region;
}

module.exports = mongoose.model('Region', regionSchema);
