import React, { Component } from 'react';
import axios from 'axios';
import {
  Card,
  CardTitle,
  CardText,
  Container,
  Row,
  Col,
  Button,
} from 'reactstrap';
import PropTypes from 'prop-types';
import './Post.css';

class Post extends Component {
  constructor(props) {
    super(props);
    this.state = {
      post: null,
      showUpdatePostForm: false,
      title: '',
      contents: '',
    };
  }

  componentDidMount() {
    const { id } = this.props.match.params;
    this.getPost(id);
  }

  getPost = id => {
    axios
      .get(`http://localhost:5000/api/posts`)
      .then(res => {
        this.setState({ post: res.data[id - 1] });
      })
      .catch(err => {
        console.log(err);
      });
  };

  updatePost = postId => {
    const post = {};
    if (this.state.title !== '') {
      post.title = this.state.title;
    }
    if (this.state.contents !== '') {
      post.contents = this.state.contents;
    }
    axios
      .put(`http://localhost:5000/api/posts/${postId}`, post)
      .then(res => {
        this.setState({
          showUpdatePostForm: false,
          title: '',
          contents: '',
        });
        this.props.getPosts();
        window.location.reload();
      })
      .catch(err => {
        console.log(err);
      });
  };

  deletePost = postId => {
    axios
      .delete(`http://localhost:5000/api/posts/${postId}`)
      .then(res => {
        window.location = 'http://localhost:3000/posts';
      })
      .catch(err => {
        console.log(err);
      });
  };

  handleEditPost = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  showUpdatePostForm = () => {
    this.setState({ showUpdatePostForm: !this.state.showUpdatePostForm });
  };

  render() {
    if (!this.state.post) {
      return (
        <div>
          <Container className="postContainer">
            <Row className="postsRow">
              <Col sm="12">
                <Card body>
                  <CardTitle>No Post found!</CardTitle>
                </Card>
              </Col>
            </Row>
          </Container>
        </div>
      );
    }
    const { id, title, contents } = this.state.post;
    return (
      <div>
        <Container className="postContainer">
          <Row className="postsRow">
            <Col sm="12">
              <Card body>
                <CardTitle>Title: {title}</CardTitle>
                <CardText>ID: {id}</CardText>
                <CardText>Contents: {contents}</CardText>
                <div className="editPost">
                  <Button
                    color="warning"
                    className="editPostButton"
                    onClick={this.showUpdatePostForm}
                  >
                    Update
                  </Button>
                  <Button
                    color="danger"
                    className="editPostButton"
                    onClick={() => this.deletePost(id)}
                  >
                    Delete
                  </Button>
                </div>
                {this.state.showUpdatePostForm ? (
                  <div>
                    <input
                      type="text"
                      onChange={this.handleEditPost}
                      placeholder="title"
                      name="title"
                      value={this.state.title}
                    />
                    <input
                      type="text"
                      onChange={this.handleEditPost}
                      placeholder="contents"
                      name="contents"
                      value={this.state.contents}
                    />
                    <button onClick={() => this.updatePost(id)}>
                      Save Post
                    </button>
                  </div>
                ) : null}
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

Post.propTypes = {
  id: PropTypes.number,
};

export default Post;
