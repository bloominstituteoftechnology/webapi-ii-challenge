import React from 'react'
import { Nav, Container,} from '../sytles/PostStyles'
import { Link } from 'react-router-dom'
import good from '../img/header_logo-8d96d7078a3d63f9f31d92282fd67cf4.png'






const Navigation = () => {


    return (
        <Nav>
            <Container>
            
            <img src={good} alt='' width="150px" height="35px"/>
              <Link to='/'>
                HOME
            </Link>
            <hr />
            </Container>
        </Nav>
    )
}



export default Navigation