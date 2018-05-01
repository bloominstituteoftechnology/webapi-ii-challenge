import React, { Component } from "react";

class Post extends Component {
	constructor(props) {
		super(props);
		this.state {
			post: this.props.post
		}
	}

	render() {
		console.log("POST PROPS: ", this.props);
		console.log("POST STATE: ", this.state);
		return <h3>Post here</h3>
	}
}