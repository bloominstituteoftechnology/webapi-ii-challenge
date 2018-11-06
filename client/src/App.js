import React, { Component } from "react";
import axios from "axios";
import "./App.css";

class App extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
      titleText: "",
      contentText: "",
      viewPosts: false,
      addPost: false
    };
  }

  componentDidMount() {
    setTimeout(this.updateNotes(), 1000)
  }

  updateNotes = () => {
    axios.get("http://localhost:9000/api/posts").then(res => {
      this.setState({
        data: res.data
      });
    });
  };

  changeHandler = ev => {
    ev.preventDefault();
    this.setState({
      [ev.target.name]: ev.target.value
    });
  };

  addPost = () => {
    const post = {
      title: this.state.titleText,
      contents: this.state.contentText
    };
    axios.post("http://localhost:9000/api/posts", post);
  };

  deletePost = (ev, id) => {
    ev.preventDefault();
    axios
      .delete(`http://localhost:9000/api/posts/${id}`)
      .then(this.updateNotes());
  };

  render() {
    return (
      <div className="App">
        <button
          onClick={() => this.setState({ viewPosts: !this.state.viewPosts })}
        >
          View Posts
        </button>
        <button onClick={() => this.setState({ addPost: !this.state.addPost })}>
          Add a post
        </button>
        <div className={this.state.viewPosts ? "viewPostsVisible" : "hidden"}>
          {this.state.data.length < 1 ? (
            <h2>Loading</h2>
          ) : (
            this.state.data.map(post => {
              return (
                <div>
                  <h2>{post.title}</h2>
                  <p>{post.contents}</p>
                  <button
                    onClick={ev => {
                      this.deletePost(ev, post.id);
                    }}
                  >
                    Delete Post
                  </button>
                </div>
              );
            })
          )}
        </div>
        <div className={this.state.addPost ? "addPostVisible" : "hidden"}>
          <form onSubmit={() => this.addPost()}>
            Title
            <input
              onChange={ev => this.changeHandler(ev)}
              name="titleText"
              value={this.state.titleText}
              placeholder="Enter post title"
            />
            Contents
            <textarea
              onChange={ev => this.changeHandler(ev)}
              name="contentText"
              value={this.state.contentText}
              placeholder="Enter post contents!"
            />
            <button type="submit">Submit Post</button>
          </form>
        </div>
      </div>
    );
  }
}

export default App;
