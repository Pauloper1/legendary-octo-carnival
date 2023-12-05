const express = require('express')
const router = express.Router()
const Doctor = require('../models/doctor');
const doctor = require('../models/doctor');

router.post('/api/register-doctor', async (req, res) => {
    try {
        const {
            firstName,
            lastName,
            Qualification,
            Specialization,
            Clinic_id,
            email,
            phone,
            passwd,
            joined_a_Clinic,
            fees
        } = req.body;

        const newDoctor = new Doctor({
            firstName,
            lastName,
            Qualification,
            Specialization,
            Clinic_id,
            email,
            phone,
            passwd,
            joined_a_Clinic,
            fees
        });

        await newDoctor.save();

        res.status(201).json({ message: 'Doctor registered successfully', doctor: newDoctor });
    } catch (error) {
        console.error(`Error registering doctor: ${error}`);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


router.delete('/api/delete-doctor/:id', async (req, res) => {
    try {
        const doctorId = req.params.id;

        // Check if the doctor exists
        const existingDoctor = await Doctor.findById(doctorId);
        if (!existingDoctor) {
            return res.status(404).json({ error: 'Doctor not found' });
        }

        // Remove the doctor from the database
        await existingDoctor.remove();

        // Respond with a success message or the deleted doctor object
        res.json({ message: 'Doctor deleted successfully', doctor: existingDoctor });
    } catch (error) {
        console.error(`Error deleting doctor: ${error}`);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


router.get('/api/all-doctors', async(req, res)=>{
    try{
        const allDoctor = await Doctor.find()
        .populate('Clinic_id')
        res.json({
            statu: true,
            message:"Doctor Array Found",
            doctor: allDoctor
        })
    }catch(err){
        res.json({
            status:false,
            message:`Can't get doctor array: ${err}`
        })
    }
})


module.exports = router;
