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


// Routing
const router = express.Router();

router.get('/version', (req, res) => {UsersHandling.get_version(req, res)})
router.get('/users', (req, res) => {UsersHandling.list_users(req, res)})
router.post('/users', (req, res) => {UsersHandling.create_user(req, res)})
router.put('/user/(:id)', (req, res) => {UsersHandling.update_user(req, res)})
router.get('/user/(:id)', (req, res) => {UsersHandling.get_user(req, res)})
router.delete('/user/(:id)', (req, res) => {UsersHandling.delete_user(req, res)})

app.use('/api',router)


// Init 

let msg = `${package.description} listening at port ${port}`
app.listen(port, () => { console.log( msg ) ; })





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