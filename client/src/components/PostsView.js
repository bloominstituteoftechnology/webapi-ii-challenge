// Dependencies
import React, { Component } from 'react';
import { connect } from 'react-redux';
// import styled from 'styled-components';
// Components
import Post from './Post';
// Actions
import { getPosts } from '../actions';
// Styles
import { StatusMessage } from '../styles/SharedStyles';

class PostsView extends Component {
	componentDidMount() {
		this.props.getPosts();
	}

	render() {
		return (
			<div className="posts-container">
				<h1>Posts!</h1>
				{this.props.gettingPosts ? (
					<StatusMessage>Loading posts...</StatusMessage>
				) : this.props.posts.length ? (
					<div className="Posts">
						{this.props.posts.map(post => (
							<Post key={post.id} post={post} />
						))}
					</div>
				) : !this.props.error ? (
					<StatusMessage>No posts to display.</StatusMessage>
				) : (
					<StatusMessage error>{this.props.error}</StatusMessage>
				)}
			</div>
		);
	}
}

const mapStateToProps = state => ({
	posts: state.posts,
	gettingPosts: state.gettingPosts,
	error: state.error
});

export default connect(
	mapStateToProps,
	{ getPosts }
)(PostsView);
