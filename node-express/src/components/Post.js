import React from 'react';
import styled from 'styled-components';

const PostOption = styled.p`
text-decoration: underline;
padding: 5px;
`

const PostTitle = styled.h2`
color: #474B4C;
`
const PostBody = styled.p`
color: #474B4C;
`

export default function Post(props) {
    const post = props.posts.find(post => post.id === props.match.params.postId);

    function handleDelete() {
        props.handleDeletePost(post.id);
        props.history.push('/posts');
    }

    if (props.fetchingPosts || props.posts.length === 0) return <h2>Loading data...</h2>;

    return (
        <div className="post-view">
        <div className="post-options">
        <PostOption onClick={(event) => props.goToUpdatePostForm(event, post.id)}>edit</PostOption>
        <PostOption onClick={this.handleDelete}> delete</PostOption>
        </div>
        <h2>{post.title}</h2>
        <h3>{post.contents}</h3>
        </div>
    )
}

