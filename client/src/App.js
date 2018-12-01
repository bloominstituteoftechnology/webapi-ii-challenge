import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';

class App extends Component {
  constructor(){
    super()
    this.state = {
      posts : []
    }
  }

  componentDidMount(){
    axios
      .get('http://localhost:4000/api/posts')
        .then(res =>{
          this.setState({
            posts : res.data
          })
        })
        .catch(err =>{
          console.log(err);
        })
  }
  componentDidMount(){

  }
  render() {
    return (
      <div className="App">

      </div>
    );
  }
}

export default App;
