const mongoose = require('mongoose')

const clinicSchema = mongoose.Schema({
    clinicName: {
        type: String,

    },
    address:{
        type: String,
    },
    doctorArray:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Doctor'
        }
    ],
})

const Clinic = mongoose.model('Clinic', clinicSchema)
module.exports = Clinic