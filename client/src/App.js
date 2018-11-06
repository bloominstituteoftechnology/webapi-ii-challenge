import React, { Component } from "react";
import "./App.css";
import axios from "axios";

class App extends Component {
  constructor() {
    super();
    this.state.posts = [];
  }

  // componentDidMount() {
  //   axios
  //     .get(api/posts)
  //     .then(response => this.setState({ notes: response.data }))
  //     .catch(error => console.log(error));
  // }

  render() {
    return <div className="App" />;
  }
}

export default App;
