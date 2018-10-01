// Dependencies
import React from 'react';
import { Link } from 'react-router-dom';
// import styled from 'styled-components';
// Styles
//import {} from '../styles/SharedStyles';

const HomePage = () => {
	return (
		<div className="home-container">
			<h1>Guess Who Said It!</h1>
			<Link to="/posts">POSTS</Link>
		</div>
	);
};

export default HomePage;
