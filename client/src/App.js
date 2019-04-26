import React from 'react';
import axios from 'axios';

import './App.css';

import QuoteCard from './components/QuoteCard';

class App extends React.Component {
	constructor() {
		super();
		this.state = {
			quoteInfo : [],
			errors    : ''
		};
	}

	componentDidMount() {
		axios
			.get(`http://localhost:5000/api/posts`)
			.then((res) => {
				console.log(res);
				this.setState({ quoteInfo: res.data });
			})
			.catch((err) => {
				this.setState({ errors: err });
			});
	}

	changeAnswer = (answer, id) => {
		// console.log('changeAnser()', answer, id);
		axios
			.put(`http://localhost:5000/api/posts/${id}`, answer)
			.then((res) => {
				// this.setState({ quoteInfo:  });
			})
			.catch((err) => {
				alert(err);
			});
	};

	deleteQuote = (id) => {
		console.log(id);
		// axios
		// 	.delete(`http://localhost:5000/api/posts/${id}`)
		// 	.then((res) => console.log(res))
		// 	.catch((err) => alert(err));
	};

	render() {
		if (!this.state.quoteInfo) {
			return <h2>Loading...</h2>;
		}
		return (
			<div className="App">
				<h1>Lord of the Rings - Quotes</h1>
				{this.state.quoteInfo.map((obj) => (
					<QuoteCard info={obj} changeAnswer={this.changeAnswer} deleteQuote={this.deleteQuote} />
				))}
			</div>
		);
	}
}

export default App;
