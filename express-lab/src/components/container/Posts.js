import React, { Component } from 'react';
import Post from '../presentational/Post'

class Posts extends Component {

    // constructor(props) {
    //     super(props)
    // }

    render() {
        return (
            <section className="posts">
                <h1 className="title">LOTR Posts</h1>
                { this.props.posts.map((post, index) => <Post key={post.id + "-" + index} post={post} deletePost={this.props.deletePost}/>).reverse() }
            </section>
        )
    }
}

export default Posts;