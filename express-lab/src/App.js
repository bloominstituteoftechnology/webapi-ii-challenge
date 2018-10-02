import React, { Component } from 'react';
import './App.css';
import './Styles/styles.css';
import Posts from './components/container/Posts';
import axios from 'axios';

class App extends Component {

  state = {posts:[]};

  componentDidMount(){
    axios.get('http://localhost:7777/api/posts')
    .then(response => this.setState({...this.state, posts: response.data}))
    .catch(error => console.log(error));
  }

  render() {
    return (
      <div className="App">
      <Posts posts={this.state.posts}/>
      </div>
    );
  }
}

export default App;
