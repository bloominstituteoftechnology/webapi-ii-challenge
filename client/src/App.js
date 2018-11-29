import React, { Component } from "react";
import axios from "axios";
import { Route, withRouter } from "react-router-dom";

import Nav from "./components/Nav";
import Form from "./components/Form";
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
      .get("http://localhost:3000/api/posts")
      .then(res => {
        this.setState({ posts: res.data });
      })
      .catch(err => {
        console.log(err);
      });
  }

  addPost = newPost => {
    axios
      .post("http://localhost:3000/api/posts", newPost)
      .then(res => {
        this.setState({ posts: res.data });
      })
      .catch(err => {
        console.log(err);
      });

    this.props.history.push("/");
  };

  deletePost = id => {
    axios
      .delete(`http://localhost:3000/api/posts/${id}`)
      .then(res => {
        this.setState({ posts: res.data });
      })
      .catch(err => {
        console.log(err);
      });

    this.props.history.push("/");
  };

  render() {
    return (
      <div className="App">
        <Nav />
        <Route
          exact
          path="/"
          render={props => <Posts {...props} posts={this.state.posts} />}
        />
        <Route
          path="/add-post"
          render={props => (
            <Form {...props} posts={this.state.posts} add={this.addPost} />
          )}
        />
      </div>
    );
  }
}

export default withRouter(App);
