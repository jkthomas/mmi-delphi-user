const Sequelize = require('sequelize')
const Connection = require('../../../utilities/connection/sequelize-connection')
const Encrypt = require('../../../utilities/resources/constants/encrypt')
const bcrypt = require('bcrypt')

const Account = Connection.sequelize.define('account', {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: true,
        primaryKey: true,
        autoIncrement: true
    },
    username: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    },
    createdAt: {
        type: Sequelize.DATE
    },
    updatedAt: {
        type: Sequelize.DATE
    }
}, {
    // options
})

class AccountDAL {
    constructor () {
        this.synchronizeAccounts()
    }

    async synchronizeAccounts () {
        await Account.sync({ force: true })
    }

    async createAccount (request) {
        return new Promise(function (resolve, reject) {
            const { username, password } = request.body
            if (username === undefined || username === null) {
                reject(new Error('Username was not specified'))
            }
            if (password === undefined || password === null) {
                reject(new Error('Password was not specified'))
            }

            bcrypt.hash(password, Encrypt.SaltRounds, function (_err, hashedPassword) {
                Account.create({
                    username: username,
                    password: hashedPassword
                }).then(account => {
                    resolve(account)
                }).catch((error) => {
                    reject(error)
                })
            })
        })
    }

    loginAccount (request) {
        return new Promise(function (resolve, reject) {
            const { username, password } = request.body
            if (username === undefined || username === null) {
                reject(new Error('Username was not specified'))
            }
            if (password === undefined || password === null) {
                reject(new Error('Password was not specified'))
            }

            Account.findAll({
                where: {
                    username: username
                }
            }).then((account) => {
                if (!account[0]) {
                    reject(new Error('Bad credentials provided'))
                }
                bcrypt.compare(password, account[0].password, (_error, result) => {
                    resolve(result)
                })
            }).catch((error) => {
                reject(error)
            })
        })
    }

    /* eslint-disable camelcase */
    updateAccount (request) {
        return new Promise(function (resolve, reject) {
            const { username, password, new_password } = request.body
            if (username === undefined || username === null) {
                reject(new Error('Username was not specified'))
            }
            if (password === undefined || password === null) {
                reject(new Error('Password was not specified'))
            }
            if (new_password === undefined || new_password === null) {
                reject(new Error('New password was not specified'))
            }

            Account.findAll({
                where: {
                    username: username
                }
            }).then((account) => {
                if (!account[0]) {
                    reject(new Error('Bad credentials provided'))
                }
                bcrypt.compare(password, account[0].password, (_error, result) => {
                    if (result) {
                        bcrypt.hash(new_password, Encrypt.SaltRounds, function (_err, hashedPassword) {
                            Account.update({ password: hashedPassword },
                                {
                                    where: {
                                        username: username
                                    }
                                }).then(resolve(result))
                                .catch((error) => { reject(error) })
                        })
                    } else {
                        reject(new Error('Bad credentials provided'))
                    }
                })
            }).catch((error) => { reject(error) })
        })
    }
    /* eslint-enable camelcase */

    deleteAccount (request) {
        return new Promise(function (resolve, reject) {
            const { username, password } = request.body
            if (username === undefined || username === null) {
                reject(new Error('Username was not specified'))
            }
            if (password === undefined || password === null) {
                reject(new Error('Password was not specified'))
            }

            Account.findAll({
                where: {
                    username: username
                }
            }).then((account) => {
                if (!account[0]) {
                    reject(new Error('Bad credentials provided'))
                }
                bcrypt.compare(password, account[0].password, (_error, result) => {
                    if (result) {
                        Account.destroy({
                            where: {
                                username: username
                            }
                        }).then(resolve(result))
                            .catch((error) => { reject(error) })
                    } else {
                        reject(new Error('Bad credentials provided'))
                    }
                })
            }).catch((error) => {
                reject(error)
            })
        })
    }
}

module.exports = {
    AccountDAL
}
