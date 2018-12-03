import React from "react";
import { connect } from "react-redux";
// import Posts from './Posts';
import {deletePost} from '../actions/index'
import { Container, Button, LinkContainer, Body } from "../sytles/PostStyles";
import { NavLink } from "react-router-dom"




const Post = ({ post, deletePost }) => {

const deleteHandler = () => {
    deletePost(post.id)
}

return (
    <Container key={post.id} className="post-card">
        <Body>
    <p>{post.title}</p>
    <h4>{post.contents}</h4>
            <hr />
        </Body>
        <LinkContainer>
            <Button onClick={deleteHandler}>Delete</Button>
            <br />
            <NavLink to={`/update/${post.id}`} style={{ textDecoration: 'none' }}>
                <Button>Update</Button>
            </NavLink>
        </LinkContainer>
    </Container>
  );
};

const mapStateToProps = () => ({});

export default connect(mapStateToProps, {deletePost})(Post);
