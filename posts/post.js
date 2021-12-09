class Post {
    constructor(id, text)
    {
        this.id = id
        this.text = text

        this.creation_date = Date.now()
    }
}

module.exports = Post