const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const User = mongoose.model('User')
const OTP = mongoose.model('OTP')
const mailer = require('../controllers/mailer')
const otpGen = require('../controllers/otpGen')
const Slot = mongoose.model('Slot')
router.post('/api/register', async(req, res)=>{
    const user = req.body;
    console.log(user)
    
    try {

        //Check if user already exists
        const userExists = await User.findOne({ email: user.email });
      
        if (userExists) {
            return res.status(409).json({ message: "User already exists" });
        }

        //If new user, then save the user.
        const newUser = await User.create(user);

        console.log('New User:', newUser);
        res.status(201).json({
            message: 'User created successfully',
            user: newUser
        });

        //generate random 4 digit number 
        //save the random number in the otpModel
        randOTP = otpGen(newUser)

        //send the number to register email id
        mailer(randOTP, newUser.email)


    } catch (err) {
        console.error('Error while creating user:', err);
        res.status(500).json({
          message: 'Error while creating user',
          error: err
        });
      }
      
})

router.post('/api/verify', async(req, res)=>{
    const {userId, userOtp} = req.body
    console.log(userId, userOtp)
    try{
        const otp = await OTP.findOne({userId: userId})
        console.log(otp)
        if(!otp){
            return res.status(500).json({
                "message": `OTP has expired`
            })
        }
        if(otp.otp != userOtp){
            return res.status(500).json({
                "message": `OTP does not match`
            })
        }
        const findUser = await User.findByIdAndUpdate(
            userId,
            {isVerified: true}
            )
        res.status(200).json({
            "message": "User is verified"
        })

        await OTP.findByIdAndDelete(otp._id)

    }catch(err){
        res.status(500).json({
            "message":`Error occurred while verifying OTP: ${err}`
        })
    }

})

router.post('/api/login', async (req, res) => {
    const { email, passwd } = req.body;
  
    try {

      if(email == '' || passwd == ''){
        return res.json({
            status: false,
            message: `Empty values are not allowed`
        })
      }  

      const user = await User.findOne({ email });
        
      if (!user) {
        return res.json({
          status: false,
          message: 'User not found',
        });
      }
  
      if (!user.isVerified) {
        return res.json({
          status: false,
          message: 'User not verified',
        });
      }
  
    
      if (user.passwd != passwd) {
        return res.json({
          status: false,
          message: 'Incorrect password',
        });
      }
  
      res.json({
        status: true,
        message: 'User login successful',
        user,
      });
    } catch (err) {
      res.status(500).json({
        status: false,
        message: `Error occurred while logging in: ${err.message}`,
      });
    }
  })


router.post('/api/delete-user/:id',async(req, res)=>{
    const userId = req.params.id
    try{
        await User.findByIdAndDelete(userId)
        res.status(200).json({
            "message":"User deleted successfully"
        })
    }catch (err){
        res.status(500).json({
            "message":`Error while deleting user: ${err}`
        })

    }
})




router.delete('/api/delete-all-users', async (req, res) => {
    try {
        await User.deleteMany(); 
        res.status(200).json({
            "message": "All users deleted successfully"
        });
    } catch (err) {
        res.status(500).json({
            "message": `Error while deleting all users: ${err}`
        });
    }
});


router.get('/api/all-users', async (req, res) => {
    try {
        const allUsers = await User.find(); 
        res.status(200).json(allUsers);
    } catch (err) {
        res.status(500).json({
            "message": `Error while fetching all users: ${err}`
        });
    }
});

router.get('/api/user-slots', async(req, res)=>{

    try{
        const userId = req.body.userId
        //Recent date to be on top
        const allUserSlots = await Slot.find({ userId: userId }).sort({ DateTime: -1 });
        res.json({
            status: true,
            message:`Slots fetched`,
            slots: allUserSlots
        })
    }catch(err){
        res.json({
            status: false,
            message:"Error while fetching all slots"
        })
    }

})

module.exports = router