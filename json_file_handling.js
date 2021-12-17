const { json } = require('express/lib/response');
const fs = require('fs');


const json_file_name = 'users.json'

//TODO: check if file exists! if so, don't update the file! (Consistant) OK!!
function create_json_file(json_object)
{
	if(!fs.existsSync(json_file_name))
		create_json(json_file_name,json_object)

	return import_json_data(json_file_name,json_object)
}

function update_json_file(json_object)
{
	fs.writeFile(json_file_name, JSON.stringify(json_object), (err) => {
		if (err) {
			throw err;
		}
	});
	console.log("json file updated.")
}

function create_json(json_object,json_file_name,)
{
	fs.writeFileSync(json_file_name, JSON.stringify(json_object), (err) => {
		if (err) {
			throw err;
		}});
	console.log("json file created.")
}

function import_json_data(json_file_name,json_object)
{
	rawdata = fs.readFileSync(json_file_name) // if rawdate isnt empty
	datalist = JSON.parse(rawdata)
	return datalist
}


module.exports = {create_json_file, update_json_file};