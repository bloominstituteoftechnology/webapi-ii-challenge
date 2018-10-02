import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import Styled from 'styled-components';
import { Modal, ModalContainer, ModalButtons, ButtonDanger, Button, ModalBody, ModalFooter, ModalHeader } from 'mdbreact';

const Wrapper = Styled.div`
    max-width: 880px;
    margin: 100px auto;
`;

class PostPage extends Component {
    state = {
        post: {},
        modal14: false,
    };

    componentDidMount() {
        const post = this.props.posts.find(
            post => post.id.toString() === this.props.match.params.id
        );
        console.log('POST', this.props.match.params.id);

        this.setState({post});
    };

    handleDelete = () => {
        this.props.handleDelete(this.state.post.id);
        this.props.history.push('/');
    };

    toggle = e => {
        e.preventDefault();
        this.setState({modal14: !this.state.modal14});
    };

    render() {
        return (
            <Wrapper>
                    <NavLink to="/form" onClick={event => this.props.handleUpdate(event, this.state.post.id)} style={{color: "#4a494a" }}>Edit</NavLink>
                    <NavLink to="/" onClick={this.toggle} style={{color: "#4a494a" }}>Delete</NavLink>
                <h1>{this.state.post.title}</h1>
                <br />
                <h5>Summary</h5>
                <p>{this.state.post.contents}</p>

                <Modal isOpen={this.state.modal14} toggle={this.toggle} centered>
                    <ModalHeader toggle={this.toggle}>Delete</ModalHeader>
                    <ModalBody>
                        Are you sure you want to delete this?
                    </ModalBody>
                    <ModalFooter>
                     <Button className='btn btn-elegant' onClick={this.handleDelete}>Delete</Button>
                        <Button className='btn btn-elegant' onClick={this.toggle}>No</Button>
                    </ModalFooter>
                </Modal>
            </Wrapper>
        )
    }
};

export default PostPage;