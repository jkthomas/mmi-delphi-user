const Sequelize = require('sequelize')
const Connection = require('../../../utilities/connection/seqconn')
const Encrypt = require('../../utilities/resources/constants/encrypt')
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

function createAccount (request) {
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
            }).catch(function (error) {
                reject(error)
            })
        })
    })
}

module.exports = {
    Account,
    createAccount
}
