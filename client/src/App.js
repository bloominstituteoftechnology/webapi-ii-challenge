import React, { Component } from 'react';
import axios from 'axios';
import Posts from './components/Posts';
import './App.css';

class App extends Component {
constructor(props){
  super(props);
  this.state={
    posts:[],
  }
  this.url='http://localhost:4000/api';
}
componentDidMount(){
  axios
  .get(`${this.url}/posts`)
  .then(res =>{
    this.setState({
      posts: res.data
    })
  })
  .catch(err =>{
    console.log(err)
  })
}

  render() {
    return (
      <Posts posts={this.state.posts}/>
    );
  }
}

export default App;
