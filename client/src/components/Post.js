import React from 'react';
import { Link } from 'react-router-dom';

import styled from 'styled-components';

const PostDiv = styled.div`
	border: 1px solid black;
	border-radius: 5px;
	width: 80%;
	margin: 10px;
	padding: 5px;
`;

const Post = props => {
	const { id, title, contents, created_at, updated_at } = props.user;

	return(
		<PostDiv>
			<p>ID: { id }</p>
			<p><Link to = { `/post/${ id }` }>Quote: { title }</Link></p>
			<p>{ contents }</p>
			<p>Created: { created_at }</p>
			<p>Updated: { updated_at }</p>
		</PostDiv>
	)
}

export default Post;
