import React, { Component } from 'react';
import axios from 'axios';

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
			<div>
				<p>ID: { id }</p>
				<p>Quote: { title }</p>
				<p>{ contents }</p>
				<p>Created: { created_at }</p>
				<p>Updated: { updated_at }</p>
			</div>
		);
	}
}
