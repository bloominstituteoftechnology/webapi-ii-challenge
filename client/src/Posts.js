import React, { Component } from 'react';
import axios from 'axios';

class Posts extends Component {
    constructor(props){
        super(props);
        this.state = {
            posts: [],
            done: false     
        };
    }

    componentDidMount() {
        let url = "http://localhost:9000/api/posts";
        axios.get(url)
            .then(res => {
                this.setState({posts: res.data, done: true})
            })
           .catch(err => {
                console.log(err);
            })
    }

    render() {
        if (!this.state.done){
                return (<div></div>)
        }
        return (
                <div className="posts">
                {this.state.posts.map(post => {
                    return (
                        <div className = 'forPosts' key={post.id}>
                        <div className = 'title'>
                            <h2>{post.title}</h2>
                        </div>
                        <div className = 'thePostss'>
                            <p className = 'thePosts'>{post.contents}</p>
                            <p>{post.create_at}</p>
                        </div>
                        </div>
                    )
                })}
               </div>
        );
    }
}

export default Posts;
