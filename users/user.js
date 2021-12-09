const Status = require('./status')

class User {
    constructor(name, id, email, password)
    {
        this.id = id
        this.name = name
        this.email - email
        this.password = password //TODO: encrypt password!
        
        this.creation_date = Date.now()
        this.status = Status.created
    }

    changeName(new_name){
        this.name = new_name
    }
}

module.exports = User