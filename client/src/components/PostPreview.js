import React from 'react';
import styled from 'styled-components';
// import PropTypes from 'prop-types';

/***************************************************************************************************
 ********************************************** Styles *********************************************
 **************************************************************************************************/
const DivWrapper = styled.div`
  background-color: black;
  color: white;
`;

/***************************************************************************************************
 ********************************************* Component *******************************************
 **************************************************************************************************/
const PostPreview = props => {
  return (
    <DivWrapper>
      <h1>This is the PostPreview Component</h1>
    </DivWrapper>
  );
};

// PostPreview.propTypes = {
//   propertyName: PropTypes.string
// }

export default PostPreview;
