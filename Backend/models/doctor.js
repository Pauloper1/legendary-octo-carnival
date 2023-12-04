const mongoose = require('mongoose')

const doctorSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    Qualification: {
        type: String,
        required: true
    },
    Specialization: {
        type: String,
        required: true
    },
    Clinic_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Clinic'
    },
    emal: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    passwd: {
        type: String,
        required: true
    },
    joined_a_Clinic: {
        type: Boolean,
        default: false
    },
    feesId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Fees'
    }
})

const doctor = mongoose.model('Doctor', doctorSchema)
module.exports = doctor