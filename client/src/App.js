import React, { Component } from 'react';
import './App.css';
import axios from 'axios';

const URL = 'http://localhost:5555/api/posts';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      posts:[{}],
    }
  }
  

  componentWillMount(){
    let promise = axios.get(URL);
    promise
      .then(res=>{
        return this.setState(res.data)
      })
      .catch(err=>{
        console.log(err);
      })


  }
  render() {
    console.log("Posts", this.state.posts);
    return (
      <ul className="App">
        <h1>WhoSaidThat? LOTR edition</h1>
        {this.state.posts.map(element=>{
          return(
            <div>
            <li key={element.id}>
            <p className="title-name">Title:{element.title}</p>
            <p className="contents-name">Content:{element.contents}?</p>
          </li>
          </div>
          )
         
        })}
       </ul>
    );
  }
}

export default App;
