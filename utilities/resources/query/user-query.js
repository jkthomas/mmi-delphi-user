const UserQuery = {
    SelectAll: 'SELECT * FROM users ORDER BY id ASC',
    SelectOneById: 'SELECT * FROM users WHERE id = $1',
    SelectOneByUsername: 'SELECT * FROM users WHERE username = $1',
    Insert: 'INSERT INTO users (username, password) VALUES ($1, $2)',
    Update: 'UPDATE users SET username = $1, password = $2 WHERE id = $3',
    UpdateByUsername: 'UPDATE users SET password = $1 WHERE username = $2',
    DeleteById: 'DELETE FROM users WHERE id = $1',
    DeleteByUsername: 'DELETE FROM users WHERE username = $1'
}

module.exports = UserQuery
