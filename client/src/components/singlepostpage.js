import React from 'react';
import {withRouter} from 'react-router-dom'
import axios from 'axios';
class SinglePostPage extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            id:'',
            title:'',
            contents:''
        }
    }
    componentDidMount() {
        axios.get(`http://localhost:9000/posts/${this.props.match.params.id}`)
        .then(res=>this.setState({id:res.data[0].id,title:res.data[0].title,contents:res.data[0].contents},()=>console.log(this.state)))
        .catch(err=>console.log(err));
    }
    delete=()=>{
        axios.delete(`http://localhost:9000/posts/${this.state.id}`)
        .then(res=>this.props.history.push('/')).catch(err=>console.log(err));
    }
    handleInputChange=(e)=>{
        this.setState({[e.target.name]:e.target.value});
    }
    edit=()=>{
        const editedObj={
            title:this.state.title,
            contents:this.state.contents
        }
        axios.put(`http://localhost:9000/posts/${this.state.id}`,editedObj)
        .then(res=>this.props.history.push('/'))
        .catch(err=>console.log(err));
    }
    render() {
        return(
        <div className='card'>
            <p>{`Post #${this.state.id}`}</p>
            <p>{this.state.title}</p>
            <p>{this.state.contents}</p>
            <i className="fas fa-trash-alt" onClick={()=>this.delete()}></i>
            <input type='text' name='title' placeholder='Edit post title' value={this.state.title} onChange={this.handleInputChange}/>
            <input type='text' name='contents' placeholder='Edit post contents' value={this.state.contents} onChange={this.handleInputChange}/>
            <button type='button' className='btn waves-effect waves-light' onClick={()=>this.edit()}>Edit Post</button>
        </div>
        )
    }
}
export default withRouter(SinglePostPage);