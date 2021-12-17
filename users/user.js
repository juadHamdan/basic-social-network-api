const Status = require('./status')
const bcrypt = require('bcrypt')


class User {
    constructor(name, id, email, password)
    {
        this.id = id
        this.name = name
        this.email - email
        this.password = hash(password);

        this.creation_date = Date.now()
        this.status = Status.created
    }

    changeName(new_name){
        this.name = new_name
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

module.exports = User