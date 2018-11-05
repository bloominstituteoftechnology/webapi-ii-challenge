import React from 'react'

const Posts = props => {
    return (
        <div>
            {props.posts.map(post => {
                return (
                    <div key={post.id}>
                        <h2>Title: {post.title}</h2>
                        <p>Contents: {post.contents}</p>
                    </div>
                )
            })}
        </div>
    )
}

export default Posts
