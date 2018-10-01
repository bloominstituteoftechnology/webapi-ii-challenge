import React, { Component } from 'react';
import { Navbar, NavbarBrand, NavbarNav, NavbarToggler, Collapse, NavItem, NavLink, Fa } from 'mdbreact';

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
            <Navbar style={bgPink} dark expand="md" scrolling fixed="top">
                <NavbarBrand href="/">
                    <strong>Node Express Lab</strong>
                </NavbarBrand>
                <NavbarToggler onClick={ this.onClick } />
                <Collapse isOpen = { this.state.collapse } navbar>
                <NavbarNav left>
                    <NavItem active>
                        <NavLink to="/">Home</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink to="/posts">Posts</NavLink>
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
        </div>
      );
    }
  }
  
  export default NavigationBar;