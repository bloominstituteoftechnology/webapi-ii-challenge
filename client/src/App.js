import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import { Route } from 'react-router-dom';
import Post from './Post';
import PostForm from './PostForm';
import ViewPost from './ViewPost';

class App extends Component {
  // constructor(props) { //only use this if you're using redux or props from somewhere
  //   super(props);
  //   this.state = {
  //     posts: [],
  //     title: '',
  //     contents: ''
  //   };
  // }

  state = {
    posts: [],
    title: '',
    contents: ''
  };

  componentDidMount() {
    axios
      .get('http://localhost:8000/api/posts')
      .then((response) => this.setState({ posts: response.data }))
      .catch((err) => {
        console.log(err);
      });
  }

  updateState = (response) => {
    this.setState({ posts: response.data });
  };

  render() {
    return (
      <div className="App">
        {this.state.posts.map((post) => <Post post={post} />)}
        <PostForm />
        {/* <Route path="/posts/:id" component={ViewPost} /> */}
        <Route
          path="/posts/:id"
          render={(props) => (
            <ViewPost
              {...props}
              updateState={this.updateState}
              title={this.state.title}
              contents={this.state.contents}
            />
          )}
        />
      </div>
    );
  }
}

export default App;
