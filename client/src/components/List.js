import React, { Component } from 'react';
import axios from 'axios';

export default class List extends Component {
    constructor(props) {
        super(props);
        this.state = {
            posts: [] 
        };
    }

    componentDidMount() {
        axios
        .get('http://localhost:9000/api/posts')
        .then(response => {
            this.setState(() => ({ posts: response.data }));
        })
        .catch(error => {
            console.error('Server Error', error);
        });
    }

    render() {
        return (
            <div>
                {this.state.posts.map(post => (
                <PostsDetails post={ post }/>
            ))}
            </div>
        )    
    }
}

function PostsDetails ({ post }) {
    const { title, contents } = post;
    return (
        <div>
            <h1>{ title }</h1>
            <p>{ contents }</p>
        </div>  
    )
}