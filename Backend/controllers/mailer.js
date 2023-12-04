const nodemailer = require('nodemailer')

let transporter = nodemailer.createTransport({
    host: "smtp-mail.outlook.com",
    auth:{
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASS
    },

})

transporter.verify((error, success)=>{
    if(error){
        console.log(`${error}`.red.bold)
    } else{
        console.log("Mailer is working".green.bold)
    }
})

const mailer = async(otp, email)=>{
    try{
        const mailOptions = {
            from: process.env.EMAIL,
            to: email,
            subject: 'Your OTP',
            html: `Your OPT is ${otp}`
        }
        await transporter.sendMail(mailOptions)
        console.log("Email sent".green)
    } catch(err){
        // console.log(`Error while sending email: ${err}`.red.bold)
        throw new Error(`Error while sending email: ${err}`.red.bold)
    }

}

module.exports = mailer