const express = require('express')
const StatusCodes = require('http-status-codes').StatusCodes;
const package = require('./package.json');
const UsersHandling = require('./users/users_handling');

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
function get_version( req, res) 
{
	const version_obj = { version: package.version, description: package.description };
	res.send(JSON.stringify(version_obj));   
}


// Routing
const router = express.Router();

router.get('/version', (req, res) => {get_version(req, res)})

//router.get('/users', (req, res) => {UsersHandling.list_users(req, res)}) 
//router.post('/users', (req, res) => {UsersHandling.create_user(req, res)})
router.put('/user/(:id)', (req, res) => {UsersHandling.update_user(req, res)})
router.get('/user/(:id)', (req, res) => {UsersHandling.get_user(req, res)})
//router.delete('/user/(:id)', (req, res) => {UsersHandling.delete_user(req, res)}) 

//TODO users:
router.get('/users', (req, res) => {UsersHandling.list_users(req, res)}) //DONE
router.post('/approve_user/(:id)', (req, res) => {UsersHandling.approve_user(req, res)}) // created => active
router.post('/suspend_user/(:id)', (req, res) => {UsersHandling.suspend_user(req, res)}) //when suspended - user cannot login
router.delete('/user/(:id)', (req, res) => {UsersHandling.delete_user(req, res)}) //DONE
router.post('/restore_user/(:id)', (req, res) => {UsersHandling.restore_suspended_user(req, res)}) //suspended => active
router.post('/message_users', (req, res) => {UsersHandling.message_all_users(req, res)})
router.post('/message_user/(:id)', (req, res) => {UsersHandling.message_user(req, res)})
router.post('/create_user', (req, res) => {UsersHandling.create_user(req, res)})


//TODO posts
router.post('/post/(:id)', (req, res) => {PostsHandling.publish_post_by_user(req, res)})
router.delete('/post/(:id)', (req, res) => {PostsHandling.delete_post_of_user(req, res)})


//TODO messages:
router.post('/message/(:id)/(:id)', (req, res) => {MessagesHandling.send_message(req, res)}) // from user to user

app.use('/api',router)


// Init 

let msg = `${package.description} listening at port ${port}`
app.listen(port, () => { console.log( msg ) ; })


//A question to Ilan: messages or posts should be saved in the users or save them by themselves?


/*

const http = require('http')

const HOST_NAME = "127.0.0.1"
const PORT = 3000
const homePage = '/'

const server = http.createServer((req, res) => {
    if(req.url === homePage)
    {
        //res.statusCode = 200 //OK
        //res.setHeader('Content-Type', 'text/html') //all content types: https://www.geeksforgeeks.org/http-headers-content-type/
        res.writeHead(200, {'Content-Type': 'text/html'})
        res.end('<h1>Home Page</h1>')
    }
    else
    {
        res.statusCode = 404
        res.setHeader('Content-Type', 'text/html')
        res.end('<h1>Page Not Found</h1>')
    }
})

server.listen(PORT, HOST_NAME, () => console.log(`Server running at http://${HOST_NAME}:${PORT}/`))

*/

/*

export my module:

const myModule = ...
modules/exports = myModule

*/


/*
Run:
Open new terminal (POWERSHELL)

run normally:
node index

run so we dont have to reload when changes occur:
npm run dev
*/