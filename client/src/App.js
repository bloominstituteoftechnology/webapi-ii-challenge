import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios'; 


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [] 
  }
  
} 

  updateState(data) {
    this.setState({data});
    console.log(data);
}

 componentDidMount() {
   axios.get('http://localhost:5000/api/posts')
   .then ( response =>  
   { console.log(response)
     this.setState({posts: response.data})}) 
  
   .catch(err => {
    console.log('Error App.js')
  });
  //  fetch ('http://localhost:5000/api/posts')
  //  .then ( data => this.updateState({data}))
 }


  render() {
    return (
      <div className="App">
        <div className='app-container'>
          {this.state.posts.map(post =>{ 
            return <p>{post.title}</p>
          })} 
        </div>
      </div>
    );
  }
}

export default App;
