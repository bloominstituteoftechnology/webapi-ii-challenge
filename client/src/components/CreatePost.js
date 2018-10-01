import React from 'react';
import axios from 'axios';

export default class CreatePost extends React.Component {
	state = {
		title: '',
		contents: '',
	};

	handleInputChange = e => {
		this.setState({
			[e.target.name]: e.target.value,
		});
	};

	handleSubmit = e => {
		e.preventDefault();
		const newPost = {
			[e.target[0].name]: e.target[0].value,
			[e.target[1].name]: e.target[1].value,
		};

		const URL = 'http://localhost:5000';
		axios.post(`${ URL }/api/posts`, newPost)
			.then(res => this.props.getPosts())
			.then(() => this.props.history.push('/'))
			.catch(err => console.error(err))
	}

	render() {
		return(
			<form onSubmit = { this.handleSubmit }>
				Title:
				<input
					placeholder = 'Enter title'
					name = 'title'
					value = { this.state.title }
					onChange = { this.handleInputChange }
				/>

				Contents:
				<input
					placeholder = 'Enter content'
					name = 'contents'
					value = { this.state.contents }
					onChange = { this.handleInputChange }
				/>

				<button type = 'submit'>Submit</button>
			</form>
		);
	}
};
