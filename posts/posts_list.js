const { update_json_file } = require("../data/json_file_handling")
const Post = require("./post")

const json_posts = 'data/posts.json'

class PostsList {
    constructor(json)
    {
        if(json != null)
        {
            json.forEach(data => {
                this.posts_array.push(new Post(data.id, data.text, data.creation_date, data.creator))});
        }
    }

    posts_array = [];

    add_post(text,creator)
    {
        const new_post = new Post(this.posts_array.length + 1,text, new Date(Date.now()).toDateString(),creator)
        this.posts_array.push(new_post)
        update_json_file(this.posts_array,json_posts)
        return new_post
    }

    get_index(id)
    {
        const index = this.posts_array.findIndex(post => post.id == id)
        return index
    }

    delete_post(id)
    {
        let index = this.get_index(id)
        if (index === -1 ) return -1
	
	    this.posts_array.splice(index, 1)
        update_json_file(this.posts_array,json_posts)
        return 0;
    }

    get_list()
    {
        return this.posts_array
    }

    get_creator(id)
    {
        const index = this.get_index(id)
        if(index >= 0)   return this.posts_array[index].creator
        else return null
    }
}


module.exports = PostsList