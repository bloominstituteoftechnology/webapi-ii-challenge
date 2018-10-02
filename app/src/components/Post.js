import React from 'react';
import styled from 'styled-components';

export default class Post extends React.Component{
    render(){
        return(
            <PostStyled>
                <div className='post'>
                    <div className='title'>
                        "{this.props.post.title}"
                    </div>
                </div>
            </PostStyled>
        )
    }
}

const PostStyled = styled.div`
    font-size: 1rem;
    font-weight: lighter;
    font-style: italic;
    margin: 50px;
    line-height: 1.5;
`