const User = require("./user");

class UsersList {
    constructor(json)
    {
        x=1
        datalist = JSON.parse(fs.readFileSync(json));
        datalist.forEach(data => {
            json_object.push(new User(data.name, this.users_array.length + 1 ,data.email, data.password))
        });
    }

    users_array = [ {id:1, name: 'Root'} ];

    add_user(new_name){
        this.name = new_name
    }

    get_user_by_id(id){
        return users_array.findIndex(user => user.id == id)   
    }

    delete_user(id){

    }

    get_list()
    {
        return users_array
    }
}


module.exports = UsersList