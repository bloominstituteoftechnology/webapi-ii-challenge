import React from 'react';
import styled from 'styled-components';

const Div = styled.div`
    max-width: 800px;
    margin: 0 auto;
    background: teal;
    padding: 0.5rem 10rem;
    border-bottom: 2px solid white;
`

const P = styled.p`
    color: white;
`
const PostsList = props => {
    return(
        <Div>
            <P style={{
                fontSize: '2rem',
                fontWeight: "900",
                borderBottom:"5px solid white",
                paddingBottom: "none"}}>
                Posts List
            </P>
            {props.posts.map(post => {
                return(
                    <Div>
                        <P><h3>Title: </h3>{post.title} <br /></P>
                        <P><h3>Contents: </h3>{post.contents}</P>
                    </Div>
                )
            })}
        </Div>
    )
}

export default PostsList;