import React from 'react';
import styled from 'styled-components';
// import PropTypes from 'prop-types';
import PostPreview from './PostPreview';

/***************************************************************************************************
 ********************************************** Styles *********************************************
 **************************************************************************************************/
const DivWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
`;
/***************************************************************************************************
 ********************************************* Component *******************************************
 **************************************************************************************************/
const ListPosts = props => {
  console.log(props.posts);
  return (
    <DivWrapper>
      {props.posts.map(post => {
        return (
          <PostPreview
            key={post.key}
            title={post.title}
            content={post.contents}
            ellipsis={'. . .'}
            maxTitleLimit={20}
            maxContentLimit={180}
          />
        );
      })}
    </DivWrapper>
  );
};

// ListPosts.propTypes = {
//   propertyName: PropTypes.string
// }

export default ListPosts;
