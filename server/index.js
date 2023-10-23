const cors = require('cors')
const express = require('express')
const cookieParser = require('cookie-parser')

const user = require('./src/routes/user')
const work = require('./src/routes/work')
const admin = require('./src/routes/admin')
const megdapAdmin = require('./src/routes/megdapAdmin')
const project = require('./src/routes/project')

const isAdmin = require('./src/middleware/isAdmin')
const isMegdapAdmin = require('./src/middleware/isMegdapAdmin')
require('dotenv').config()

const app = express();
const PORT = process.env.PORT || 4000

const whitelist = ['http://localhost:3001', 'http://localhost:3000'];

const corsOptions = {
    origin: '*', // Origin: true for all
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
};

app.use(cors(corsOptions));


app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.use('/api/user',user)
app.use('/api/project',project)
app.use('/api/work',work)
app.use('/api/admin', isAdmin, admin)
app.use('/api/megdapadmin',megdapAdmin)


app.listen(PORT,() =>{
    console.log("Server running on port", PORT)
})
