import React, { Component } from 'react';
import axios from 'axios';
import './Posts.css';

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
            <div className="Container">
                {this.state.posts.map(post=>{
                    return (
                        <div className="titleContent" key={post.id}>
                            <div className="title"><h1>{post.title}</h1></div>
                            <div className="Content"><h3>{post.contents}</h3></div>
                        </div>
                    );
                })}
            </div>
        );
    }
}

export default Posts;