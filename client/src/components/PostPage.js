import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import NewPost from './NewPost';

import './post.css';

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
            <h1 className='title title-B'>🅱️<div className='title title-rest'>acefook</div></h1>
            <NewPost />   
            <div className='post-list'>
                {this.state.posts.map(post => (
                    <div className='post-container'>
                        <div className='post-title'>{post.title}</div>
                        <div className='post-text'>{post.contents}</div>
                    </div>
                    ))}
            </div>

            </div>
        )
    }
}

