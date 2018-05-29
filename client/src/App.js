import React, { Component } from 'react';
import logo from './logo.svg';
import axios from 'axios'
import {
  Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button
} from 'reactstrap';

class App extends Component {
  constructor() {
    super();
    this.state = {
      posts: []
    }
  }
  componentDidMount = () => {
    axios.get('http://localhost:5000/api/posts')
      .then(result => this.setState({ posts: result.data }))
      .catch(err => console.log(err))
  }
  render() {
    return (
      <div className="App">
        {this.state.posts.map((e, i) => {
          return (
            <Card key={i}>
              <CardTitle>{e.title}</CardTitle>
              <CardText>{e.contents}</CardText>
            </Card>
          );
        })}
      </div>
    );
  }
}

export default App;
