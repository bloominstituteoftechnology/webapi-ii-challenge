import React, { Component } from 'react';

class Post extends Component {
    constructor(props) {
        super(props);

        this.state = {

        }
    }

    render() {
        return (
            <div>
                <h2>{this.props.post.title}</h2>
                <p>{this.props.post.contents}</p>
                <hr/>
            </div>
        )
    }
}

export default Post;