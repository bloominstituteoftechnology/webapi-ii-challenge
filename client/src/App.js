import React, { Component } from "react";
import axios from "axios";
import "./App.css";

class App extends Component {
	constructor() {
		super();
		this.state = {
			posts: [],
		};
	}

	componentDidMount() {
		axios
			.get("http://localhost:5000/api/posts/")
			.then(res => {
				console.log("Server Response :", res);
				this.setState({ posts: res.data.posts });
			})
			.catch(err => {
				console.log("Server Error: ", err);
			});
	}

	render() {
		return (
			<div className="App">
				{this.state.posts.map(post => (
					<div className="post-container" key={post.id}>
						<br />
						<h3>Post #{post.id}</h3>
						<h4>{post.title}</h4>

						<p>{post.contents}</p>
						<h6>Created on {post.created_at}</h6>
						<br />
					</div>
				))}
			</div>
		);
	}
}

export default App;
