import React from 'react'
import Post from './Post';
import './Post.css'
const postlist = props => {

    return(
        <div className='Post'>
            <ul>
            {props.posts.map((post) => {
                return <Post post={post}/>
            })}
            </ul>
        </div>
    );
};
export default postlist;