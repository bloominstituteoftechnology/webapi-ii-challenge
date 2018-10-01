import React, { Component } from 'react';
import axios from 'axios';

import styled from 'styled-components';

const PostDiv = styled.div`
	border: 1px solid black;
	border-radius: 5px;
	width: 80%;
	margin: 10px;
	animation-name: grow-anim;
	animation-duration: 1s;
	animation-fill-mode: forwards;

	* {
		margin: 10px;
	}

	.title {
		background-color: gray;
		text-align: center;
		border-bottom: 1px solid black;
		display: flex;
		justify-content: center;
		margin: 0;
		padding: 10px 5px;

		* {
			margin: 0;
		}
	}

	.button-wrapper {
		display: flex;
		justify-content: center;

		.delete-btn {
			border-radius: 5px;
			padding: 5px 10px;
			background: red;
			color: white;

			&:hover {
				background: black;
				color: red;
				cursor: pointer;
			}
		}
	}
`;

export default class SinglePost extends Component {
	state = {
		user: {},
	}

	deletePost = e => {
		e.preventDefault();
		const URL = 'http://localhost:5000';
		axios.delete(`${ URL }/api/posts/${ this.state.user.id }`)
			.then(res => this.props.getPosts())
			.then(() => this.props.history.push('/'))
			.catch(err => console.error(err))
	}

	componentDidMount() {
		const URL = 'http://localhost:5000';
		axios.get(`${ URL }/api/posts/${ this.props.id }`)
			.then(res => this.setState({
				user: res.data[0],
			}))
			.catch(err => console.error(err))
	}

	render() {
		const { id, title, contents, created_at, updated_at } = this.state.user;

		return(
			<PostDiv>
				<div className = 'title'>Quote: { title }</div>
				<p>ID: { id }</p>
				<p>{ contents }</p>
				<p>Created: { created_at }</p>
				<p>Updated: { updated_at }</p>

				<div className = 'button-wrapper'>
					<button
						className = 'delete-btn'
						onClick = { this.deletePost }
					>Delete</button>
				</div>
			</PostDiv>
		);
	}
}
