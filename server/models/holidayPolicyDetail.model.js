const mongoose = require('mongoose')
const {toJSON, paginate} = require('./plugins')
const formatDate = require('../utils/formatDate')

const holidayPolicyDetailSchema = new mongoose.Schema({
    holiday_policy:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "HolidayPolicy",
        required: true,
    },
    name: {
        type: String,
        required: true,
        trim: true,
    },
    holiday_date: {
        type: Date,
        required: true,
        set: (value) => formatDate(value) || value
    },
    is_optional_holiday: {
        type: Number,
        default: 0,
        enum: [0, 1], 
        required: true
    },
    status: {
        type: Number,
        default: 1,
    }
}, { timestamps: true})

// add plugin converts plugin to json
holidayPolicyDetailSchema.plugin(toJSON)
holidayPolicyDetailSchema.plugin(paginate)

/**
 * Check duplicate holiday with same date and holiday policy
 * @param {String} name - holiday name
 * @param {Date} date - holiday date
 * @param {ObjectId} holidayPolicyId
 * @param {ObjectId} excludeHolidayPolicyDetailId
 * @return {Promise<Boolean>}
 */
holidayPolicyDetailSchema.statics.isActiveHolidayExists = async function (name, date, holidayPolicyId, excludeHolidayPolicyDetailId) {
    const holidayPolicyDetail = (excludeHolidayPolicyDetailId) ? await this.findOne({name: name, holiday_date: date, holiday_policy: holidayPolicyId, status: 1,  _id:{$ne:excludeHolidayPolicyDetailId}}) : await this.findOne({name: name, holiday_date: date, holiday_policy: holidayPolicyId, status: 1})

    return !!holidayPolicyDetail;
}

module.exports = new mongoose.model('HolidayPolicyDetail', holidayPolicyDetailSchema)

