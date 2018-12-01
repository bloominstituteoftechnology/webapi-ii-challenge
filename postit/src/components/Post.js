import React from "react";
import { connect } from "react-redux";
// import Posts from './Posts';
import {deletePost} from '../actions/index'
import { Contianer, Button, LinkContainer, Body } from "../sytles/PostStyles";

const Post = ({ post, deletePost }) => {

const deleteHandler = () => {
    deletePost(post.id)
}

return (
    <Contianer key={post.id} className="post-card">
        <Body>
    <p>{post.title}</p>
    <h4>{post.contents}</h4>
            <hr />
        </Body>
        <LinkContainer>
            <Button onClick={deleteHandler}>Delete</Button>
            <br />
            <Button>Update</Button>
        </LinkContainer>
    </Contianer>
  );
};

const mapStateToProps = () => ({});

export default connect(mapStateToProps, {deletePost})(Post);
