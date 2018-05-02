import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardTitle, CardText, Container, Row, Col } from 'reactstrap';
import PropTypes from 'prop-types';
import './Posts.css';
import PostForm from '../PostForm/PostForm';

const Posts = props => {
  console.log('props', props);
  return (
    <div>
      <h1 className="postsHeader">Posts List</h1>
      <PostForm
        handleNewPost={props.handleNewPost}
        addPost={props.addPost}
        state={props.state}
      />
      <Container>
        <Row className="postsRow">
          {props.posts.map(post => {
            return (
              <Link
                key={post.id}
                to={`/posts/${post.id}`}
                className="postCard"
              >
                <Col sm="12">
                  <Card body>
                    <CardTitle>Title: {post.title}</CardTitle>
                    <CardText>Contents: {post.contents}</CardText>
                  </Card>
                </Col>
              </Link>
            );
          })}
        </Row>
      </Container>
    </div>
  );
};

Posts.propTypes = {
  posts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      title: PropTypes.string,
      contents: PropTypes.string
    }),
  ),
};

export default Posts;
