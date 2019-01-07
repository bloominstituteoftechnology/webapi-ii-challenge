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
const ListPosts = props => {
  return (
    <DivWrapper>
      <h1>This is the ListPosts Component</h1>
    </DivWrapper>
  );
};

// ListPosts.propTypes = {
//   propertyName: PropTypes.string
// }

export default ListPosts;
