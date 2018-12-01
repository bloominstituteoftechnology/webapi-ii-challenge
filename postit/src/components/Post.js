import React from "react";
import { connect } from "react-redux";
// import Posts from './Posts';
import { Contianer, Button, LinkContainer } from "../sytles/PostStyles";

const Post = ({ post }) => {
  return (
    <Contianer key={post.id} className="post-card">
      <p>{post.title}</p>
      <h4>{post.contents}</h4>
      <LinkContainer>
        <Button>Delete</Button>
            <br/>
        <Button>Update</Button>
      </LinkContainer>
      <hr />
    </Contianer>
  );
};

const mapStateToProps = () => ({});

export default connect(mapStateToProps)(Post);
