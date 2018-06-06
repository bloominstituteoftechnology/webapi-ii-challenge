import React, { Component } from 'react';
import './App.css';
import axios from 'axios';

const URL = 'http://localhost:5555/api/posts';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      posts:[{}],
      title:'',
      contents:''
    }
  }
  

  componentWillMount(){
    let promise = axios.get(URL);
    promise
      .then(res=>{
        return this.setState(res.data)
      })
      .catch(err=>{
        console.log(err);
      })

  }

  
  handleChange = (e) =>{
    this.setState({[e.target.name]:e.target.value})
  }

  buttonSubmit = () =>{
    const { title, contents } = this.state;
    axios.post(URL, { title, contents })
      .then(res =>{
        this.setState({friends: res.data})
      })
      .catch(err =>{
        console.log(err);
      });
  }
  render() {
    console.log("Posts", this.state.posts);
    return (
      <div>
      <ul className="App">
        <h1>WhoSaidThat? LOTR edition</h1>
        <div className="form-input">
          <label>Quote:</label>
            <input 
              type="text" 
              onChange={this.handleChange}
              className="input-field" 
              placeholder="Gandalf rocks!!!!!"
              name="title"
              value={this.state.title}
              /><br />
          <label>Say Who?:</label>
               <input 
              type="text" 
              onChange={this.handleChange}
              className="input-field" 
              placeholder="Frodo has the ring!!!!!"
              name="contents"
              value={this.state.contents}
              /><br />
            <button className="submit-button" onClick={this.buttonSubmit}>My Precious</button>
        </div>
        {this.state.posts.map(element=>{
          return(
            <div>
            <li key={element.id}>
            <p className="title-name">Title:{element.title}</p>
            <p className="contents-name">Content:{element.contents}?</p>
          </li>
          </div>
          )
         
        })}
       </ul>
       </div>
    );
  }
}

export default App;
