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
  // render() {
  //   return (
  //     <div className="App">
  //       <header className="App-header">
  //         <img src={logo} className="App-logo" alt="logo" />
  //         <h1 className="App-title">Welcome to React</h1>
  //       </header>
  //       <p className="App-intro">
  //         To get started, edit <code>src/App.js</code> and save to reload.
  //       </p>
  //     </div>
  //   );
  
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
      <button onClick={this.addDummy}>Add Dummy Object</button>
    </div>
   
     );
  }
}
export default App;
