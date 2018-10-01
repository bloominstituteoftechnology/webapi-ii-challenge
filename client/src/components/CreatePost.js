import React from 'react';
import axios from 'axios';

import styled from 'styled-components';

const Form = styled.form`
	display: flex;
	flex-direction: column;
	border: 1px solid black;
	border-radius: 5px;
	justify-content: center;
	align-items: center;
	width: 50%;
	padding: 10px;
	animation-name: fade-in-anim;
	animation-duration: 2s;
	animation-fill-mode: forwards;

	input, textarea {
		padding: 5px;
		border-radius: 5px;
		margin-bottom: 10px;
		width: 50%;
	}

	textarea {
		height: 100px;
	}

	button {
		padding: 5px 10px;
		border-radius: 5px;
		background: white;

		&:hover {
			background: black;
			color: white;
			cursor: pointer;
		}
	}
`;

export default class CreatePost extends React.Component {
	state = {
		title: '',
		contents: '',
		errorMsg: '',
	};

	handleInputChange = e => {
		this.setState({
			[e.target.name]: e.target.value,
		});
	};

	handleSubmit = e => {
		e.preventDefault();

		if (!this.state.title || !this.state.contents) {
			return this.setState({
				...this.state,
				errorMsg: 'All fields must be filled out.',
			})
		}

		const newPost = {
			title: this.state.title,
			contents: this.state.contents,
		};

		const URL = 'http://localhost:5000';
		axios.post(`${ URL }/api/posts`, newPost)
			.then(res => this.props.getPosts())
			.then(() => this.props.history.push('/'))
			.catch(err => console.error(err))
	}

	render() {
		return(
			<Form onSubmit = { this.handleSubmit }>
				Quote:
				<input
					placeholder = 'Enter quote'
					name = 'title'
					value = { this.state.title }
					onChange = { this.handleInputChange }
				/>

				Contents:
				<textarea
					placeholder = 'Enter content'
					name = 'contents'
					value = { this.state.contents }
					onChange = { this.handleInputChange }
				/>

				{ this.state.errorMsg && <p>{ this.state.errorMsg }</p> }

				<button type = 'submit'>Submit</button>
			</Form>
		);
	}
};
