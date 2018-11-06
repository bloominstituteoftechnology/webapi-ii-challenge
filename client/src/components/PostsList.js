import React from 'react';
import { PostsContainer, Posts, PostContent, Title } from "../Styles";

const PostsList = (props) => {
    return(
        <PostsContainer>
            <Posts>Id: {props.post.id}</Posts>
            <Title>Title:</Title>
            <Posts>"{props.post.title}"</Posts>
            <Title>Content:</Title>
            <PostContent>{props.post.contents}</PostContent>
        </PostsContainer>
    );
}

export default PostsList;