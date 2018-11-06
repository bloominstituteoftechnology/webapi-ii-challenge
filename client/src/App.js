import React, { Component } from 'react';
import axios from 'axios';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: []
    }
  }

  componentWillMount() {
    axios
      .get('http://localhost:8250/api/posts')
      .then(response => {
        this.setState({
          posts: response.data.posts
        })
      })
      .catch(error => console.log(error))
  }
  render() {
    return (
      <div className="App">
        <h1>THIS IS THE CONNECTING REACT APP</h1>
      </div>
    );
  }
}

export default App;
