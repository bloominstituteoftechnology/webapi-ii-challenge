import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import PostList from './components/PostList';
import Home from './components/Home';
import {Route} from "react-router-dom";
import axios from 'axios';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      posts: []
    }
  }

  componentDidMount() {
    axios.get('http://localhost:5000/api/posts').then(response => {
      this.setState({posts: response.data});
    }).catch(err => {
      console.log('Error App.js');
    });
  }

  render() {
    return (<div className="App">
      <Route exact="exact" path='/' component={Home}/>
      <Route path="/api/posts" render={(props) => <PostList {...props} posts={this.state.posts}/>}/>
    </div>);
  }
}

export default App;
