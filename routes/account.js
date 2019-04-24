var express = require('express')
var router = express.Router()
const accountController = require('../controllers/account-controller')

/* POST signup. */
router.post('/signup', accountController.createAccount)

/* POST login. */
router.post('/login', accountController.loginAccount)

/* PUT update account password. */
router.put('/update', accountController.updateAccount)

/* DELETE delete account. */
router.delete('/delete', accountController.deleteAccount)

module.exports = router
