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

module.exports = {
    sequelize,
    checkConnetion
}
