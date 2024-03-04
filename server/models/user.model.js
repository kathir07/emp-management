const mongoose =  require('mongoose')
const bcrypt = require('bcryptjs');
const {toJSON, paginate} = require('./plugins')
const formatDate = require('../utils/formatDate')

const userSchema = new mongoose.Schema({
    region: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Region',
        required: true,
    },
    user_type: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'UserType',
        required: true,
    },
    first_name: {
        type: String,
        required: true,
        trim: true,
    },
    last_name: {
        type: String,
        required: true,
        trim: true,
    },
    gender: {
        type: String,
        required: true,
        enum: {
            values: ['male', 'female', 'other'],
            message: '{VALUE} is not supported'
          }
    },
    role: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Role',
        required: true,
    },
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 8
    },
    professional_mail: {
        type: String,
        required: true,
        unique: true,
    },
    work_location: {
        type: String
    },
    client: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Client',
    },
    status: {
        type: Number,
        default: 1,
    },
    company: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Company',
        required: true,
    },
    department: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Department',
        required: true,
    },
    leave_policy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'LeavePolicy',
        required: true,
    },
    employee_code: {
        type: String,
        unique: true,
    },
    doj: {
        type: Date,
        required: true,
        set: (value) => formatDate(value) || value
    },
    dob: {
        type: Date,
        set: (value) => formatDate(value) || value
    },
    personal_mail: {
        type: String,
        required: true
    },
    blood_group: {
        type: String,
    },
    father_name: {
        type: String,
        trim: true,
    },
    mother_name: {
        type: String,
        trim: true,
    },
    holiday_policy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'HolidayPolicy',
    },
    official_image: {
        type: String,
    },
    reporting_manager: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    primary_contact_no: {
        type: String,
        required: true,
    },
    secondary_contact_no: {
        type: String,
    },
    permanent_address: {
        type: String,
    },
    current_address: {
        type: String,
    },
    emergency_contact_person: {
        type: String,
    },
    emergency_contact_realtion: {
        type: String,
    },
    emergency_contact_no: {
        type: String,
    },
    uan_no: {
        type: String,
        unique: true,
    },
    pan_no: {
        type: String,
        unique: true,
    },
    pf_acc_no: {
        type: String,
        unique: true,
    },
    aadhar_no: {
        type: String,
        unique: true,
    },
    bank_acc_no: {
        type: String,
        unique: true,
    },
    bank_acc_holder_name: {
        type: String,
    },
    bank_name: {
        type: String,
    },
    ifsc_code: {
        type: String,
    },
    high_school_certificate: {
        type: String,
    },
    high_secondary_certificate: {
        type: String,
    },
    gradutae_certificate: {
        type: String,
    },
    post_graduate_certificate: {
        type: String,
    },
    ref_person_name: {
        type: String,
    },
    ref_person_designation: {
        type: String,
    },
    ref_person_email: {
        type: String,
    },
    ref_person_contact_no: {
        type: String,
    },

}, { timestamps: true});

// add plugin to convert mongoose to json
userSchema.plugin(toJSON)
userSchema.plugin(paginate)

// Hash password before saving
userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) {
      return next();
    }
    try {
      const hash = await bcrypt.hash(this.password, 10);
      this.password = hash;
      
      // Auto-increment employee_code if not provided
      if (!this.employee_code) {
        let latestEmployee = await this.constructor.findOne({}, {}, { sort: { 'employee_code': -1 } });
        let nextEmployeeCode = latestEmployee ? latestEmployee.employee_code + 1 : 60001;
        this.employee_code = nextEmployeeCode;
      }
      
      next();
    } catch (err) {
      return next(err);
    }
  });
  
  

module.exports = new mongoose.model('User', userSchema)
