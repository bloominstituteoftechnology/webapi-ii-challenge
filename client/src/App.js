import React, { Component } from "react";
import axios from "axios";
import { Route } from "react-router-dom";
import Posts from "./components/Posts";
class App extends Component {
  constructor() {
    super();
    this.state = {
      posts: []
    };
  }
  componentDidMount() {
    axios
      .get("http://localhost:4010/api/posts")
      .then(response => this.setState({ posts: response.data }))
      .catch(err => console.log(err));
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
