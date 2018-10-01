import React, { Component } from "react";
import axios from "axios";
import { Route, Link } from "react-router-dom";

import Posts from "./components/Posts.js";
import Post from "./components/Post.js";

import "./App.css";

class App extends Component {
  state = {
    users: []
  };

  componentDidMount() {
    const URL = "http://localhost:8000";
    axios
      .get(`${URL}/api/posts`)
      .then(res => {
        this.setState({
          users: res.data
        });
      })
      .catch(err => console.error(err));
  }

  render() {
    return (
      <div>
        <header>
          <h1>Posts</h1>
          <Link to="/">Home</Link>
        </header>

        <Route
          exact
          path="/"
          render={() =>
            this.state.users.map((user, i) => <Posts key={i} user={user} />)
          }
        />

        <Route
          path="/post/:id"
          render={props => <Post id={props.match.params.id} />}
        />
      </div>
    );
  }
}

export default App;
