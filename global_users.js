const {create_json_file} = require('./json_file_handling')
const UsersList = require('./users/users_list')
const json_users = 'users.json'
const fs = require('fs');

const g_users = [ {id:1, name: 'Root'} ];
dict = create_json_file(g_users)
users = new UsersList(dict)

module.exports = g_users