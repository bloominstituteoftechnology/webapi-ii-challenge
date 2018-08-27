import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios'

class App extends Component {
  state = {
    posts: [],
    loading: true
  }

  componentDidMount (){
		axios.get(`http://localhost:9000/api/posts`)
			.then(res => {
				this.setState({posts: res.data, loading: false})
			})
			.catch(err => {
				console.log(err);
			})
  }
  render() {
    return (
      <div className="App">
        {this.state.loading 
          ? <h1>loading...</h1>
          : this.state.posts.map(post => {
            return (
              <div key={post.id}>
                <h1>{post.title}</h1>
                <p>{post.content}</p>
              </div>
            )
          })}
      </div>
    );
  }
}

export default App;
