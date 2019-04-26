import React from 'react';

class Add extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			title    : '',
			contents : ''
		};
	}

	handleChanges = (e) => {
		e.persist();
		this.setState({
			[e.target.name]: e.target.value
		});
	};

	addQuote = (e) => {
		this.props.add(this.state);
	};

	render() {
		return (
			<form onSubmit={this.addQuote}>
				<input
					type="text"
					name="title"
					value={this.state.title}
					placeholder="Who said it?"
					onChange={this.handleChanges}
				/>
				<input
					type="text"
					name="contents"
					value={this.state.contents}
					placeholder="Enter Quote"
					onChange={this.handleChanges}
				/>
				<button>Add Quote</button>
			</form>
		);
	}
}

export default Add;
