import React, { Component } from 'react';
import axios from 'axios';
import logo from './logo.svg';
import './App.css';
import PostList from './Components/PostList'
const url = 'http://localhost:5000/posts'
class App extends Component {

  state={
    post:[]
  }
componentDidMount(){
  this.updateState()
}

updateState = () =>{
  axios
  .get('http://localhost:5000/posts')
  
  .then(response =>{
    console.log(response)
    this.setState({post: response.data})
  })
  .catch(err =>{
    console.log(err)
  })
}


  render() {
    console.log(this.state.post)
    return (
      <div className="App">
    <PostList post={this.state.post}/>
      </div>
    );
  }
}

export default App;
