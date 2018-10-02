import  React from 'react';
import './Post.css';

const Posts =(props) =>{
    return (
        <div className="posts-wrapper">
            <h1>Your Posts:</h1>
            <div className="post-card-container">
                {props.posts.map(post => (
                    <div className="post-card" 
                        key={post.id}
                        onClick={() => props.history.push(`/post/${post.id}`)}>
                        <h2 className="post-title">{post.title}</h2>
                        <p className="post-contents">{post.contents}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Posts;