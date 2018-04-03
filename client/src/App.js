import React from 'react';
import axios from 'axios';
import { Card, CardTitle, CardText } from 'reactstrap';

import './App.css';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      posts: [],
    }
  }
  
  getPosts() {
    axios
    .get('http://localhost:5000/api/posts/')
    .then(res => {
      console.log('activated get client')
      this.setState( {posts: res.data} );
    }).catch(error => {
      console.error(error);
    })
  }

  componentDidMount() {
    this.getPosts();
  }

  render() {
    return (
      <div className="App">
        {this.state.posts.map(post => {
          return (
          <Card key={post.id}>
            <CardTitle>{post.title}</CardTitle>
            <CardText>{post.contents}</CardText>
          </Card>
        )})}
      </div>
    );
  }
}

export default App;
