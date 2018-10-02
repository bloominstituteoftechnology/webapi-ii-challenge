import React, { Component } from "react";
import "../components.css";
import axios from "axios";
import { Route, Switch, withRouter } from "react-router-dom";
import Form from "../Form";
import Post from "../Post";
import SideBar from "../SideBar";
import PostList from "../PostList";
class App extends Component {
  state = {
    posts: [],
    title: "",
    contents: ""
  };

  // component did mount and refecth the Posts from the api
  componentDidMount() {
    this.refetchPosts();
  }

  // refetch Posts
  refetchPosts = () => {
    axios
      .get(`http://localhost:8000/api/posts`)
      .then(response => {
        this.setState({ posts: response.data });
      })
      .catch(error => console.log(error));
  };

  // handle input change
  handleInputChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  // handle form submit
  handleFormSubmit = e => {
    e.preventDefault();

    const newPost = {
      title: this.state.title,
      contents: this.state.contents
    };

    axios
      .post(`http://localhost:8000/api/posts`, newPost)
      .then(response => {
        this.refetchPosts();
        this.setState({
          title: "",
          contents: ""
        });
      })
      .catch(error => console.log(error));

    this.props.history.push("/");
  };

  render() {
    return (
      <div className="container">
        <SideBar />

        <Route
          exact
          path="/"
          render={props => <PostList posts={this.state.posts} />}
        />

        <Switch>
          <Route
            path="/posts/add"
            render={props => (
              <Form
                type={"new"}
                title={this.state.title}
                contents={this.state.contents}
                handleFormSubmit={this.handleFormSubmit}
                handleInputChange={this.handleInputChange}
              />
            )}
          />

          <Route
            path="/posts/:id"
            render={props => (
              <Post {...props} refetchPosts={this.refetchPosts} />
            )}
          />
        </Switch>
      </div>
    );
  }
}

export default withRouter(App);
