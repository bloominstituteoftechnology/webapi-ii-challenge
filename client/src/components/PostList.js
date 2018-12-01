import React from 'react'

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
                        <div className="card" key={post.id}>
                            <p>{post.title}</p>
                            <h2>{post.contents}</h2>
                        </div>
                    )
                })}
            </div>
        )
    }
}

export default PostList

