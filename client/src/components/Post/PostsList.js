import React, { Component } from 'react';
import Post from "./Post"

class PostsList extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return (
            <div>
                <Post post={{title: "Hi I'm a title", contents: "And here is my contents"}}/>
            </div>
        )
    }
}
 
export default PostsList;