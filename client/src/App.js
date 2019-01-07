import React, { Component } from 'react';
import axios from 'axios';
import './App.css';

const url = 'http://localhost:9000/api/posts/';

class App extends Component {
  constructor () {
    super();
    this.state = {
      postData: []
    }
  }

  componentDidMount = () => {
    axios.get('http://localhost:9000/api/posts/')
      .then(res => {
        console.log(res)
        this.setState({
          postData: res.data
        })
      })
      .catch(err => console.log(err))
  }
  render() {
    console.log(this.state)
    return (
      <div className="App">
        <h1>Hello</h1>
      </div>
    );
  }
}

export default App;
