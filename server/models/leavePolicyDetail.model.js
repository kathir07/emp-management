const mongoose = require('mongoose')
const { toJSON, paginate } = require('./plugins')
const formatDate = require('../utils/formatDate')

const leavePolicyDetailSchema = new mongoose.Schema({
    leave_policy:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "LeavePolicy",
        required: true,
    },
    start_date: {
        type: Date,
        required: true,
        set: (value) => formatDate(value) || value
    },
    end_date: {
        type: Date,
        required: true,
        set: (value) => formatDate(value) || value
    },
    total_earned_leave: {
        type: Number,
        required: true,
        default: 0
    },
    total_sick_leave: {
        type: Number,
        required: true,
        default: 0
    },
    total_optional_holiday: {
        type: Number,
        required: true,
        default: 0
    },
    max_cont_leave_count: {
        type: Number,
        required: true,
        default: 0
    },
    status: {
        type: Number,
        required: true,
        default: 1
    }
}, { timestamps: true})

// add plugin that converts mongoose to document
leavePolicyDetailSchema.plugin(toJSON)
leavePolicyDetailSchema.plugin(paginate)

/**
 * check active leave policy detail 
 * @param {ObjectId} leavePolicyId
 * @param {ObjectId} excludeLeavePolicyDetailId
 * @returns {Promise<Boolean>}
 */
leavePolicyDetailSchema.statics.isActiveLeaveDetailExists = async function(leavePolicyId, excludeLeavePolicyDetailId) {
    const activeLeavePolicyDetail = (excludeLeavePolicyDetailId) ? await this.findOne({leave_policy: leavePolicyId, status: 1, _id:{$ne: excludeLeavePolicyDetailId}}) : await this.findOne({leave_policy: leavePolicyId, status: 1})

    return !!activeLeavePolicyDetail;
}


module.exports = new mongoose.model('LeavePolicyDetail', leavePolicyDetailSchema)