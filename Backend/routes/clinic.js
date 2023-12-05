const express = require('express');
const router = express.Router();
const Clinic = require('../models/clinic')

router.post('/api/create-clinic', async (req, res) => {
    try {
        // Assuming the request body contains the necessary data for clinic creation
        const { clinicName, address } = req.body;

        // Create a new clinic instance
        const newClinic = new Clinic({
            clinicName,
            address,
        });

        await newClinic.save();
        res.json({ 
            status: true,
            message: 'Clinic created successfully', 
            clinic: newClinic 
        });
    } catch (error) {
        console.error(`Error creating clinic: ${error}`);
        res.json({ 
            status: false,
            message: "Couldn't create clinic",
            error: err
        });
    }
});

module.exports = router;
