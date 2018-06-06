import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';



class App extends Component {
  state = {
    posts: [],
    
    dummy: {
      title: "gone with the wind",
      contents:"frankly my dear i dont give a dam"
    }
  }
    
componentWillMount(){
  axios
    .get('http://localhost:5000/api/posts/')
    .then( result =>{
      this.setState({ posts: result.data });
    });
}

addDummy = () => {
  axios
    .post('http://localhost:5000/api/posts/', this.state.dummy )
    .then(result =>{
      
      axios
        .get('http://localhost:5000/api/posts/' )
        .then( result => {
        
          this.setState({ posts: result.data });
        });
    })
  
}
render() {
  return (
    <div className="App">
      {this.state.posts.map( element => {
       return <div key={element.id}>{element.title}</div>
       })}
      <input type='text' />
      <button onClick={this.addDummy}>Guess that </button>
    </div>
   
     );
  }
}
export default App;
