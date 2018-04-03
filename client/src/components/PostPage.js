import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import NewPost from './NewPost';

export default class PostPage extends React.Component {
    state = {
        posts: [],
    };

    

    componentDidMount() {
        axios
            .get('http://localhost:5000/api/posts')
            .then(response => {
                this.setState(() => ({posts: response.data}));
            })
            .catch(error => {
                console.error('Could Not Retrieve Posts', error)
            });
    }

    render() {
        return (
            <div>
                
            <div className='post-list'>
                {this.state.posts.map(post => (
                    <div className='post-container'>
                        <div className='post-title'>{post.title}</div>
                        <div className='post-text'>{post.contents}</div>
                    </div>

                    ))}
            </div>
            <NewPost />
            </div>
        )
    }
}

