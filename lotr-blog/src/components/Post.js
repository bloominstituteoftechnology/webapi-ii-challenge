import React from "react";
import { Link } from "react-router-dom";
import { Card, CardBody, CardTitle, CardText, Button } from "reactstrap";

const Post = props => {
  const post = props.posts.find(i => String(i.id) === props.match.params.id);

  if (!post) {
    return <div>Loading...</div>;
  }
  
  
  return (
    <Card key={post.id}>
      <CardBody>
        <CardTitle>{post.title}</CardTitle>
        <CardText>{post.contents}</CardText>
        <Button>Comments</Button>
      </CardBody>
    </Card>
  );
};

Post.defaultProps = {
  title: "",
  contents: "",
  comments: []
};

export default Post;
