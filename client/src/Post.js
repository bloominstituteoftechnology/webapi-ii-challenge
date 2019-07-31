import React from "react";
import { Card, CardText, CardBody,
   CardTitle,  Button } from 'reactstrap';

import "./card.css"   ;

class Post extends React.Component{


       deletePost=()=>{
          this.props.deleteHandler(this.props.post.id)
       }
    render(){
      return(
         <div>


      <Card className="cards" body inverse style={{ backgroundColor: '#333', borderColor: '#333' }}>
        <CardBody>
          <CardTitle>{ this.props.post.title}</CardTitle>
          <CardText>{ this.props.post.contents}</CardText>
        </CardBody>
        <CardBody>
          <CardText>{  this.props.post.created_at}</CardText>
        </CardBody>
        <CardBody>
          <CardText>{  this.props.post.updated_at}</CardText>
        </CardBody>
        <Button onClick={this.deletePost}>Delete</Button>
        
      </Card>
  

         </div>
         


      )



    }   


}

export default Post
     