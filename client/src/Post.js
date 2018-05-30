import React, { Component } from 'react';
import { Card, CardBody, CardTitle, CardText } from 'reactstrap';

export default class Note extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id: this.props.id,
            title: this.props.title,
            body: this.props.body
        };
    }
  
    render() {
      return (
          <Card className="rounded-0"> 
              <CardBody>
                  <CardTitle className="text-left card-title font-weight-bold">
                  {this.state.title}
                  </CardTitle>
                  <CardText className="text-left">
                      {this.state.body}
                  </CardText>
              </CardBody>
          </Card>
      )
    }
}