import React from 'react';
import {Link} from 'react-router-dom';
const Post=(props)=><div className='card'>
<Link to={`/${props.data.id}`}>
<p>{props.data.title}</p><p>{props.data.contents}</p></Link></div>

export default Post;