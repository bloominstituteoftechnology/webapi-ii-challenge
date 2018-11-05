import React from 'react';
import { PostsContainer, Posts, PostContent } from "../Styles";

const PostsList = (props) => {
    return(
        <PostsContainer>
            <Posts>{props.post.id}</Posts>
            <Posts>{props.post.title}</Posts>
            <PostContent>{props.post.contents}</PostContent>
        </PostsContainer>
    );
}

export default PostsList;