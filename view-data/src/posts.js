import React from 'react'; 
import { Post } from './post.js'; 

export default class Posts extends React.Component{
   constructor(props){
       super(props); 
   }

    render(){
        return(
            <div>
                {this.props.post.map( post => {
                    console.log(post.title)
                    return (<Post key={post.id} title={post.title} contents={post.contents} />)
                })}
                
            </div> 
        )
    }
}