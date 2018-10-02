import React from 'react';
import PropTypes from 'prop-types';
import Post from './Post';

export default class PostList extends React.Component{
    render(){
        return(
            <div>
                {this.props.posts.map((post)=>{
                    return(
                        <Post key={post.id} post={post} />
                    )
                })}
            </div>
        )
    }
}

PostList.propType = {
    posts: PropTypes.arrayOf({
        post: PropTypes.shape({
            id: PropTypes.number,
            title: PropTypes.string,
            content: PropTypes.string,
            created_at: PropTypes.string,
            updated_at: PropTypes.string
        })
    })
}