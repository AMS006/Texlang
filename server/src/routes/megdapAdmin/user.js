const express = require('express')
const { loginMegdapAdmin, logoutMegdapAdmin, getMegdapAdminUser, addUser, getCompanyUsers } = require('../../controllers/megdapAdmin/user')
const isMegdapAdmin = require('../../middleware/isMegdapAdmin')

const router = express.Router()

router.post('/login', loginMegdapAdmin)

router.get('/logout',isMegdapAdmin, logoutMegdapAdmin)

router.get('/', isMegdapAdmin, getMegdapAdminUser)

router.post('/add', isMegdapAdmin, addUser);



module.exports = router