// Dependencies
import React from 'react';
import { Route } from 'react-router-dom';
import styled from 'styled-components';

// Components
import HomePage from './HomePage';
import PostsView from './PostsView';
// import PostView from './PostView';

const AppContainer = styled.div`
	max-width: 880px;
	min-height: 100vh;
	background: #f1f8ff;
	margin: 0 auto;
`;

const App = () => {
	return (
		<AppContainer>
			<Route exact path="/" component={HomePage} />
			<Route exact path="/posts" component={PostsView} />
			{/* <Route path={`/posts/:id`} component={PostView} /> */}
		</AppContainer>
	);
};

export default App;
