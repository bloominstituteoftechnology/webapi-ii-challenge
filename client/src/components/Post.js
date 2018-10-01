import React from 'react';
import { Link } from 'react-router-dom';

import styled from 'styled-components';

const PostDiv = styled.div`
	border: 1px solid black;
	border-radius: 5px;
	width: 80%;
	margin: 10px;

	* {
		margin: 10px;
	}

	.title {
		text-align: center;
		border-bottom: 1px solid black;
		display: flex;
		justify-content: center;
		margin: 0;

		* {
			margin: 0;
		}

		a {
			background-color: gray;
			color: black;
			text-decoration: none;
			display: block;
			width: 100%;
			padding: 10px 5px;

			&:hover {
				color: white;
				background-color: #444;
			}
		}
	}
`;

const Post = props => {
	const { id, title, contents, created_at, updated_at } = props.user;

	return(
		<PostDiv>
			<div className = 'title'><Link to = { `/post/${ id }` }>Quote: { title }</Link></div>
			<p>ID: { id }</p>
			<p>{ contents }</p>
			<p>Created: { created_at }</p>
			<p>Updated: { updated_at }</p>
		</PostDiv>
	)
}

export default Post;
