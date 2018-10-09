import React, { Component } from 'react';
import axios from 'axios';
import logo from './logo.svg';
import Posts from './components/Posts';
import './App.css';

class App extends Component {
  constructor(){
    super()
    this.state = {
      posts:[]
    }
  }

  componentDidMount(){
    this.getPost();
  }

  getPost = () => {
   axios
  .get('http://localhost:7000/api/posts')
  .then(res => this.setState({posts:res.data}))
  .catch(err => console.log(err))
  }


  render() {
    return (
      <div className="App">
        <Posts posts = {this.state.posts} getPost ={this.getPost} />
      </div>
    );
  }
}

export default App;
