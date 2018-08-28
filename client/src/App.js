import React, { Component } from 'react';
import axios from 'axios'; 

 const url = "http://localhost:9000/api/posts"

class App extends Component {
  constructor(){
    super(); 
    this.state={
      posts: []
    }
  }
  
  componentDidMount(){
     axios 
    .get(url)
    .then(response => {
      this.setState({
        posts: response.data
      })
    })
    .catch(err => console.log(err))
    
  }

  render() {
    return (
      <div className="App">
        {this.state.posts.map(user =>{
          <div key={user.id}>
          <p>{user.title}</p>
          <p>{user.contents}</p>
          </div>
        })}
      </div>
    );
  }
}

export default App;
