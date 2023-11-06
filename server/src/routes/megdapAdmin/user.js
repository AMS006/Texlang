const express = require('express')

const isMegdapAdmin = require('../../middleware/isMegdapAdmin')
const { loginMegdapAdmin, logoutMegdapAdmin, getMegdapAdminUser, addUser, getCompanyUsers } = require('../../controllers/megdapAdmin/user')

const router = express.Router()

router.get('/logout',isMegdapAdmin, logoutMegdapAdmin)

router.get('/', isMegdapAdmin, getMegdapAdminUser)

router.post('/login', loginMegdapAdmin)

router.post('/add', isMegdapAdmin, addUser);


module.exports = router