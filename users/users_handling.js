const StatusCodes = require('http-status-codes').StatusCodes;
const fs = require('fs');
const User = require('./user') //User class

// User's table
const g_users = [ {id:1, name: 'Root'} ];

//update "database"
fs.writeFile('users.json', JSON.stringify(g_users), (err) => {
    if (err) {
        throw err;
    }
    console.log("Root user created.")
});

//Functions:

function list_users( req, res) 
{
	res.send(  JSON.stringify( g_users) );   
}

function get_user( req, res )
{
	const id =  parseInt( req.params.id );

	if ( id <= 0)
	{
		res.status( StatusCodes.BAD_REQUEST );
		res.send( "Bad id given")
		return;
	}

	const user =  g_users.find( user =>  user.id == id )
	if ( !user)
	{
		res.status( StatusCodes.NOT_FOUND );
		res.send( "No such user")
		return;
	}

	res.send(JSON.stringify(user) );   
}

function delete_user(req, res)
{
	const id =  parseInt(req.params.id);

	if (id <= 0)
	{
		res.status(StatusCodes.BAD_REQUEST);
		res.send("Bad id given")
		return;
	}

	if ( id == 1)
	{
		res.status(StatusCodes.FORBIDDEN); // Forbidden
		res.send("Can't delete root user")
		return;		
	}

	const idx = g_users.findIndex(user =>  user.id == id)
	if (idx < 0)
	{
		res.status( StatusCodes.NOT_FOUND );
		res.send( "No such user")
		return;
	}

	g_users.splice(idx, 1)
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
    //TODO: check rest of the body params

    const new_id = generate_unique_id()

    const new_user = new User(name, new_id, email, password)
    g_users.push(new_user)
    //update users "database"
    fs.writeFile('users.json', JSON.stringify(g_users), (err) => {
        if (err) {
            throw err;
        }
    });
	
	res.send(JSON.stringify(newUser) );   
}

function generate_unique_id()
{
    // Find max id 
    let max_id = 0;
    g_users.forEach(
        item => { max_id = Math.max( max_id, item.id) }
    )

    return max_id + 1;
}

function update_user( req, res )
{
	const id =  parseInt( req.params.id );

	if ( id <= 0)
	{
		res.status( StatusCodes.BAD_REQUEST );
		res.send( "Bad id given")
		return;
	}

	const idx =  g_users.findIndex( user =>  user.id == id )
	if ( idx < 0 )
	{
		res.status( StatusCodes.NOT_FOUND );
		res.send( "No such user")
		return;
	}

	const name = req.body.name;

	if (!name)
	{
		res.status(StatusCodes.BAD_REQUEST);
		res.send("Missing name in request")
		return;
	}

	const user = g_users[idx];
	user.name = name;

	res.send(  JSON.stringify( {user}) );   
}

module.exports = {get_version, list_users, create_user, update_user, get_user, delete_user}