import React from 'react';
import styled from 'styled-components';

/***************************************************************************************************
 ********************************************** Styles *********************************************
 **************************************************************************************************/
const DivWrapper = styled.div`
  width: 85%;
  margin-left: 250px;
  display: flex;
  justify-content: center;
`;

const H1WelcomeMessage = styled.h1``;

/***************************************************************************************************
 ********************************************* Component *******************************************
 **************************************************************************************************/
const HomeView = props => {
  return (
    <DivWrapper>
      <H1WelcomeMessage>Welcome to the posts app</H1WelcomeMessage>
    </DivWrapper>
  );
};

export default HomeView;
