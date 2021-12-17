/*
Run:
Open new terminal (POWERSHELL)
node index

NOTE: messages and posts will be saved under each user (in the users.json "database")

url's checked:

list users: GET http://127.0.0.1:2718/users
create user: POST http://127.0.0.1:2718/user 
body:{
"name" : "Beni Levi",
"email" : "Avi@gmail.com",
"password" : 989898989
}
delete user: DELETE http://127.0.0.1:2718/user/2 
approve user : PUT http://127.0.0.1:2718/approve_user/2 
suspend user : PUT http://127.0.0.1:2718/suspend_user/2 
restore user : PUT http://127.0.0.1:2718/restore_user/2 
*/


const express = require('express')
const package = require('./package.json');
const cookieParser = require('cookie-parser');
const UsersHandling = require('./users/users_handling');
const PostsHandling = require('./posts/posts_handling');
const MessagesHandling = require('./messages/messages_handling');
const LoginHandling = require('./login_handling')

const app = express()
let  port = 2718;

// General app settings
const set_content_type = function (req, res, next) 
{
	res.setHeader("Content-Type", "application/json; charset=utf-8");
	next()
}
app.use( set_content_type );
app.use(express.json());  // to support JSON-encoded bodies
app.use(express.urlencoded( // to support URL-encoded bodies
{  
  extended: true
}));

// Version 
function get_version(req, res) 
{
	const version_obj = { version: package.version, description: package.description };
	res.send(JSON.stringify(version_obj));   
}


// Routing
const router = express.Router();

router.get('/version', (req, res) => {get_version(req, res)})

//TODO users:
router.post('/login', (req, res) => {LoginHandling.login(req, res)}) //when logged in => send posts, send messages
router.get('/users', (req, res) => {UsersHandling.list_users(req, res)}) //DONE
router.put('/approve_user/(:id)', (req, res) => {LoginHandling.token_checker(req, res, UsersHandling.approve_user)}) //DONE
router.put('/suspend_user/(:id)', (req, res) => {UsersHandling.suspend_user(req, res)}) //DONE, when suspended - user cannot login
router.delete('/user/(:id)', (req, res) => {UsersHandling.token_checker(req,res, UsersHandling.delete_user)}) //DONE
router.put('/restore_user/(:id)', (req, res) => {UsersHandling.restore_suspended_user(req, res)}) //DONE
router.post('/user', (req, res) => {UsersHandling.create_user(req, res)}) //DONE duplicate users


//TODO posts
router.get('/posts', (req, res) => {PostsHandling.list_posts(req, res)})
router.post('/post/(:id)', (req, res) => {PostsHandling.publish_post_by_user(req, res)})
router.delete('/post/(:id)', (req, res) => {PostsHandling.delete_post_of_user(req, res)})


//TODO messages:
router.get('/messages/(:id)', (req, res) => {MessagesHandling.list_messages(req, res)})
router.post('/message/:sender_id/:receiver_id', (req, res) => {MessagesHandling.send_message(req, res)}) // from user to user
router.post('/message_users', (req, res) => {messages_handling.message_all_users(req, res)})
router.post('/message_user/(:id)', (req, res) => {messages_handling.message_user(req, res)})

app.use('/',router)
app.use(cookieParser())
app.use(LoginHandling.token_checker)

// Init 
let msg = `${package.description} listening at port ${port}`
app.listen(port, () => { console.log( msg ) ; })