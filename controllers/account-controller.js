const accountQueries = require('../model/DAL/account-dal')
// TODO: Change stored procedures to Sequelize mapping
// const seqConn = require('../utilities/connection/seqconn')

const createAccount = (request, response) => {
    accountQueries.createAccount(request)
        .then((user) => response.status(201).send({ 'message': `User added with ID: ${user.username}` }))
        .catch((error) => response.status(400).send({ 'message': error.message }))
}

const loginAccount = (request, response) => {
    accountQueries.loginAccount(request)
        .then((passwordMatch) => {
            if (passwordMatch) {
                response.status(200).send({ 'message': 'Login completed' })
            } else {
                response.status(400).send({ 'message': 'Bad password' })
            }
        })
        .catch((error) => response.status(400).send({ 'message': error.message }))
}

const updateAccount = (request, response) => {
    accountQueries.updateAccount(request)
        .then((passwordMatch) => {
            if (passwordMatch) {
                response.status(200).send({ 'message': 'User password changed' })
            } else {
                response.status(400).send({ 'message': 'User password was NOT changed' })
            }
        })
        .catch((error) => response.status(400).send({ 'message': error.message }))
}

const deleteAccount = (request, response) => {
    accountQueries.deleteAccount(request)
        .then((passwordMatch) => {
            if (passwordMatch) {
                response.status(200).send({ 'message': 'User deleted' })
            } else {
                response.status(400).send({ 'message': 'User was NOT deleted' })
            }
        })
        .catch((error) => response.status(400).send({ 'message': error.message }))
}

module.exports = {
    createAccount,
    loginAccount,
    updateAccount,
    deleteAccount
}
