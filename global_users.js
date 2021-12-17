const {create_json_file} = require('./json_file_handling')
const UsersList = require('./users/users_list')

const json_users = 'users.json'

dict = create_json_file(json_users)
const users_list = new UsersList(dict)

module.exports = {users_list,json_users }