const StatusCodes = require('http-status-codes').StatusCodes;
const global_scope = require('./global_consts')
const users_handlings = require('./users/users_handling')
const jwt = require('jsonwebtoken');

function login(req, res)
{
	const id = req.body.id;
  const password = req.body.password;
  if(req.headers.cookie)
  {
    res.status( StatusCodes.BAD_REQUEST );
    res.send( "please logout before you login to another user")
    return;
  }

  if (users_handlings.check_id(id, req))
  {
    if (global_scope.users_list.login_authentication(id,password))
    {
      res.status(StatusCodes.OK);
      create_token(res,id)
      res.send("you logged in successfully")
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


function logout(req,res)
{
  if (req.user_data)
  {
    res.clearCookie('auth');

    res.status(StatusCodes.OK)
    res.send("user " + req.user_data['id'] + " logged out successfully")
    return;
  }

  else
  {
    res.status( StatusCodes.BAD_REQUEST );
    res.send( "invalid Credentials")
    return;
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

  if (token) {

    token = token.split('=')[1]
    jwt.verify(token, 'secret', function(err, token_data) {
      if (err) {
         return res.status(403).send('Error');
      } else {
        req.user_data = token_data;
        next(req,res);
      }
    });

  } else {
    return res.status(403).send('please login before using the system');
  }
}



module.exports = {login,token_checker,logout}