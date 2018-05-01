import React,{Component} from "react";
import { find } from '../data/db.js';

class PostList extends Component {
  //console.log("Props", props);
  // map over peopleProp return a dom elment for each person name in list

  constructor(props){
    super(props);
    this.state = {
      posts: [],
    }
  }

  componentDidMount(){ // lifecycle method defacto.
  console.log('CDM--find', find)
  this.setState({ posts: find() });// everything on state is mutable.
  }

render(){
console.log('from peopleList', this.state.posts)
  return (

    <div>
      {this.state.posts.map(p => <div>{p.index} {p.contents}</div>)}
    </div>
  )
}
};

export default PostList;
