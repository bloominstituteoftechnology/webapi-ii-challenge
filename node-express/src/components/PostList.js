import React from 'react';
import styled from 'styled-components';

export default function PostList(props) {
    if (!props.posts || !props.posts.length) {
        return <h1> No data, needs to be fetched...</h1>;
    }
    return (
        <div className="notesContainer">
                {props.posts.map((post) => (
                    <div className="post-card"
                        key={post.id}
                        onClick={() => props.history.push(`/posts/${post.id}`)}
                        >
                        <h2>{post.title}</h2>
                        <h3>{post.contents}</h3>
                        </div>
                ))}
        </div>
    )
}