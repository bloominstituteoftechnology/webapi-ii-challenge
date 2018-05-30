import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import { Table } from 'reactstrap';

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
	<div>
		{this.state.posts.map(post => {
			return (
				<Table striped>
					<tbody>
						<tr>
							<td>{post.title}</td>
							<td>{post.contents}</td>
						</tr>
					</tbody>
				</Table>
			);
	
		})}
	</div>    
      </div>
    );
  }
}

export default App;
