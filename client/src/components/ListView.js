import React, { Component } from 'react';
import axios from 'axios'


class ListView extends Component {
    constructor(){
        super()
        this.state = {
            posts : []
        }
    }

    componentDidMount(){
        axios.get('http://localhost:3334/api/posts').then(response=> {
            console.log(response.data)
            this.setState(()=>({posts:response.data.posts}))
        })
        
    }
  render() {
      if (!this.state.posts.length){
          return <h5>Fetching data</h5>
      }
    return (
      <div >
        <ul>
            {this.state.posts.map(post => <li key={post.id}>{post.title}</li>)}
        </ul>
      </div>
    );
  }
}

export default ListView;
