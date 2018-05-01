import React, { Component } from 'react';
import './App.css';
import axios from "axios";

class App extends Component {
  constructor() {
    super();
    this.state = {
      posts: [],
      mounted: false,
    }
  }

  componentDidMount() {
    this.setState({
      mounted: true,
    })
    this.fetchData();
   };


  fetchData = () => {
    axios.get("http://localhost:5000/api/posts")
    .then(response => {
      console.log(response)
    })
    .catch(err => {
      console.log("There was an error fetching posts")
    })
  }



  render() {
    return (
      <div>
      lolh
      </div>
    );
  }
}

export default App;
