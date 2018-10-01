import React, { Component } from "react";
import axios from "axios";
// import logo from './logo.svg';
import Posts from "./components/Posts";
import { Route } from "react-router-dom";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: []
    };
  }

  componentDidMount() {
    axios
      .get("http://localhost:8000/api/posts/")
      .then(res => {
        console.log("THIS IS RESPONSE", res.data);
        this.setState({ posts: res.data });
      })
      .catch(err => {
        console.log(err);
      });
  }
  render() {
    return (
      <div className="App">
        <Route
          exact
          path="/posts"
          render={() => <Posts posts={this.state.posts} />}
        />
      </div>
    );
  }
}

export default App;
