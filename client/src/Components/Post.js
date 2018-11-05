import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const WrapperDiv = styled.div`

`
const Title = styled.div`
    font-size:2rem;
`
const Contents = styled.div`
    font-size:1.6rem;
`

const Post = props =>{
    return(
        <WrapperDiv>
            <Link to={`/api/post/${props.post.id}`}><Title>{props.post.title}</Title></Link>
            <Contents>{props.post.contents}</Contents>
        </WrapperDiv>
    )
}

export default Post;
