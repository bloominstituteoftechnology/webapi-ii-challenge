import React from 'react'

import PostView from './PostView'

class PostList extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            posts: [],
        }
    }

    render(){
        return(
            <div className="App">
                {this.props.posts.map(post => {
                    return (

                        <PostView handleDeletePost={this.props.handleDeletePost} post={post} 
                            handleUpdatePost={this.props.handleUpdatePost}
                        />
                    
                    )
                })}
            </div>
        )
    }
}

export default PostList

    {/* <div className="card" key={post.id}>
                            <p>{post.title}</p>
                            <h2>{post.contents}</h2>
                        </div> */}