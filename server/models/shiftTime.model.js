const mongoose =  require('mongoose')
const { Company } =  require('../models')
const {toJSON, paginate} =  require('./plugins')

const shiftTimeSchema = new mongoose.Schema({
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
    start_time: {
        hour: { type: Number, required: true, min: 1, max: 12 },
        minutes: { type: Number, required: true, min: 0, max: 59 },
        ampm: { type: String, enum: ['AM', 'PM'], required: true }
    },
    end_time: {
        hour: { type: Number, required: true, min: 1, max: 12 },
        minutes: { type: Number, required: true, min: 0, max: 59 },
        ampm: { type: String, enum: ['AM', 'PM'], required: true }
    },
    break_time: {
        hour: { type: Number, required: true, min: 0, max: 12 },
        minutes: { type: Number, required: true, min: 0, max: 59 },
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

// add plugin that converts mongoose to JSON
shiftTimeSchema.plugin(toJSON)
shiftTimeSchema.plugin(paginate)

/**
 * Check name if already exists
 * @param {String} name - shift name
 * @param {ObjectId} companyId
 * @param {ObjectId} excludeShiftTimeId
 * @returns {Promise<Boolean>} 
 */
shiftTimeSchema.isNameTaken = async function (name, companyId, excludeShiftTimeId) {
    const result = (excludeShiftTimeId) ? await this.findOne({name: name, company: companyId, _id:{$ne: excludeShiftTimeId}}) : await this.findOne({name: name, company: companyId});
    
    return !!result;
}


module.exports = new mongoose.model('shiftTime', shiftTimeSchema);