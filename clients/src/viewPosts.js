import React,{Component} from 'react';
import {connect} from 'react-redux'
import { fetchPostActionCreator} from './allActions'

import { PostsReducer } from './postsReducers';


class ViewPosts extends Component{
    constructor(props){
         super(props)
         this.state={

         }
    }
componentDidMount = ()=>{
    this.props.fetchPostActionCreator()
}
render (){
    console.log(this.props.posts)
return (
    <div className=" PostsSection">{ this.props.posts.map((post,i) => { return (
                                                <div  className="Post">                                              
                                                   <div key={i + post.title}> <span>Title</span>: {post.title}</div> 
                                                   <div key={i + 'post.contents'}> <span>Contents</span>: {post.contents}</div>
                                                </div>)
                                          })}
 </div>
)
}

}
const mapStateToProps =(state) => {
    console.log('state',state.PostsReducer);
 return {
     posts: state.PostsReducer
 }
}
export default connect(mapStateToProps, { fetchPostActionCreator })( ViewPosts);



