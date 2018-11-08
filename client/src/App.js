import React, { Component } from "react";
import axios from "axios";
import { Route, Switch } from "react-router-dom";

import "./App.css";
import PostsList from "./components/PostsList";
import PostForm from "./components/PostForm";
import Sidebar from "./components/Sidebar";
import PostView from "./components/PostView";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      posts: [],
      fPosts: []
    };
  }

  componentDidMount() {
    this.fetchPosts();
  }

  componentDidUpdate() {
    this.fetchPosts();
  }

  //Gets all Posts from database
  fetchPosts = () => {
    axios
      .get("https://node3-practice.herokuapp.com/api/posts")
      .then(res => this.setState({ posts: res.data }))
      .catch(err => console.log(err));
  };

  //Edits posts, takes an object as a parameter
  editPost = obj => {
    const index = this.state.posts.findIndex(post => post.id === obj.id);
    console.log(index);

    axios
      .put(`https://node3-practice.herokuapp.com/api/posts/${obj.id}`, obj)
      .then(res => {
        this.setState({
          posts: this.state.posts.splice(index, 1, res.data)
        });
        console.log("edited", res);
      })
      .catch(err => console.dir(err));
  };

  //Deletes post by id
  deletePost = id => {
    axios
      .delete(`https://node3-practice.herokuapp.com/api/posts/${id}`)
      .then(res => {
        console.log("deleted", res);
      })
      .catch(err => console.dir(err));
  };

  // //Search
  // search = e => {
  //   const arr = this.state.Posts.filter(n => {
  //     if (n.title === `${e.target.value}`) {
  //       return n;
  //     }
  //   });
  //   return this.setState({ fPosts: arr });
  // };

  render() {
    return (
      <div className="App">
        <div className="home-view">
          <div>
            <Sidebar search={this.search} />
          </div>

          <Switch>
            <Route
              exact
              path="/"
              render={props => (
                <PostsList
                  {...props}
                  posts={
                    this.state.fPosts.length > 0
                      ? this.state.fPosts
                      : this.state.posts
                  }
                  editPost={this.editPost}
                  deletePost={this.deletePost}
                />
              )}
            />

            <Route
              exact
              path="/create"
              render={props => <PostForm {...props} posts={this.state.posts} />}
            />

            <Route
              exact
              path="/:id"
              render={props => (
                <PostView
                  {...props}
                  posts={this.state.posts}
                  editPost={this.editPost}
                  editHandler={this.editHandler}
                  handleChange={this.handleChange}
                  deletePost={this.deletePost}
                />
              )}
            />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
