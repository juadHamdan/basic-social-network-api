const StatusCodes = require('http-status-codes').StatusCodes;
const g_users = require('../global_users')
const {update_json_file} = require('../json_file_handling')
const User = require('./user')
const Status = require('./status')

function get_user_idx(id, res)
{
	if (id <= 0)
	{
		res.status(StatusCodes.BAD_REQUEST);
		res.send("Bad id given")
		return null;
	}

	const idx = g_users.findIndex(user => user.id == id)
	if (idx < 0)
	{
		res.status(StatusCodes.NOT_FOUND);
		res.send("No such user")
		return null;
	}

	return idx
}

function get_user(id, res)
{
	if (id <= 0)
	{
		res.status(StatusCodes.BAD_REQUEST);
		res.send("Bad id given")
		return null;
	}

	const user = g_users.find(user => user.id == id)
	if (!user)
	{
		res.status(StatusCodes.NOT_FOUND);
		res.send("No such user")
		return null;
	}

	return user
}


function list_users(req, res) 
{
	res.send(JSON.stringify(g_users));   
}

function delete_user(req, res)
{
	const id = parseInt(req.params.id);

	if (id == 1)
	{
		res.status(StatusCodes.FORBIDDEN); // Forbidden
		res.send("Can't delete root user")
		return;		
	}

	const user_idx = get_user_idx(id, res)
	if(!user_idx)
		return

	g_users.splice(user_idx, 1)
	update_json_file(g_users)

	res.send(JSON.stringify({}));   
}

function create_user(req, res)
{
	const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;

	if (!name)
	{
		res.status( StatusCodes.BAD_REQUEST );
		res.send( "Missing name in request")
		return;
	}
    if(!valid_mail(email))
	{
		res.status( StatusCodes.BAD_REQUEST );
		res.send( "request email is invalid")
		return;
	}
	if(!password)
	{
		res.status( StatusCodes.BAD_REQUEST );
		res.send( "Missing password in request")
		return;
	}


    const new_id = generate_unique_id()

    const new_user = new User(name, new_id, email, password)
    g_users.push(new_user)
	update_json_file(g_users)

	res.send(JSON.stringify(new_user) );   
}

function generate_unique_id()
{
    let max_id = 0;
    g_users.forEach(item => { max_id = Math.max( max_id, item.id) })

    return max_id + 1;
}

function update_user_status(req, res, new_status)
{
	const id = parseInt(req.params.id);

	const user_idx = get_user_idx(id, res)
	if(!user_idx)
		return

	const user = g_users[user_idx];
	user.status = new_status;
	update_json_file(g_users)

	res.send(JSON.stringify({user}));  
}

function approve_user(req, res)
{
	update_user_status(req, res, Status.active)
}

function suspend_user(req, res)
{
	update_user_status(req, res, Status.suspended)
}

function restore_suspended_user(req, res)
{
	update_user_status(req, res, Status.active)
}

function valid_mail(email)
{
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
}

module.exports = {get_user_idx, get_user, list_users, create_user, get_user, delete_user, approve_user, suspend_user, restore_suspended_user}