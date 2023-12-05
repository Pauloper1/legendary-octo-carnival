const mongoose = require('mongoose')


const slotSchema = mongoose.Schema({
    FeesId: {
        type: mongoose.Types.ObjectId,
        ref: 'Fees'
    },
    doctorId:{
        type: mongoose.Types.ObjectId,
        ref: 'Doctor'
    },
    userId: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    },
    dateTime:{
        type: Date,
    },
})

const Slot = mongoose.model('Slot',slotSchema)
module.exports = Slot