import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import { Jumbotron } from 'reactstrap';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      posts: []
    }
  }

  componentDidMount() {
    axios.get('http://localhost:5555/api/posts')
      .then((response) => this.setState({ posts: response.data.posts }));
  }

  render() {
    return (
      <div className="App">
        {
          this.state.posts.map((post, index) => {
            return (
              <Jumbotron>
                <h1 className="display-3">{post.title}</h1>
                <p className="lead">{post.contents}</p>
              </Jumbotron>
            )
          })
        }
      </div>
    );
  }
}

export default App;
