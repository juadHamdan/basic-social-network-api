const User = require("./user");

class UsersList {
    constructor(json)
    {

    }

    users_array = [ {} ];

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