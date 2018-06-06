import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios'; 
import { Card, CardTitle, CardText } from 'reactstrap';



class App extends Component {
  state = {
    posts: [],
    
    dummy: {
      title: "gone with the wind",
      contents:"frankly my dear i dont give a dam"
    }
  }
    
componentWillMount(){
  axios
    .get('http://localhost:5000/api/posts/')
    .then( result =>{
      this.setState({ posts: result.data });
    });
}

addDummy = () => {
  axios
    .post('http://localhost:5000/api/posts/', this.state.dummy )
    .then(result =>{
      
      axios
        .get('http://localhost:5000/api/posts/' )
        .then( result => {
        
          this.setState({ posts: result.data });
        });
    })
  
}
render() {
  return (
    <div className="App">
      <input type='text' />
      <button onClick={this.addDummy}>Guess who said that!!!commit </button> 
      <div className='row boxes'>
      {this.state.posts.map( element => {
        return (
          <div className="col-12 col-sm-6 col-md-4" key={element.id}>
          <Card className="card">
           <CardText> {element.title} </CardText>
           < CardTitle> {element.contents}</ CardTitle>
            </Card>
          </div>
          
          
          
        ) 
       })}
       
      </div>
    </div>  
   
     );
  }
}
export default App;
