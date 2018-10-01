import React from 'react';
import { Card, CardHeader, CardBody, CardTitle, CardText, Button, CardFooter } from 'mdbreact';

function Post(props) {
    const bgPink = {backgroundColor: '#ec407a'}
    return (
        <div>
            <Card style={{marginTop: '1rem'}}>
                
                <CardBody>
                    <CardTitle color='pink lighten-2' tag="h3">{props.post.title}</CardTitle>
                    <CardText>{props.post.contents}</CardText>
                    <Button color="pink lighten-2">Edit</Button>
                    <Button color="danger">Delete</Button>
                </CardBody>
                <CardFooter color="pink lighten-1">{props.post.created_at}</CardFooter>
            </Card>
        </div>
    )
};

export default Post;