import React from 'react';
import Styled from 'styled-components';

import PostsList from './PostsList';

const Wrapper = Styled.div`
    max-width: 880px;
    margin: 100px auto;
`;

function PostsContainer(props) {
    return (
        <Wrapper>
            <PostsList {...props} posts={props.posts} />
        </Wrapper>
    )
};

export default PostsContainer;