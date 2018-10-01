import React, { Component } from 'react';
import Post from '../presentational/Post'

class Posts extends Component {

    // constructor(props) {
    //     super(props)
    // }

    render() {
        return (
            <section className="posts">
            { this.props.posts.map(post => <Post key={post.id} post={post}/>) }
            </section>
        )
    }
}

export default Posts;