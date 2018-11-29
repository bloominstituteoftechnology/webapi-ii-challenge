import React, { Component } from 'react';
import '../css/posts.css';

class Post extends Component {
    constructor(props) {
    super(props)
}


    render() {
        return (
            <div className='post'>
                <h2 className='title'>{this.props.post.title}</h2>
                <h3 className='content'>{this.props.post.contents}</h3>
                <input />
            </div>    
        )
    }
}

export default Post;