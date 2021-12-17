const StatusCodes = require('http-status-codes').StatusCodes;
const global_scope = require('./global_consts')
const users_handlings = require('./users/users_handling')
//const Status = require('./status')
const jwt = require('jsonwebtoken');

function login(req, res)
{
	const id = req.body.id;
  const password = req.body.password;

  if (users_handlings.check_id(id, req))
  {
    if (global_scope.users_list.login_authentication(id,password))
    {
      res.status(StatusCodes.OK);
      create_token(res,id)
      res.send("user logged in successfully")
      return;
    }
  
    else
    {
      res.status( StatusCodes.BAD_REQUEST );
      res.send( "invalid Credentials")
      return;
    }
  }
}

function create_token(res,id)
{
  let token = jwt.sign( {id: id} , 'secret', { expiresIn: '24h' }   );
  res.cookie('auth',token, { httpOnly : false } );
}


function token_checker(req, res, next)
{
  let token = req.headers.cookie
  token = token.split('=')[1]

  if (token) {

    jwt.verify(token, 'secret', function(err, token_data) {
      if (err) {
         return res.status(403).send('Error');
      } else {
        req.user_data = token_data;
        next(req,res);
      }
    });

  } else {
    return res.status(403).send('No token');
  }
}


function hello()
{

  console.log("hello");

}


module.exports = {login,token_checker }