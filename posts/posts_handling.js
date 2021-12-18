const StatusCodes = require('http-status-codes').StatusCodes;
const global_scope = require('../global_consts')
const jwt = require('jsonwebtoken')

function list_posts(req, res) //view all posts
{
    res.send(JSON.stringify(global_scope.posts_list.get_list()))
}

function publish_post(req, res)
{
    const post = req.body.post;

    if(req.user_data)
	{
        new_post = global_scope.posts_list.add_post(post,req.user_data['id'])
		res.send(JSON.stringify(new_post))
		return
	}
}

function delete_post(req, res)
{
    const id = parseInt(req.params.id);
    creator_id = global_scope.posts_list.get_creator(id)

    if(creator_id == null)
    {
        res.status( StatusCodes.BAD_REQUEST );
		res.send( "this post id doesn't exist")
		return;
    }

    if(creator_id == req.user_data['id'] || req.user_data['id'] == '1' )
    {
        global_scope.posts_list.delete_post(id)
    }

    else 
    {
        res.status(StatusCodes.FORBIDDEN); // Forbidden
		res.send("only the creator or root user can delete this post")
		return	
    }
}

module.exports = {list_posts, publish_post, delete_post}