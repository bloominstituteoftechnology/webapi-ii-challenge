import React, { Component } from 'react';
import './App.css';
import axios from 'axios'

class App extends Component {
  constructor(props){
    super();
    this.state={
      posts:{}
    }
    
  }

  componentDidMount=()=>{
    axios
      .get('http://localhost:4040/api/posts')
      .then(res =>{
        this.setState({posts:res.data})
        console.log(this.state.posts)
      })
  }
  render() {
    return (
      <div className="App">
      
      </div>
    );
  }
}

export default App;
