// Dependencies
import React from 'react';
// import styled from 'styled-components';

const Post = props => {
	return (
		<div className="post">
			<h2>{props.post.title}</h2>
			<h2>{props.post.contents}</h2>
		</div>
	);
};

export default Post;
