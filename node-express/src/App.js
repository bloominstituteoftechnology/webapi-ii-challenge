import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import { fetchPosts, addPost } from './actions';
import NoteForm from './components/NoteForm';
import NoteList from './components/Notelist';
import { connect } from 'http2';

class App extends Component {
  state = {
    titleInput: '',
    contentsInput: ''
  }
  
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    posts: state.posts
  }
}

export default connect(mapStateToProps, { fetchPosts, addPost })(App);
