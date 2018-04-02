import React, { Component } from 'react';
import axios from 'axios';

class Posts extends Component {
    constructor(){
        super();
        this.state={
            posts:[],
        }
    }

    componentDidMount(){
        axios.get('http://localhost:5000/api/posts')
        .then(response=>{
            this.setState(()=> ({posts:response.data}))
        })
        .catch(error=>{
            console.error('Server errror', error);
        })
    }
    render() {
        return (
            <div>
                {this.state.posts.map(post=>{
                    return (
                        <div key={post.id}>
                            <h1>{post.title}</h1>
                            <h3>{post.content}</h3>
                        </div>
                    );
                })}
            </div>
        );
    }
}

export default Posts;