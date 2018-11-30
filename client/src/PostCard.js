import React from 'react';
import styled from 'styled-components';

const PostCardContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 50%;
    margin: 10px auto;
    padding: 8px;
    border: 2px solid black;
    border-radius: 5px;
    box-shadow: 3px 3px 3px #999999;

    h2{
        font-size: 2.4rem;
        margin: 8px;
    }

    p{
        font-size: 1.6rem;
        margin: 8px;
    }
`;

const PostCard = props=>{
    return(
        <PostCardContainer>
            <h2>{props.header}:</h2>
            <p>{props.quote}</p>
        </PostCardContainer>
    );
}

export default PostCard;