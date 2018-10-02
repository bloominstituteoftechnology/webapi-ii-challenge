import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { Navbar, NavbarBrand, NavbarNav, NavbarToggler, Collapse, NavItem, NavLink, Fa } from 'mdbreact';

import { toggleUpdatePost } from '../../store/actions';

class NavigationBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            collapse: false,
        };
        this.onClick = this.onClick.bind(this);
    }
  
  onClick(){
    this.setState({
        collapse: !this.state.collapse,
      });
  }
  
  render() {
    const bgPink = {backgroundColor: '#ec407a'}
      return(
        <div>
            <Route>
                <Navbar style={bgPink} dark expand="md" scrolling fixed="top">
                    <NavbarBrand href="/">
                        <strong>Node Express Lab</strong>
                    </NavbarBrand>
                    <NavbarToggler onClick={ this.onClick } />
                    <Collapse isOpen = { this.state.collapse } navbar>
                    <NavbarNav left>
                        <NavItem active={this.props.location.pathname === '/'} >
                            <NavLink exact to="/" onClick={this.props.toggleUpdatePost} >Home</NavLink>
                        </NavItem>
                        <NavItem active={this.props.location.pathname === '/posts'}>
                            <NavLink to="/posts" onClick={this.props.toggleUpdatePost} >Posts</NavLink>
                        </NavItem>
                        <NavItem active={this.props.location.pathname === '/form'}>
                            <NavLink to="/form" onClick={this.props.toggleUpdatePost} >Create Post</NavLink>
                        </NavItem>
                    </NavbarNav>
                    <NavbarNav right>
                        <NavItem>
                        <NavLink to="#"><Fa icon="facebook" /></NavLink>
                        </NavItem>
                        <NavItem>
                        <NavLink to="#"><Fa icon="twitter" /></NavLink>
                        </NavItem>
                        <NavItem>
                        <NavLink to="#"><Fa icon="instagram" /></NavLink>
                        </NavItem>
                    </NavbarNav>
                    </Collapse>
                </Navbar>
            </Route>
           
        </div>
      );
    }
  }

  const mapStateToProps = state => ({

  });
  
  export default connect(mapStateToProps, { toggleUpdatePost })(NavigationBar);