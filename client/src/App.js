import React, { Component } from 'react';
import './App.css';
import axios from 'axios'
import {Route} from 'react-router-dom'
import PostList from './components/PostList'

class App extends Component {
  constructor() {
    super()
    this.state = {
      posts: []
    } 
  }

    componentDidMount() {
      axios
      .get('http://localhost:9000/api/posts')
      .then(res => this.setState({posts: res.data}))
      .catch(err => { console.log(err)})
    }


  render() {
    return (
      <div className="App">
        <Route to='/' render={props => <PostList {...props} posts={this.state.posts}/>}/>
      </div>
    );
  }
}

export default App;
