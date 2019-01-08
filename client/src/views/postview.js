import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { getPost, deletePost } from '../store/actions';
import PostDetails from '../components/PostDetails';

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

const DivPostPageDisplay = styled.div``;

const HeaderPost = styled.header`
  display: flex;
  justify-content: flex-end;
`;

const NavPostLinks = styled.nav`
  margin: 20px;
`;

const LinkEdit = styled(Link)`
  pointer-events: ${props => props.showdeletemodel === 'true' && 'none'};
`;

const ButtonLink = styled.button`
  border: none;
  background-color: inherit;
  font-size: 20px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
  text-decoration: none;
  color: black;
  user-select: none;
  outline: none;

  &:not(:first-child) {
    margin-left: 40px;
  }

  &:hover {
    text-decoration: ${props =>
      props.showdeletemodel === 'false' && 'underline'};
    cursor: ${props => props.showdeletemodel === 'false' && 'pointer'};

    /* Edit Note Button */
    color: ${props =>
      props.edit && props.showdeletemodel === 'false' && 'rgb(43, 193, 196)'};

    /* Delete Note Button */
    color: ${props =>
      props.remove && props.showdeletemodel === 'false' && 'red'};
  }
`;

/***************************************************************************************************
 ********************************************* Component *******************************************
 **************************************************************************************************/
class PostView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      PostNavItems: {
        edit: 'edit',
        delete: 'remove'
      }
    };
  }

  componentDidMount() {
    this.props.getPost(this.props.match.params.id);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.deletingPost !== this.props.deletingPost) {
      if (!this.props.deletingPost) {
        this.props.history.push(this.props.viewPostsLink);
      }
    }
  }

  deletePost = (e, postId) => {
    e.preventDefault();
    this.props.deletePost(postId);
  };

  render() {
    return (
      <DivPageWrapper>
        {this.props.fetchingPost ? (
          <H2LoadingMessage>Loading Post...</H2LoadingMessage>
        ) : (
          <DivPostPageDisplay>
            <HeaderPost>
              <NavPostLinks>
                <LinkEdit
                  to={`${this.props.editPostLink}/${this.props.post.id}`}
                >
                  <ButtonLink edit={this.state.PostNavItems.edit}>
                    {this.state.PostNavItems.edit}
                  </ButtonLink>
                </LinkEdit>
                <ButtonLink
                  remove={this.state.PostNavItems.delete}
                  onClick={e => this.deletePost(e)}
                >
                  {this.state.PostNavItems.delete}
                </ButtonLink>
              </NavPostLinks>
            </HeaderPost>
            <PostDetails
              title={this.props.post.title}
              content={this.props.post.contents}
            />
          </DivPostPageDisplay>
        )}
      </DivPageWrapper>
    );
  }
}

PostView.propTypes = {
  fetchingPost: PropTypes.bool
};

const mapStateToProps = state => {
  return {
    post: state.post,
    fetchingPost: state.fetchingPost,
    deletingPost: state.deletingPost,
    error: state.error
  };
};

export default connect(
  mapStateToProps,
  { getPost, deletePost }
)(PostView);
