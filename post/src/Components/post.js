import React, { Component } from 'react';
import axios from 'axios';
import { Card, CardText, CardBody,
    CardTitle, CardSubtitle, Button,Label,FormGroup,Input } from 'reactstrap';


class Post extends Component{
    state={
        title:'',
        contents:''
    }
render(){
    console.log(this.props)
    return(<React.Fragment>
    <div>
      <Card>
        <CardBody>
          <CardTitle>{this.props.title}</CardTitle>
         
          <FormGroup>
          <Label for="exampleText">{this.props.content}</Label>
          <Input type="textarea" name="text" id="exampleText" />
        </FormGroup>
          <Button>Button</Button>
        </CardBody>
      </Card>
    </div>
   </React.Fragment> )
}



}
export default Post