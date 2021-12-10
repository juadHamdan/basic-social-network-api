const StatusCodes = require('http-status-codes').StatusCodes;
const g_users = require('../global_users')
const {update_json_file} = require('../json_file_handling')
const Post = require('./post')
const {get_user_idx, get_user} = require('../users/users_handling')

function list_posts(req, res) //view all posts
{
}

function publish_post_by_user(req, res) //send a message to a users 
{
    const id = parseInt(req.params.id);
    const post = req.body.post;
}

function delete_post_of_user(req, res) //send a message to all users 
{
    const id = parseInt(req.params.id);

    //we can get post or post_id
    const post = req.body.message;
}

module.exports = {list_posts, publish_post_by_user, delete_post_of_user}