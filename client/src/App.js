import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import axios from "axios";
import { BrowserRouter as Switch, Route, NavLink } from "react-router-dom";
import Posts from "./components/Posts";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: []
    };
  }

  componentDidMount() {
    axios
      .get("http://localhost:4000/api/posts")
      .then(response => {
        this.setState(() => ({ posts: response.data }));
      })
      .catch(error => {
        console.error("Server Error", error);
      });
  }

  render() {
    return (
      <div className="App">
        <Route
          path="/"
          render={props => <Posts {...props} posts={this.state.posts} />}
        />
      </div>
    );
  }
}

export default App;
