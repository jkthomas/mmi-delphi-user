var express = require('express')
var router = express.Router()
const accountQueries = require('../model/DAL/account-dal')

/* POST signup. */
router.post('/signup', function (request, response) {
    accountQueries.signup(request)
        .then((user) => response.status(201).send(`User added with ID: ${user.username}`))
        .catch((error) => response.status(400).send({ 'message': error.message }))
})

/* POST login. */
router.post('/login', function (request, response) {
    accountQueries.login(request)
        .then((passwordMatch) => {
            if (passwordMatch) {
                response.status(200).send(`Login completed`)
            } else {
                response.status(400).send(`Bad password`)
            }
        })
        .catch((error) => response.status(400).send({ 'message': error.message }))
})

/* PUT update account password. */
router.put('/update', function (request, response) {
    accountQueries.updateUserPassword(request)
        .then((passwordMatch) => {
            if (passwordMatch) {
                response.status(200).send(`User password changed`)
            } else {
                response.status(400).send(`User password was NOT changed`)
            }
        })
        .catch((error) => response.status(400).send({ 'message': error.message }))
})

/* DELETE delete account. */
router.delete('/delete', function (request, response) {
    accountQueries.deleteUserByUsername(request)
        .then((passwordMatch) => {
            if (passwordMatch) {
                response.status(200).send(`User deleted`)
            } else {
                response.status(400).send(`User was NOT deleted`)
            }
        })
        .catch((error) => response.status(400).send({ 'message': error.message }))
})

module.exports = router
