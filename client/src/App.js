import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';

class App extends Component {
	constructor(props) {
		super(props);
		this.state= {
			posts:[]
		};
	}

componentDidMount() {
	this.gatherPosts();
}

gatherPosts = () => {
	axios.get('http://localhost:5555/api/posts')
		.then(response => {
			console.log (response)
			this.setState({ posts: response.data.posts });
		})
		.catch(error => console.log(error));
}
	
render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
	</p>
	<div>
		{this.state.posts.map(post => {
			return (
				<ul>
					<li>{post.title}: {post.contents}</li>
				</ul>
			);
		})}
	</div>    
      </div>
    );
  }
}

export default App;
