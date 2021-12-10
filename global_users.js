const {create_json_file} = require('./json_file_handling')

const g_users = [ {id:1, name: 'Root'} ];
create_json_file(g_users)

module.exports = g_users