const mongooose = require('mongoose')

const userSchema = mongooose.Schema({
    firstName:{
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true,
    },
    email: {
        type: String, 
        required: true,
    },
    passwd:{
        type: String,
        required: true,
    },
    slotArray:[{
        type: mongooose.Types.ObjectId,
        ref: 'Slot'
    }],
    isVerified:{
        type: Boolean,
        default: false
    }
})

const user = mongooose.model('User', userSchema)
module.exports = user