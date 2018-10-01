import React, { Component } from 'react';
import axios from 'axios';
import { Route, Link } from 'react-router-dom';

import Post from './components/Post.js';
import SinglePost from './components/SinglePost.js';
import CreatePost from './components/CreatePost.js';

import styled from 'styled-components';

const AppDiv = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	animation-name: fade-in-anim;
	animation-duration: 2s;
	animation-fill-mode: forwards;

	header {
		display: flex;
		flex-direction: column;
		margin-bottom: 10px;

		h1, a {
			text-align: center;
		}

		.links {
			* {
				margin: 0 10px;
			}

			a {
				text-decoration: none;
				border:1px solid black;
				border-radius: 5px;
				color: black;
				padding: 5px;

				&:hover {
					background-color: black;
					color: white;
				}
			}
		}
	}
`;

class App extends Component {
	state = {
		users: [],
	};

	getPosts = () => {
		const URL = 'http://localhost:5000';
		axios.get(`${ URL }/api/posts`)
			.then(res => {
				this.setState({
					users: res.data
				});
			})
			.catch(err => console.error(err))
	};

	componentDidMount() {
		this.getPosts();
	};

	render() {
		const { users } = this.state;

		return (
			<AppDiv>
				<header>
					<h1>Posts</h1>

					<div className = 'links'>
						<Link to = '/'>Home</Link>
						<Link to = '/create'>Create New Post</Link>
					</div>
				</header>

				<Route exact path = '/' render = { () => users.map((user, i) => <Post key = { i } user = { user } />) } />

				<Route path = '/post/:id' render = { props =>  <SinglePost history = { props.history } getPosts = { this.getPosts } id = { props.match.params.id } /> } />

				<Route path = '/create' render = { props => <CreatePost getPosts = { this.getPosts } history = { props.history } /> } />
			</AppDiv>
		);
	}
}

export default App;
