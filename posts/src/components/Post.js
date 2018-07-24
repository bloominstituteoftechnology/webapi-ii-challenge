import React from 'react';
import { Card, CardBody, CardTitle, CardText } from 'reactstrap';

const Post = props => (
  <Card style={{ width: '50%', marginLeft: '29%' }}>
    <CardBody>
      <CardTitle>{props.post.contents}</CardTitle>
      <CardText>{props.post.title}</CardText>
    </CardBody>
  </Card>
);

export default Post;
