import React, { Component } from 'react';
import axios from 'axios';
import logo from './logo.svg';
import './App.css';

import Postlist from './components/post/Postlist';
class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            posts: []
        }
    }

    componentDidMount() {
        this.getPosts();

    }

    getPosts() {
        axios.get('http://localhost:5000/api/posts')
            .then(response => {
                console.log(response);
                this.setState({posts: response.data});
            }).catch(error => {
            console.log(error);
        })
    }

    removePost = (event) => {

        axios.delete(`http://localhost:5000/api/posts/${event.target.id}`)
            .then(response => {
                console.log(response);
                this.getPosts();
            })
            .catch(error =>{
                console.log(error.error);
            })
    };

    render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
          <h1>PostList-Title</h1>
          <Postlist posts={this.state.posts} click={this.removePost}/>
      </div>
    );
  }
}

export default App;
