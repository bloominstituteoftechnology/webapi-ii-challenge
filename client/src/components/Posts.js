import React from "react";
import {
  Card,
  // CardGroup,
  CardColumns,
  // CardImg,
  CardHeader,
  CardFooter,
  // CardTitle,
  CardText,
  // CardDeck,
  // CardSubtitle,
  CardBody
} from "reactstrap";

const Posts = props => {
  return (
    <CardColumns>
      {props.posts.map(post => {
        return (
          <Card body outline color="primary" key={post.id}>
            <CardBody>
              <CardHeader>Quote Id: {post.id}</CardHeader>
              <CardText>Created: {post.created_at}</CardText>
              <CardText>Updated: {post.updated_at}</CardText>
              <CardText>Quote: {post.title}</CardText>
              <CardFooter>{post.contents}</CardFooter>
            </CardBody>
          </Card>
        );
      })}
    </CardColumns>
  );
};

export default Posts;
