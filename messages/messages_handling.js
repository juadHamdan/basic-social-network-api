const StatusCodes = require('http-status-codes').StatusCodes;
const g_users = require('../global_users')
const {update_json_file} = require('../json_file_handling')
const Message = require('./message')
const {get_user_idx, get_user} = require('../users/users_handling')

function list_messages(req, res) //view user's messages
{
    const id = parseInt(req.params.id);
}

function message_user(req, res) //send a message to a users 
{
    const id = parseInt(req.params.id);
    const message = req.body.message;
}

function message_all_users(req, res) //send a message to all users 
{
    const message = req.body.message;
}

function send_message(req, res) //send a message from a user to a user
{
    const sender_id = parseInt(req.params.sender_id);
    const receiver_id = parseInt(req.params.receiver_id);
}

module.exports = {message_user, message_all_users, send_message}