import React from 'react';

export default function Post(props) {
    const post = props.posts.find(post => post.id === props.match.params.id);

    function handleDelete() {
        
    }

    if (props.fetchingPosts || props.posts.length === 0) return <h2>Loading data...</h2>;

    return (
        <div className="post-view">
        <div className="post-options">
        </div>
        <h2>{post.title}</h2>
        <h3>{post.contents}</h3>
        </div>
    )
}

