import React, { Component } from 'react';

import axios from 'axios';

import './App.css';
import {
  Container,
  Col, 
  Card,
  CardTitle, 
  CardBody,
  CardText, 
  Row
}from 'reactstrap';

class App extends Component {
  constructor(){
    super();
    this.state = {
      posts: []
    };
  this.getPosts = this.getPosts.bind(this);
}

getPosts() {
  axios.get('http://localhost:5000/api/posts')
    .then(res => {
      this.setState({ posts: res.data });
    });
}

componentDidMount() {
  this.getPosts();
}


  render() {
    return (
      <Container className="my-5">
        <Row className="App">
          {this.state.posts.map(post => (
            <Col sm={4} className="d-flex align-items-stretch">
              <Card className="w-100 my-2">
                <CardBody>
                  <CardTitle>{post.title}</CardTitle>
                  <CardText>{post.contents}</CardText>
                </CardBody>
              </Card>
            </Col>   
          ))}
        </Row>
      </Container>
    );
  }
}

export default App;
