import React, { Component } from 'react';
import './App.css';
import Posts from './posts.js'; 
import axios from 'axios'; 

class App extends Component {
  constructor(){
    super(); 
    this.state= {
      post: []
    }
  }

  componentDidMount(){
    axios
      .get('http://localhost:9000/api/posts')
      .then(response => 
        this.setState({post: response.data}), console.log(this.state.post))
      .catch( err => {console.log("We've encountered an error")})
  }




  render() {
    return (
      <div>
        <Posts post={this.state.post} /> 
      </div>
    );
  }
}

export default App;
