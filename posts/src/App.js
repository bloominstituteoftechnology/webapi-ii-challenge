import React, { Component } from "react";
import "./App.css";
import axios from "axios";
import PostList from './components/PostList';

class App extends Component {
  state = {
    posts: [],
    error: null
  };

  componentDidMount() {
    axios
      .get("http://localhost:9000/api/posts")
      .then(res => {
        console.log(res);
        this.setState({ posts: res.data })
      })
      .catch(err => this.setState({ error: err }));
  }

  render() {
    return (
      <div className="App" style={{ margin: "20px 0" }}>
        {
          this.state.error ?
          <div>
            <h4>{this.state.error.message}</h4>
          </div>
          : <PostList posts={this.state.posts} />
        }
      </div>
    );
  }
}

export default App;
