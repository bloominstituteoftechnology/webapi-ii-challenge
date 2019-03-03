import React from "react"
import {Col, Row, Button, Form, FormGroup, Label, Input, FormText} from "reactstrap"
import "./form.css"

class PostForm extends React.Component{
       constructor(props){
           super(props)
           this.state={
             "title": "",
            "contents": "",
            "created_at": "",
            "updated_at": ""
           
             

           }


       }

       changeHandler=(event)=>{
        
         this.setState({[event.target.name]:event.target.value})

       }
       clickHandler=(event)=>{
        event.preventDefault();
        this.props.submitFn(this.state.title,this.state.contents,this.state.created_at,this.state.updated_at)
        this.setState({title:"",contents:"",created_at:"",updated_at:""})
        

       }
       render(){
          return(
             <div className="PostForm">
             <Form className="Form">
               <Row form>
                  <Col md={2}>
                      <FormGroup>
                        <Label for="title"></Label>
                        <Input type="text" name="title" id="title" placeholder="enter title" onChange={this.changeHandler}/>
                      </FormGroup>
                  </Col>
               </Row>
               <Row>   
                  <Col md={4}>
                     <FormGroup>
                        <Label for="contents"></Label>
                        <Input type="textarea" name="contents" id="contents" placeholder="enter contents" onChange={this.changeHandler} />
                     </FormGroup>
                  </Col>
               </Row> 

               <Row>   
                  <Col md={2}>
                     <FormGroup>
                        <Label for="created_at"></Label>
                        <Input type="text" name="created_at" id="created_at" placeholder="Created At" onChange={this.changeHandler} />
                     </FormGroup>
                  </Col>
  
                  <Col md={2}>
                     <FormGroup>
                        <Label for="updated_at"></Label>
                        <Input type="text" name="updated_at" id="updated_at" placeholder="Updated At" onChange={this.changeHandler} />
                     </FormGroup>
                  </Col>
               </Row> 

               <Button onClick={this.clickHandler}>Add Post</Button>

            </Form>

             </div>   
          )


       }


}
export default PostForm