import React, { Component } from "react";
import axios from "axios";
// components
import SearchBar from "./components/SearchBar";
import Posts from "./components/Posts";
// styles
import "./styles/App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: []
    };
  }
  // fetch data from database localhost:5000
  componentDidMount() {
    this.getPostsList();
  }
  getPostsList() {
    axios
      .get("http://localhost:5000/api/posts")
      .then(response => {
        // console.log("response: ", response.data);
        this.setState({ posts: response.data });
      })
      .catch(error => {
        console.error(error);
      });
  }

  render() {
    console.log("state: ", this.state);
    return (
      <div className="App">
        <SearchBar />
        {/* render Posts here */}
        <Posts posts={this.state.posts} />
      </div>
    );
  }
}

export default App;
