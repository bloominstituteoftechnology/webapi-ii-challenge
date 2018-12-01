import React, { Component } from 'react';
import axios from 'axios';
import Post from './Post.js'

class Posts extends Component   {
    render()    {
        return(
            <div>
                <br/>
                {this.props.posts.map((post)    =>  {
                    return  <Post key={post.id} contents={post.contents} title={post.title} id={post.id} getPosts={this.props.getPosts}/>
                })}
            </div>
        )
    }
}
export default Posts;
