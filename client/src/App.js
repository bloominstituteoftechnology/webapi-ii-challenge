import React, { Component } from 'react';
import axios from 'axios';
import ContentsList from './components/ContentsList';
import AddContents from './components/AddContents';

import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      posts: []
    }
  }

  componentWillMount() {
    axios
      .get('http://localhost:5000/api/posts')
      .then(res => {
        // console.log(res.data.posts);
        this.setState({ posts: res.data.posts })
      })
      .catch(error => {
        console.log(error)
      })
  }

  addNewContent = ( newContent ) => {
    axios
      .post('http://localhost:5000/api/posts', newContent)
      .then(res => {
      axios
        .get('http://localhost:5000/api/posts')
        .then(res => {
        // console.log(res.data.posts);
          this.setState({ posts: res.data.posts })
        })
        .catch(error => {
          console.log(error)
        })
      })
  }
 

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Lists of Contents</h1>
        </header>
        <div className = 'main-container'>
          <AddContents newContent={this.addNewContent}/>
          <ContentsList posts={this.state.posts}
          />
        </div>
      </div>
    );
  }
}

export default App;
