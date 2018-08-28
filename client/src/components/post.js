import React from 'react';

const Post=(props)=><div className='card'><p>{props.data.title}</p><p>{props.data.contents}</p>
<i class="fas fa-trash-alt" onClick={()=>props.delete(props.data.id)}></i></div>

export default Post;