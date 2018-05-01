import React, { Component } from "react";
import uuid from "uuid-v4";

class Post extends Component {
	constructor(props) {
		super(props);
		this.state = {
			post: this.props.post
		};
	}

	render() {
		// console.log("POST PROPS: ", this.props);
		// console.log("POST STATE: ", this.state);
		return [
			<h3 key={uuid()}>{this.state.post.title}</h3>,
			<h3 key={uuid()}>{this.state.post.contents}</h3>
		];
	}
}

export default Post;
