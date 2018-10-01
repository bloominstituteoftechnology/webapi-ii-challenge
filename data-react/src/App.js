import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios'

class App extends Component {

  state = {
    posts: [{title: 'test'}]
  }

  componentDidMount(){
    axios
      .get('http://localhost:3030/api/posts/')
        .then(response => {
          console.log('data:', response);
          this.setState({posts: response.data})
        })
        .catch(error => {
          console.log(error);
        })
  }

  // componentDidMount() {
  //   axios
  //     .get('http://localhost:5001/friends')
  //     .then(response => {
  //       this.setState(() => ({ friends: response.data }));
  //     })
  //     .catch(error => {
  //       console.error('Server Error', error);
  //     });
  // }

  render() {
    console.log('State:', this.state.posts);
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <div>
        {this.state.posts.map(item => {
          return (<p> {item.title }</p>)
        })}

        </div>
      </div>
    );
  }
}

export default App;
