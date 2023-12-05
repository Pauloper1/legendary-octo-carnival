const express = require('express')
const dotenv = require('dotenv')
const cors = require('cors')
const connectToDb = require('./config/db')
dotenv.config()
const bodyParser = require('body-parser')


connectToDb()
const app = express()

app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// --- Models
require('./models/clinic')
require('./models/fees')
require('./models/slots')
require('./models/user')
require('./models/userVerification')
// ---

// --- Routes
app.use(require("./routes/user"));
app.use(require('./routes/clinic'))
app.use(require('./routes/doctor'))
app.use(require('./routes/slot'))
// ---

const PORT = process.env.PORT || 7000
app.listen(PORT,()=>{
    console.log(`listening at port ${PORT}`)
})