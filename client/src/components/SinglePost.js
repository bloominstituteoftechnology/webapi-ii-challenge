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
`;

export default class SinglePost extends Component {
	state = {
		user: {},
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
			</PostDiv>
		);
	}
}
