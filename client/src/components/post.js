import React from 'react';

const Post=(props)=><div className='card'><p>{props.data.title}</p><p>{props.data.contents}</p></div>

export default Post;