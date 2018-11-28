import React, { Component } from 'react';
import './App.css';
import axios from 'axios';


class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      posts: [],
      loading: true
    }
  }
  
  componentDidMount() {
    axios
      .get(`http://localhost:4001/api/posts/`)
      .then(response => {
          console.log(response)
      })
      .catch(err => {
        console.log('Error')
      });
  }

  render() {
    return (
      <div>
      </div>
    );
  }
}

export default App;
