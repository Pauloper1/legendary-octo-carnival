const mongoose = require('mongoose')
const express = require('express')
const router = express.Router()
const Slot = mongoose.model('Slot')
const Fees = mongoose.model('Fees')
const Doctor = mongoose.model('Doctor')

router.post('/api/create-slot', async (req, res) => {
    try {
        const { userId, doctorId, date, time } = req.body
        const doctor = await doctor.findById(doctorId)
        const newFees = await Fees.create({
            feesAmount: doctor.fees,
        })

        const slot = await Slot.create({
            userId: userId,
            doctorId: doctorId,
            date: date,
            time: time,
            feesId: newFees._id
        })

    } catch (err) {

    }
})


//Route to get all registered appointments
router.get('/api/doctor-slot/:doctorId', async (req, res) => {
    try {
        const allDoctor = await Doctor.find()
            .populate('clinicId')
    } catch (err) {
        res.json({
            status: false,
            message: `Can't get doctor array: ${err}`
        })
    }
})

router.post('/api/confirm-slot', async (req, res) => {
    try {
        console.log("Slot confirmation")
        const { feesAmount, doctorId, userId, dateTime } = req.body
        console.log(feesAmount, doctorId, userId, dateTime)
        const newDate = new Date(dateTime)

        //Check if the user has a slot already on this date
        const existingSlot = await Slot.findOne({
            userId,
            dateTime: {
                $gte: new Date(newDate.getFullYear(), newDate.getMonth(), newDate.getDate()),
                $lt: new Date(newDate.getFullYear(), newDate.getMonth(), newDate.getDate() + 1),
            },
        });

        if (existingSlot) {
            return res.json({
                status: false,
                message: `User already has a slot on this date.`,
            });
        }

        const newFees = await Fees.create({ feesAmount })
        console.log(newFees)
        // console.log(newSlot)
        await Slot.create({
            doctorId,
            userId,
            dateTime: newDate,
            FeesId: newFees._id
        })
        res.json({
            status: true,
            message: `Slot created successfully`
        })
    } catch (err) {
        res.json({
            status: false,
            message: `Error creating slot: ${err}`
        })
    }
})

router.delete('/api/delete-all-slots', async (req, res) => {
    try {
        await Slot.deleteMany()
        res.json({
            status: true,
            message: `Deleted all Slots`
        })
    } catch (err) {
        res.json({
            status: false,
            message: `Error while deleting all slots`
        })
    }
})

router.post('/api/doctor-slots', async (req, res) => {
    try {
        const { doctorId, dateTime } = req.body
        const newDate = new Date(dateTime)
        const allDoctorSlots = await Slot.find(
            {
                doctorId: doctorId,
                dateTime: {
                    $gte: new Date(newDate.getFullYear(), newDate.getMonth(), newDate.getDate()),
                    $lt: new Date(newDate.getFullYear(), newDate.getMonth(), newDate.getDate() + 1),
                }
            })
        res.json({
            status: true,
            message:`All doctor slots on that date fetched`,
            slots: allDoctorSlots
        })
    } catch (err) {

    }
})
module.exports = router