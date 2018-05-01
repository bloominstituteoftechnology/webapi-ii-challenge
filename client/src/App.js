import React, { Component } from "react";
import axios from "axios";
// material components
import RaisedButton from "material-ui/RaisedButton";
import Paper from "material-ui/Paper";
// components
import Posts from "./components/Posts";
// styles
import logo from "./logo.svg";
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
        {/* render Posts here */}
        <Posts posts={this.state.posts} />
      </div>
    );
  }
}

export default App;
