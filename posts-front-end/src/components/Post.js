import React, { Component } from 'react';
import axios from 'axios';

class Post extends Component    {
    onDeleteHandler =   ({target})  =>  {
        axios
        .delete(`http://localhost:4000/api/posts/${this.props.id}`)
        .then((data)    =>  {
            this.props.getPosts()
        })

    }
    render()    {
        return(
            <div>
                <div>
                    {this.props.title}
                </div>
                <div>
                    {this.props.contents}
                </div>
                <div onClick={this.onDeleteHandler}>
                    X
                </div>
            </div>
        )
    }
}

export default Post;
