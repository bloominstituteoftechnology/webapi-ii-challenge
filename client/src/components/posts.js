import React from 'react';
import Post from './post.js';
import axios from 'axios';

class Posts extends React.Component{
    constructor(){
        super();
        this.state={
            posts:[]
        }
    }
    componentDidMount(){
        axios.get('http://localhost:9000/posts').then(res=>this.setState({posts:res.data})).catch(err=>console.log(err));
    }
    render() {
        return (
        <div>
            {this.state.posts.length>0?this.state.posts.map((e,i)=><Post data={e} key={i}/>):null}
        </div>
        )
    }
}
export default Posts;