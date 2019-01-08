import React from 'react';
import styled from 'styled-components';

export default function Post(props) {
    return (
        <StyledPost>
            <h3>{props.post.id}) <strong>{props.post.title}</strong></h3>
        </StyledPost>
    )
}

const StyledPost = styled.section`
    max-width: 800px;
    margin: 20px auto;
    border: 1px solid lightblue;
    color: lightblue;
    text-align: left;
    line-height: 2rem;
    padding: 0 20px;
    box-shadow: 0px 0px 15px 0px lightblue;
    border-radius: 5px;

    &:hover {
        box-shadow: 0px 0px 35px 10px lightblue;
        text-decoration: underline;
    }

    strong {
        font-style: italic;
    }
`