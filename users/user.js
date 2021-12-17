const Status = require('./status')
const crypto = require('crypto');
const md5 = crypto.createHash('md5')


class User {
    constructor(name, id, email, password)
    {
        this.id = id
        this.name = name
        this.email - email
        this.password = Hash(password); //TODO: encrypt password! meaning of slow hash should be check?

        this.creation_date = Date.now()
        this.status = Status.created
    }

    changeName(new_name){
        this.name = new_name
    }
}

function Hash(password){
    return md5.update(password).digest('hex');
}

module.exports = User