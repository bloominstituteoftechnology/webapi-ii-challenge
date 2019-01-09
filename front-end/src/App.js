import React, { Component } from "react";
import "./App.css";
import axios from "axios";

class App extends Component {
  constructor() {
    super();
    this.state = {
      posts: []
    };
  }

  componentDidMount() {
    axios
      .get("http://localhost:5001/api/posts/")
      .then(response => {
        console.log(response);
        this.setState({ posts: response });
      })
      .catch(err => console.log(err));
  }

  render() {
    return (
      <div className="App">
        <h1>This is the data.</h1>
        {this.state.posts.map(post => (
          <div>
            <h1>Hello!</h1>
            <h1>{post.title}</h1>
            <h2>{post.contents}</h2>
          </div>
        ))}
      </div>
    );
  }
}

export default App;
