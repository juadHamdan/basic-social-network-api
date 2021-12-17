const {create_json_file} = require('./json_file_handling')
const UsersList = require('./users/users_list')
const json_users = 'users.json'

const g_users = [ {id:1, name: 'Root'} ];
create_json_file(g_users, json_users)
users = new UsersList()

module.exports = g_users