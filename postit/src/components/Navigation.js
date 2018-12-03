import React from 'react'
import { Nav, Contianer } from '../sytles/PostStyles'
import { Link } from 'react-router-dom'






const Navigation = () => {


    return (
        <Nav>
            <Contianer>
            <h1>quickquotes</h1>
            <hr />
            </Contianer>
            <Link to='/' style={{ "text-decoration": "none" }}>
                HOME
            </Link>
        </Nav>
    )
}



export default Navigation