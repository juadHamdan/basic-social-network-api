const fs = require('fs');

const json_file_name = 'users.json'

//TODO: check if file exists! if so, don't update the file! (Consistant)
function create_json_file(json_object)
{
	fs.writeFile(json_file_name, JSON.stringify(json_object), (err) => {
		if (err) {
			throw err;
		}
	});
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

module.exports = {create_json_file, update_json_file};