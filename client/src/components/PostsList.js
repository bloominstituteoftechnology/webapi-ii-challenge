import React from 'react';
import Post from './Post';

export default class PostsList extends React.Component {
    render() {
        return(
            <div className='posts-list'>
                {this.props.posts.map(post => {
                    return(
                        <Post key={post.id} post={post} />
                    )
                })}
            </div>
        )
    }
}