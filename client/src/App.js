import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';
import './App.css';
import axios from 'axios';
import Post from './Post';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      posts: [] 
    };
  }

  componentWillMount() {
    axios
      .get('http://localhost:5000/api/posts')
      .then(response => {
        this.setState({ posts: response.data.posts });
        console.log(response.data);
        console.log(this.state.posts);
      })
      .catch(error => {
        console.error('Server Error', error);
      });
  }

  render() {
    return (
      <div>
        <Row>
        {this.state.posts.map(post =>
            <Col xs="4" key={post.id}>
              <Post
              key={post.id} 
              id={post.id}
              title={post.title}
              body={post.contents}
              />
            </Col>)
        }
        </Row>
      </div>
    );
  }
}

export default App;
