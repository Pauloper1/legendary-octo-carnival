const mongoose = require('mongoose')

const feeSchema = mongoose.Schema({
  
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