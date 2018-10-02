import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import axios from "axios";

class App extends Component {
	constructor() {
		super();
		this.state = {
			posts: [],
			title: "",
			contents: ""
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

	onChange = event => {
		event.preventDefault();
		this.setState({
			[event.target.name]: event.target.value
		});
	};

	addPost = event => {
		event.preventDefault();
		const post = { title: this.state.title, contents: this.state.contents };
		console.log(post);
		axios.post("http://localhost:8000/api/posts/", post).then(response => {
			console.log(response);
			this.setState({
				...this.state,
				posts: [...this.state.posts, response.data]
			});
		});
	};

	render() {
		return (
			<div className="App">
				<form>
					<input
						onChange={this.onChange}
						name="title"
						value={this.state.title}
						type="text"
						placeholder="title..."
					/>
					<input
						onChange={this.onChange}
						value={this.state.contents}
						name="contents"
						type="text"
						placeholder="contents.."
					/>
					<button onClick={this.addPost}>Submit Post</button>
				</form>
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
