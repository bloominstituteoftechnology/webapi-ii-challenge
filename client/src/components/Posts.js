import React, { Component } from 'react';
import Post from './Post';

class Posts extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div>
                <Post />
            </div>
        )
    }
}

export default Posts;