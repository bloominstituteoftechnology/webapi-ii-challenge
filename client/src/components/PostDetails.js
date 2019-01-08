import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

/***************************************************************************************************
 ********************************************** Styles *********************************************
 **************************************************************************************************/
const DivWrapper = styled.div``;

/***************************************************************************************************
 ********************************************* Component *******************************************
 **************************************************************************************************/
const PostDetails = props => {
  return (
    <DivWrapper>
      <h2>{props.title}</h2>
      <p>{props.content}</p>
    </DivWrapper>
  );
};

PostDetails.propTypes = {
  title: PropTypes.string,
  content: PropTypes.string
};

export default PostDetails;
