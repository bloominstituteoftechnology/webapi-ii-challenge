import React from 'react';
import axios from 'axios';
import styled from 'styled-components';

const Input=styled.input`
width:100%
max-width: 400px
margin: 0 auto;
`
class NewPostHandler extends React.Component{
    constructor(){
        super();
        this.state={
            title:'',
            contents:''
        }
    }
    handleInputChange=(e)=>{
        this.setState({[e.target.name]:e.target.value});
    }
    submitPost=()=>{
        const Post={
            title:this.state.title,
            contents:this.state.contents
        }
        axios.post('http://localhost:9000/posts',Post).then(res=>window.location.reload()).catch(err=>console.log(err));
    }
    render() {
        return(
            <div>
                <Input type='text' name='title' placeholder='Enter post title' value={this.state.title} onChange={this.handleInputChange}/>
                <Input type='text' name='contents' placeholder='Enter post contents' value={this.state.contents} onChange={this.handleInputChange}/>
                <button className='btn waves-effect waves-light' onClick={()=>this.submitPost()}>Submit New Post</button>
            </div>
        )
    }
}
export default NewPostHandler;