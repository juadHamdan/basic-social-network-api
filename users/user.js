const Status = require('./status')

class User {
    constructor(name, id, email, password, status)
    {
        this.id = id
        this.name = name
        this.email - email
        this.password = password;

        this.creation_date = Date.now()
        this.status = status
    }

    changeName(new_name){
        this.name = new_name
    }
}


module.exports = User