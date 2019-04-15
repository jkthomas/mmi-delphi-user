var bcrypt = require('bcrypt')
const UserQuery = require('../../utilities/resources/query/user-query')
const Encrypt = require('../../utilities/resources/constants/encrypt')
const ConnectionData = require('../../utilities/connection/connection-data')
const Pool = require('pg').Pool
const Connection = new Pool({
    user: ConnectionData.user,
    host: ConnectionData.host,
    database: ConnectionData.database,
    password: ConnectionData.password,
    port: ConnectionData.password
})

function getUsers () {
    return new Promise(function (resolve, reject) {
        Connection.query(UserQuery.SelectAll, (error, result) => {
            if (error) {
                throw error
            }
            resolve(result.rows)
        })
    })
}

const getUserById = (userId) => {
    const id = parseInt(userId)

    return new Promise(function (resolve, reject) {
        Connection.query(UserQuery.SelectOneById, [id], (error, result) => {
            if (error) {
                throw error
            }
            resolve(result.rows)
        })
    })
}

const getUserByUsername = (username) => {
    return new Promise(function (resolve, reject) {
        Connection.query(UserQuery.SelectOneByUsername, [username], (error, result) => {
            if (error) {
                throw error
            }
            resolve(result.rows)
        })
    })
}

const createUser = (request) => {
    const { username, password } = request.body

    return new Promise(function (resolve, reject) {
        bcrypt.hash(password, Encrypt.SaltRounds, function (_err, hash) {
            Connection.query(UserQuery.Insert, [username, hash], (error, result) => {
                if (error) {
                    throw error
                }
                resolve(result)
            })
        })
    })
}

const updateUser = (request) => {
    const id = parseInt(request.params.id)
    const { username, password } = request.body

    return new Promise(function (resolve, reject) {
        Connection.query(UserQuery.Update, [username, password, id], (error, result) => {
            if (error) {
                throw error
            }
            resolve(result)
        })
    })
}

const deleteUserById = (request) => {
    const id = parseInt(request.params.id)

    return new Promise(function (resolve, reject) {
        Connection.query(UserQuery.DeleteById, [id], (error, result) => {
            if (error) {
                throw error
            }
            resolve(result)
        })
    })
}

module.exports = {
    getUsers,
    getUserById,
    getUserByUsername,
    createUser,
    updateUser,
    deleteUserById
}
