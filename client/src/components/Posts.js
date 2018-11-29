import React, { Component } from 'react';
import Post from './Post';
import '../css/posts.css';

class Posts extends Component {
constructor(props) {
    super(props)
}

    render() {
        return (
            <div className='post-list'>
                {this.props.posts.map(post => {
                    return (
                        <Post
                            post={post}
                        />
                    )
                })}
            </div>
        )
    }
}

export default Posts;