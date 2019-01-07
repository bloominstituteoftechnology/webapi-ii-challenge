import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
// import PropTypes from 'prop-types';

/***************************************************************************************************
 ********************************************** Styles *********************************************
 **************************************************************************************************/
const LinkPostPreview = styled(Link)`
  color: black;
  text-decoration: none;
`;

const DivPostPreview = styled.div`
  width: 300px;
  height: 200px;
  margin: 10px;
  background-color: white;
  padding: 0 20px;
  border: 1px solid rgb(151, 151, 151);
  text-shadow: none;

  &:hover {
    transition: all 0.2s ease-in;
    background-color: rgb(43, 193, 196);
    text-shadow: 1px 1px rgba(0, 0, 0, 0.5);
    color: white;
  }
`;
const H3PostTitle = styled.h3`
  border-bottom: 1px solid rgb(151, 151, 151);
  padding-bottom: 10px;
  margin: 10px 0;
`;
const PostContent = styled.p`
  margin: 10px 0;
`;
const SpanEllipsis = styled.span`
  color: gray;
`;

/***************************************************************************************************
 ********************************************** Methods ********************************************
 **************************************************************************************************/
const shortenText = (text, limitCharsDisplayed) => {
  let modifiedText = text;
  if (modifiedText.length > limitCharsDisplayed) {
    modifiedText = modifiedText.slice(0, limitCharsDisplayed);
    if (modifiedText.indexOf(' ') >= 0) {
      modifiedText = modifiedText.slice(0, modifiedText.lastIndexOf(' '));
      modifiedText = modifiedText.trim() + ' ';
    }
  }
  return modifiedText;
};

/***************************************************************************************************
 ********************************************* Component *******************************************
 **************************************************************************************************/
const PostPreview = props => {
  return (
    <DivPostPreview>
      <H3PostTitle>
        {shortenText(props.title, props.maxTitleLimit)}{' '}
        {props.title.length > props.maxTitleLimit && (
          <SpanEllipsis>{props.ellipsis}</SpanEllipsis>
        )}
      </H3PostTitle>
      <PostContent>
        {shortenText(props.content, props.maxContentLimit)}{' '}
        {props.content.length > props.maxContentLimit && (
          <SpanEllipsis>{props.ellipsis}</SpanEllipsis>
        )}
      </PostContent>
    </DivPostPreview>
  );
};

// PostPreview.propTypes = {
//   propertyName: PropTypes.string
// }

export default PostPreview;
