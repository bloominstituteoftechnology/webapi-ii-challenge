import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import HomePage from './components/HomePage.js'

class App extends Component {

  constructor() {
    super();
        this.state = {
          posts: [

          ]
        };

      }
  componentDidMount(){
    const URL = "http://localhost:3005/api/posts";
axios
.get(URL)
.then(response =>{
  console.log(response);
  this.setState( ()  => ({posts:response.data}));
})
.catch(err=>{
  console.log(err);
})


  }
  render() {
    return(
      <div>
        <HomePage posts={this.state.posts}/>
      </div>

    )


  }
}

export default App;
