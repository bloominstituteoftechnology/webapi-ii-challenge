import React, { Component } from 'react';
import axios from 'axios';

class List extends Component {
    constructor(props) {
        super(props);
        this.state = {
            posts: [] 
        };
    }

    componentDidMount() {
        const endpoint = 'http://localhost:9000/api/posts';

        axios
        .get(endpoint)
        .then(response => {
            this.setState(() => ({ posts: response.data }));
        })
        .catch(error => {
            console.error('Server Error', error);
        });
    }

    render() {
        return (
            <ul>
                hello
                {this.state.posts.map(post => {
                    return (
                        <li>
                            {post.title}
                            {post.contents}
                        </li>
                    )
                })}
            </ul>
        )    
    }
}

export default List;