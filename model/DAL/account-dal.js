var bcrypt = require('bcrypt')
const UserQuery = require('../../utilities/resources/query/user-query')
const User = require('./user-dal')
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

const signup = (request) => {
    const { username, password } = request.body

    return new Promise(function (resolve, reject) {
        bcrypt.hash(password, Encrypt.SaltRounds, function (_err, hash) {
            Connection.query(UserQuery.Insert, [username, hash], (error, result) => {
                if (error) {
                    if (error.message.includes('duplicate')) {
                        reject(new Error('User with provided username already exists'))
                    } else {
                        reject(new Error(error.message))
                    }
                }
                resolve(result)
            })
        })
    })
}

const login = (request) => {
    const { username, password } = request.body

    return new Promise(function (resolve, reject) {
        User.getUserByUsername(username)
            .then((user) => {
                if (!user[0]) {
                    reject(new Error('Invalid login attempt'))
                }

                bcrypt.compare(password, user[0].password, (_error, result) => {
                    resolve(result)
                })
            })
            .catch((error) => { throw error })
    })
}

const updateUserPassword = (request) => {
    // eslint-disable-next-line camelcase
    const { username, password, new_password } = request.body

    return new Promise(function (resolve, reject) {
        User.getUserByUsername(username)
            .then((user) => {
                if (!user[0]) {
                    reject(new Error('Bad credentials provided'))
                }

                bcrypt.compare(password, user[0].password, (_error, result) => {
                    if (result) {
                        bcrypt.hash(new_password, Encrypt.SaltRounds, function (_err, hashedPassword) {
                            Connection.query(UserQuery.UpdateByUsername, [hashedPassword, username], (error, result) => {
                                if (error) {
                                    reject(new Error(error.message))
                                }
                                resolve(result)
                            })
                        })
                    } else {
                        reject(new Error('Bad credentials provided'))
                    }
                })
            })
            .catch((error) => { throw error })
    })
}

const deleteUserByUsername = (request) => {
    const { username, password } = request.body

    return new Promise(function (resolve, reject) {
        User.getUserByUsername(username)
            .then((user) => {
                if (!user[0]) {
                    reject(new Error('Bad credentials provided'))
                }

                bcrypt.compare(password, user[0].password, (_error, result) => {
                    if (result) {
                        Connection.query(UserQuery.DeleteByUsername, [username], (error, result) => {
                            if (error) {
                                reject(new Error(error.message))
                            }
                            resolve(result)
                        })
                    } else {
                        reject(new Error('Bad credentials provided'))
                    }
                })
            })
            .catch((error) => { throw error })
    })
}

module.exports = {
    signup,
    login,
    deleteUserByUsername,
    updateUserPassword
}
