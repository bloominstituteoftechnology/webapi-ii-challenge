import React from 'react';
import axios from 'axios';

import './App.css';

import QuoteCard from './components/QuoteCard';
import Add from './components/Add';

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

	// componentDidUpdate(prevState) {
	// 	if(this.state.quoteInfo.length !=== )
	// }

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

	add = (quote) => {
		axios
			.post(`http://localhost:5000/api/posts`, quote)
			.then((res) => {
				console.log(res);
			})
			.catch((err) => {
				alert(err);
			});
	};

	deleteQuote = (id) => {
		console.log(id);
		axios
			.delete(`http://localhost:5000/api/posts/${id}`)
			.then((res) => this.componentDidMount())
			.catch((err) => alert(err));
	};

	render() {
		if (!this.state.quoteInfo) {
			return <h2>Loading...</h2>;
		}
		return (
			<div className="App">
				<h1>Lord of the Rings - Quotes</h1>
				<Add add={this.add} />
				<div className="cards-wrapper">
					{this.state.quoteInfo.map((obj) => (
						<QuoteCard info={obj} changeAnswer={this.changeAnswer} deleteQuote={this.deleteQuote} />
					))}
				</div>
			</div>
		);
	}
}

export default App;
