import React, { Component } from 'react';
import axios from 'axios';
import { Route, Link } from 'react-router-dom';

import Post from './components/Post.js';
import SinglePost from './components/SinglePost.js';

import styled from 'styled-components';

const AppDiv = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;

	header {
		h1 {
			text-align: center;
		}
	}
`;

class App extends Component {
	state = {
		users: [],
	};

	componentDidMount() {
		const URL = 'http://localhost:5000';
		axios.get(`${ URL }/api/posts`)
			.then(res => {
				this.setState({
					users: res.data
				});
			})
			.catch(err => console.error(err))
	}

	render() {
		return (
			<AppDiv>
				<header>
					<h1>Posts</h1>
					<Link to = '/'>Home</Link>
				</header>

				<Route exact path = '/' render = { () => this.state.users.map((user, i) => <Post key = { i } user = { user } />) } />

				<Route path = '/post/:id' render = { props =>  <SinglePost id = { props.match.params.id } /> } />
			</AppDiv>
		);
	}
}

export default App;
