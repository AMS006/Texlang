const cors = require('cors')
const express = require('express')
const cookieParser = require('cookie-parser')

const user = require('./src/routes/user')
const work = require('./src/routes/work')
const admin = require('./src/routes/admin')
const project = require('./src/routes/project')

const isAdmin = require('./src/middleware/isAdmin')
require('dotenv').config()

const app = express();
const PORT = process.env.PORT || 4000

app.use(cors({
    origin:'http://localhost:3000',
    credentials:true,
    methods:["GET","PUT","PATCH","POST"],
}))

app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.use('/api/user',user)
app.use('/api/project',project)
app.use('/api/work',work)
app.use('/api/admin',isAdmin,admin)


app.listen(PORT,() =>{
    console.log("Server running on port", PORT)
})
