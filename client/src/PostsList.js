import React from 'react';
import { Card, CardBody, CardText } from 'reactstrap';
import './PostsList.css';

const PostsList = props => {
  return (
    <div>
      {props.posts.map(post => {
        return (
          <Card className="card-style" key={post.id}>
            <CardBody>
              <CardText>
                {post.title}
              </CardText>
              <CardText>
                {post.contents}
              </CardText>
            </CardBody>
          </Card>
        )
      })}
    </div>
  )
}

export default PostsList;