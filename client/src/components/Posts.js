import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PostsList from './PostsList';

const Posts = () => {
    const [state, setState] = useState();

    const getPosts = () => {
        axios
            .get('http://localhost:5000/api/posts')
            .then(data => setState(data))
            .catch(err => console.error(err));
    };

    useEffect(() => {
        getPosts();
    }, []);
    console.log(state);
    if (typeof state === 'undefined') {
        return <h1>Loading</h1>;
    } else {
        console.log(state);
        return <PostsList posts={state.data.posts} />;
    }
};

export default Posts;
