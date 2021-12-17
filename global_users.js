const {create_json_file} = require('./json_file_handling')
const UsersList = require('./users/users_list')
const fs = require('fs');

const json_users = 'users.json'

const g_users = [ {id:1, name: 'Root'} ];
dict = create_json_file(json_users)
const users_list = new UsersList(dict)

module.exports = {g_users, users_list }