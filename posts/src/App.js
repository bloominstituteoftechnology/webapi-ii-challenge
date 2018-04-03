import React from 'react';

import PostsList from './Components/PostsList';
import PostsListWrapper from './Components/PostsListWrapper';

import Wrapper from './AppPrimatives/Wrapper';

export default () => {
  
    return (
      <Wrapper>
       <PostsListWrapper> 
        <PostsList />
       </PostsListWrapper> 
      </Wrapper>
    );
  
}


