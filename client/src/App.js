import React, { Component } from 'react';
import './App.css';

import axios from 'axios';
import {
  Container,
  Col,
  Card,
  CardTitle,
  CardBody,
  CardText,
  Row
} from 'reactstrap';

class App extends Component {
  constructor() {
    super();
    this.state = {
      posts: []
    };
  }

  componentDidMount() {
    axios
      .get('http://localhost:5010/api/posts')
      .then(response => {
        this.setState({ posts: response.data });
      })
      .catch(error => {
        console.log(`There was an error getting posts ${error}`);
      });
  }

  render() {
    return (
      <div className="App">
        <Container>
          <Row>
            {this.state.posts.map((post, index) => {
              return (
                <Col>
                  <Card>
                    <CardBody>
                      <CardTitle>{post.title}</CardTitle>
                      <CardText>{post.contents}</CardText>
                    </CardBody>
                  </Card>
                </Col>
              );
            })}
          </Row>
        </Container>
      </div>
    );
  }
}

export default App;
