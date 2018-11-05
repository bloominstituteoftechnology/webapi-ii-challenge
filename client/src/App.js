import React, { Component } from 'react';
import './App.css';
import axios from 'axios';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts : [],
    }
  }

  componentDidMount() {
      axios.get('http://localhost:9000/api/posts/')
           .then(response => console.log(response.data))
           .catch(error => console.log(error));
  }

  render() {
    return (
      <div>
        <h1>Hello...</h1>
      </div>
    );
  }
}

export default App;
