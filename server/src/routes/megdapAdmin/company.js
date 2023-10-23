const { addNewCompany, getAllCompany, getCompanyUsers } = require('../../controllers/megdapAdmin/company');
const isMegdapAdmin = require('../../middleware/isMegdapAdmin');

const router = require('express').Router();


router.post('/add', addNewCompany);

router.get('/all', getAllCompany)

router.get('/users/:companyId', getCompanyUsers)

module.exports = router