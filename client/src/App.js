import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import { Route } from 'react-router-dom';
import Posts from './Posts';
import ViewPost from './ViewPost';

class App extends Component {
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
        <Route
          exact
          path="/posts/"
          render={(props) => <Posts {...props} posts={this.state.posts} />}
        />
        {/* <Route path="/posts/:id" component={ViewPost} /> */}
        <Route
          path="/posts/:id"
          render={(props) => <ViewPost {...props} updateState={this.updateState} />}
        />
      </div>
    );
  }
}

export default App;
