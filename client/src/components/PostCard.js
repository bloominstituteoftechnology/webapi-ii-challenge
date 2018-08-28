import React from 'react';
import { Post } from './styled';

const PostCard = ({
                  id,
                  title,
                  showing,
                  contents,
                  created_at,
                  updated_at,
                  show,
                  del
                }) => {
  return(
    <Post onClick={show}>
      <span onClick={del}>X</span>
      <p>id: {id}</p>
      <p>title: {title}</p>
      {showing &&
        <React.Fragment>
          <p>content: {contents}</p>
          <p>created: {created_at}</p>
          <p>updated: {updated_at}</p>
        </React.Fragment>
      }
    </Post>
  );
}

export default PostCard;
