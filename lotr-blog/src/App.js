import React from 'react';
import axios from 'axios'
import {Route, NavLink} from 'react-router-dom'
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      posts: []
    }
  }
  
  componentDidMount() {
    axios.get("http://localhost:4000/api/posts")
      .then(res => {
        console.log(res.data)
        this.setState({
          posts: res.data
        })
      })
      .catch(err => {
        console.log("Error: ", err)
      })
  }

  render(){
    return (
      <div className="App">
        <header className="App-header">
          <h1>LOTR Blog</h1>
        </header>
      </div>
    );
  }
}

export default App;
