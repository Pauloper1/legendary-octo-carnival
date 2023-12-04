const mongoose = require('mongoose')

const otpSchema = mongoose.Schema({
    userId: {
        type: String,
    },
    otp: {
        type: String, 
    },
    createdAt: {
        type: Date
    },
    expiresAt: {
        type: Date
    }
})

otpSchema.index({'expiresAt': 1}, {expireAfterSeconds: 3600})
const OTP = mongoose.model('OTP', otpSchema)
module.exports = OTP