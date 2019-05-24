var express = require('express')
var router = express.Router()
const account = require('../controllers/account-controller')
var accountController = new account.AccountController()

/* POST signup. */
router.post('/signup', function (req, res) {
    accountController.createAccount(req, res)
})

/* POST login. */
router.post('/login', function (req, res) {
    accountController.loginAccount(req, res)
})

/* PUT update account password. */
router.put('/update', function (req, res) {
    accountController.updateAccount(req, res)
})

/* DELETE delete account. */
router.delete('/delete', function (req, res) {
    accountController.deleteAccount(req, res)
})

module.exports = router
