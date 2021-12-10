class Message {
    constructor(id, text)
    {
        this.id = id
        this.text = text

        this.creation_date = Date.now()
    }
}

module.exports = Message