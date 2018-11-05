import React from 'react';
import { PostsContainer, Posts, PostContent } from "../Styles";

const PostsList = (props) => {
    return(
        <PostsContainer>
            <Posts>Id: {props.post.id}</Posts>
            <Posts>Title: "{props.post.title}"</Posts>
            <PostContent>Content: {props.post.contents}</PostContent>
        </PostsContainer>
    );
}

export default PostsList;