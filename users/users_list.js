const { update_json_file } = require("../json_file_handling");
const User = require("./user");

class UsersList {
    constructor(json)
    {
        if(json != null)
        {
            //ERROR PASSWORD HASES TWICE!
            json.forEach(data => {
            if(data.id != 1)
                this.users_array.push(new User(data.name, this.users_array.length + 1 ,data.email, data.password))});
        }
        else update_json_file(this.users_array)
    }

    users_array = [ {id:1, name: 'Root'} ];

    add_user(name, email, password)
    {
        const new_user = new User(name,this.users_array.length + 1,email,password)
        this.users_array.push(new_user)
        update_json_file(this.users_array)
        return new_user
    }

    get_user_by_id(id)
    {
        return this.users_array.findIndex(user => user.id == id)   
    }

    delete_user(id)
    {
        const user_idx = this.users_array.findIndex(user => user.id == id)
	    if(!user_idx) return
	    this.users_array.splice(user_idx, 1)
        update_json_file(this.users_array)
    }

    get_list()
    {
        return this.users_array
    }
}

module.exports = UsersList