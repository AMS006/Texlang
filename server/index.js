const express = require('express')
const cors = require('cors')
const user = require('./src/routes/user')
const project = require('./src/routes/project')
require('dotenv').config()

const app = express();
const PORT = process.env.PORT || 4000

app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin:'http://localhost:3000',
    credentials:true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"]
}))

app.use('/user',user)
app.use('/project',project)

app.listen(PORT,() =>{
    console.log("Server running on port", PORT)
})
