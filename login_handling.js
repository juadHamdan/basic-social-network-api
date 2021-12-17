const StatusCodes = require('http-status-codes').StatusCodes;
const global_scope = require('./global_consts')
const users_handlings = require('./users/users_handling')
//const Status = require('./status')


function login(req, res)
{
	const id = req.body.id;
  const password = req.body.password;

  if (users_handlings.check_id(id, req))
  {
    if (global_scope.users_list.login_authentication(id,password))
    {
      res.status(StatusCodes.OK);
      //TOKEN
      res.send("user logged in successfully")
      return;
    }
  
    else
    {
      res.status( StatusCodes.BAD_REQUEST );
      res.send( "invalid id or password")
      return;
    }
  }
}


module.exports = {login }