import React from 'react';

class Update extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			title    : this.props.info.title,
			contents : ''
		};
	}

	handleChanges = (e) => {
		e.persist();
		this.setState({
			[e.target.name]: e.target.value
		});
	};

	change = (e) => {
		this.props.changeAnswer(this.state, this.props.info.id);
	};

	render() {
		return (
			<form onSubmit={this.change}>
				<input
					type="text"
					name="contents"
					value={this.state.contents}
					placeholder="Answer"
					onChange={this.handleChanges}
				/>
				<button>Submit Answer</button>
			</form>
		);
	}
}

export default Update;
