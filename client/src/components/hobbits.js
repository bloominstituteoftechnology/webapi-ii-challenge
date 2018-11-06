import React, { Component } from 'react';
import axios from 'axios';

import HobbitList from './hobbitList';

class Hobbits extends Component{
    constructor(){
        super();
        this.state={
            posts:[]
        }
    }


    componentDidMount(){
        this.getData();
    }

    getData= () =>{
        axios
            .get('http://localhost:9003/api/posts')
            .then(response =>{
                console.log('response', response.data);
                this.setState({posts: response.data})
            })
            .catch(err => {
                console.log(err)
            })
    };

    render(){
        return(
            <div>
                <HobbitList posts={this.state.posts}/>
            </div>
        )
    }
}

export default Hobbits;