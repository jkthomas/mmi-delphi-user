const Sequelize = require('sequelize')
const Connection = require('./connection-data')

const sequelize = new Sequelize(
    Connection.database,
    Connection.user,
    Connection.password,
    {
        host: Connection.host,
        dialect: Connection.databaseDialect
    })

// For connection testing
function checkConnetion () {
    sequelize
        .authenticate()
        .then(() => {
            console.log('Connection has been established successfully.')
        })
        .catch(err => {
            console.error('Unable to connect to the database:', err)
        })
}

function syncUser () {
    User.sync({ force: true }).then(() => {
        // Now the `users` table in the database corresponds to the model definition
        return User.create({
            firstName: 'John',
            lastName: 'Hancock'
        })
    })
}

// TODO: Delete after full Sequelize implementation
const User = sequelize.define('testuser', {
    // attributes
    firstName: {
        type: Sequelize.STRING,
        allowNull: false
    },
    lastName: {
        type: Sequelize.STRING
        // allowNull defaults to true
    }
}, {
    // options
})

module.exports = {
    sequelize,
    checkConnetion,
    syncUser
}
