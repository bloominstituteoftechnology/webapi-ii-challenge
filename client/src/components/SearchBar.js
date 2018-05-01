import React, { Component } from "react";

// material components
import Paper from "material-ui/Paper";
// styles
import "../styles/SearchBar.css";

// allow users to search for different posts
// implement autocomplete
// use search icon or enter to submit

class SearchBar extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		return (
			<Paper className="SearchBar" zDepth={2}>
				<h3>search bar here</h3>
			</Paper>
		);
	}
}

export default SearchBar;
