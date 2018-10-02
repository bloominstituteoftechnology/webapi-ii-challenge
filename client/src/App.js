import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from "axios";
import { Jumbotron } from "reactstrap";
URL = "http://localhost:3333/posts";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: []
    };
  } //{ title: 'Loading', contents: 'Here I Come!' }
  componentDidMount(){
    axios.get("http://localhost:3333/posts")
    .then((response)=>
      this.setState({posts:response.data.posts}));
      
    }
  
  render(){
    return (
      
      
         
        this.state.posts.map((post, index)=>{
          return(
        
            <div className="App">
        <header className="App-header">
          <h1 className="App-title">Node Express</h1>
        </header>
        <p className="lead">{post.contents}</p>
      
    )
  })
}
</div>
    );
}
} 

export default App;
