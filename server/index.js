const cors = require('cors')
const express = require('express')

const userRouter = require('./src/routes/user')
const workRouter = require('./src/routes/work')
const adminRouter = require('./src/routes/admin')
const projectRouter = require('./src/routes/project')
const megdapAdminRouter = require('./src/routes/megdapAdmin')

const isAdmin = require('./src/middleware/isAdmin')
require('dotenv').config()

const app = express();
const PORT = process.env.PORT || 4000

const whitelist = ['http://localhost:3000', 'http://localhost:3001'];

const corsOptions = {
    origin: function (origin, callback) {
        if (whitelist.indexOf(origin) !== -1 || !origin) callback(null, true);
        else callback(new Error('Not allowed by CORS'));
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
};

app.use(cors(corsOptions));

app.use(cors());



app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.use('/api/user',userRouter)
app.use('/api/project',projectRouter)
app.use('/api/work',workRouter)
app.use('/api/admin', isAdmin, adminRouter)
app.use('/api/megdapadmin',megdapAdminRouter)


app.listen(PORT,() =>{
    console.log("Server running on port", PORT)
})
