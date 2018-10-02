import React, { Component } from 'react';
import axios from 'axios';
import './App.css';
import {Route} from 'react-router-dom';
import Posts from './components/posts/posts';

class App extends Component {
  state= {
    posts: []
  }

  componentDidMount(){
    this.getData();
  };

  getData(){
    axios
    .get(`http://localhost:8000/api/posts`)
    .then(response => {
      this.setState({posts: response.data})
    })
    .catch(err => {
      console.log(err);
    });
  }


  render() {
    return (
      <div className="App">
    <Route path='/posts' render={props => <Posts {...props} posts={this.state.posts}/>}/>
      <Route path='/posts:id'  render={props => <Post {...props} posts={this.state.posts}/>}/>
      </div>
    );
  }
}

export default App;
