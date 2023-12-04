const mongoose = require('mongoose')
const OTP = mongoose.model('OTP')
const mailer = require('./mailer')

const otpGen = async(newUser)=>{
    try{
        const randOTP = Math.floor(Math.random()*1000 + 1000)
        //save the random number in the otpModel
        await OTP.create({
            userId: newUser._id,
            otp: randOTP,
            expiresAt: Date.now()
        })
        return randOTP
    } catch (err) {
        console.log(`Error while saving OTP: ${err}`.red.bold)
    }

}
module.exports = otpGen