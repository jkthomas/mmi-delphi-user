const accountDAL = require('../model/DAL/sequelize/account-dal')

class AccountController {
    constructor () {
        this.accounts = new accountDAL.AccountDAL()
    }
    createAccount (request, response) {
        this.accounts.createAccount(request)
            .then((user) => response.status(201).send({ 'message': `User added with ID: ${user.username}` }))
            .catch((error) => response.status(400).send({ 'message': error.message }))
    }

    loginAccount (request, response) {
        this.accounts.loginAccount(request)
            .then((passwordMatch) => {
                if (passwordMatch) {
                    response.status(200).send({ 'message': 'Login completed' })
                } else {
                    response.status(400).send({ 'message': 'Bad password' })
                }
            })
            .catch((error) => response.status(400).send({ 'message': error.message }))
    }

    updateAccount (request, response) {
        this.accounts.updateAccount(request)
            .then((passwordMatch) => {
                if (passwordMatch) {
                    response.status(200).send({ 'message': 'User password changed' })
                } else {
                    response.status(400).send({ 'message': 'User password was NOT changed' })
                }
            })
            .catch((error) => response.status(400).send({ 'message': error.message }))
    }

    deleteAccount (request, response) {
        this.accounts.deleteAccount(request)
            .then((passwordMatch) => {
                if (passwordMatch) {
                    response.status(200).send({ 'message': 'User deleted' })
                } else {
                    response.status(400).send({ 'message': 'User was NOT deleted' })
                }
            })
            .catch((error) => response.status(400).send({ 'message': error.message }))
    }
}

module.exports = {
    AccountController
}
