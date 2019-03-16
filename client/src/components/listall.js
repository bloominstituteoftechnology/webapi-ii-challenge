import React, { Component } from 'react';
import axios from 'axios';



export default class Listall extends Component{
  state = {
    data:null
  }
  
  componentDidMount(){
    this.callBackendAPI()
    .then(res => this.setState({data:res.express}))
    .catch(err => console.log(err));
  }

  callBackendAPI = async () =>{
    
    const res = axios.get('http://localhost:4000/api')
    console.log(res)
    const body = await res.json();
    if (res.status !== 200) {
      throw Error(body.message) 
    }else{
    return body;
    };
  }
  render(){
    console.log(this.state)
    return(
      
    <div>
     <h2>this is my Listall component</h2>
    {/* {this.state.data.map(post =>{
      return(
      <div>
        
        <div>{post.title}</div>
        <div>{post.contents}</div>
      </div>
      )

      
    })} */}
    </div>
    )
  }


}
