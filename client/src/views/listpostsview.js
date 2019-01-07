import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { getPosts } from '../store/actions';
import ListPosts from '../components/ListPosts';

/***************************************************************************************************
 ********************************************** Styles *********************************************
 **************************************************************************************************/
const DivPageWrapper = styled.div`
  width: 85%;
  margin-left: 250px;
`;

const H2LoadingMessage = styled.h2`
  margin: 85px 0 0 0;
`;

const H2PageTitle = styled.h2`
  margin: 85px 10px 10px 10px;
`;

/***************************************************************************************************
 ********************************************* Component *******************************************
 **************************************************************************************************/
class ListPostsView extends Component {
  componentDidMount() {
    this.props.getPosts();
  }

  render() {
    return (
      <DivPageWrapper>
        {this.props.fetchingPosts ? (
          <H2LoadingMessage>Loading Posts...</H2LoadingMessage>
        ) : (
          <div>
            <H2PageTitle>List of Posts:</H2PageTitle>
            <ListPosts
              posts={this.props.posts}
              postsLink={this.props.postsLink}
            />
          </div>
        )}
      </DivPageWrapper>
    );
  }
}

ListPostsView.propTypes = {
  getPosts: PropTypes.func
};

const mapStateToProps = state => {
  return {
    posts: state.posts,
    fetchingPosts: state.fetchingPosts,
    error: state.error
  };
};

export default connect(
  mapStateToProps,
  { getPosts }
)(ListPostsView);
