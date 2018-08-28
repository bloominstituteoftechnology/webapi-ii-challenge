import React from 'react';
import styled from 'styled-components';

const Div = styled.div`
    max-width: 1200px;
    margin: 0 auto;
`

const P = styled.p`
`
const PostsList = props => {
    return(
        <Div>
            {props.posts.map(post => {
                return(
                    <Div>
                        <p><h3>Title: </h3>{post.title} <br /></p>
                        <p><h3>Contents: </h3>{post.contents}</p>
                    </Div>
                )
            })}
        </Div>
    )
}

export default PostsList;