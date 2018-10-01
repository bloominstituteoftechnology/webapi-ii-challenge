import React, { Component } from 'react';
import axios from 'axios';

class App extends Component {
	state = {
		users: [],
	};

	componentDidMount() {
		const URL = 'http://localhost:5000/';
		axios.get(`${ URL }`)
			.then(res => {
				console.log(res);
				this.setState({
					users: res.data
				});
			})
			.catch(err => console.error(err))
	}

	render() {
		return (
			<div className = 'App'>
				{ this.state.users.map((user, i) => <div key = { i }>{ user.title }</div>) }
			</div>
		);
	}
}

export default App;
