const { update_json_file } = require("../json_file_handling")
const Status = require("./status")
const bcrypt = require('bcrypt')
const User = require("./user")


class UsersList {
    constructor(json)
    {
        if(json != null)
        {
            json.forEach(data => {
            if(data.id != 1)
                this.users_array.push(new User(data.name, this.users_array.length + 1 ,data.email, data.password,data.status))});
        }
        else update_json_file(this.users_array)
    }

    users_array = [ {id:1, name: 'Root'} ];

    add_user(name, email, password)
    {
        const new_user = new User(name,this.users_array.length + 1,email,hash(password),Status.created)
        this.users_array.push(new_user)
        update_json_file(this.users_array)
        return new_user
    }

    get_index(id)
    {
        return this.users_array.findIndex(user => user.id == id)
    }

    delete_user(id)
    {
        let index = this.get_index(id)
        if (index === -1 ) return -1
	
	    this.users_array.splice(index, 1)
        update_json_file(this.users_array)
        return 0;
    }

    get_list()
    {
        return this.users_array
    }

    update_status(id, new_status)
    {
        let index = this.get_index(id)
        if (index === -1 ) return -1

        const user = this.users_array[index]
	    user.status = new_status;
	    update_json_file(this.users_array)
        return user;
    }
}


function hash(password)
{
    let salt = bcrypt.genSaltSync(10);
    let hash = bcrypt.hashSync(password, salt);
    return hash
}

//get id saved password hash and comparewith the given password
function compare_pass(password, hash)
{
    return bcrypt.compareSync(password, hash);
}

module.exports = UsersList