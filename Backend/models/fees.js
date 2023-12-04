const mongoose = require('mongoose')

const feeSchema = mongoose.Schema({
    doctorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Doctor'
      },
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      },
      feesAmount: {
        type: Number,
        required: true
      },
      isPaid: {
        type: Boolean,
        default: false  
      }
})

const fees = mongoose.model('Fees', feeSchema)
module.exports = fees