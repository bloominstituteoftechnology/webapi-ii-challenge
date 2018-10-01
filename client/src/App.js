import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import axios from "axios";

class App extends Component {
	constructor() {
		super();
		this.state = {
			posts: []
		};
	}

	componentDidMount() {
		axios
			.get("http://localhost:8000/api/posts/")
			.then(response => {
				this.setState({ posts: response.data });
			})
			.catch(err => console.log(err));
	}

	render() {
		return (
			<div className="App">
				{this.state.posts.map(posts => (
					<div className="posts-container" key={posts.id}>
						<p className="title"> "{posts.title}"</p>
						<br />
						<p className="guess">{posts.contents}?</p>
					</div>
				))}
				<div />
			</div>
		);
	}
}

export default App;
