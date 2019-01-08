import React from 'react';
import styled from 'styled-components';
import axios from 'axios';

class Post extends React.Component {

    deletePost = (id) => {
        axios.delete(`http://localhost:5000/api/posts/${id}`)
            .then(res=> this.props.getPosts())
            .catch(err => console.log(err))
    }

    render() {
        return (
        <StyledPost>
            <h3>{this.props.post.id}) <strong>{this.props.post.title}</strong></h3>
            <button onClick={()=>this.deletePost(this.props.post.id)}>Delete</button>
        </StyledPost>
    )}
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
    position: relative;

    &:hover {
        box-shadow: 0px 0px 35px 10px lightblue;
        text-decoration: underline;
    }

    strong {
        font-style: italic;
    }

    button {
        font-size: 16px;
        background: lightblue;
        cursor: pointer;
        position: absolute;
        right: 10px;
        bottom: 10px;

        &:hover {
            background: white;
            color: black;
        }

        &:active {
            background: black;
            color: white;
        }
    }
`

export default Post;