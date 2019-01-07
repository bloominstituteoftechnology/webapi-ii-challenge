import React from 'react';
import { NavLink } from 'react-router-dom';

import './Navigation.css';

const Navigation = () => {
    return (
        <nav>
            <NavLink exact to='/'>Home</NavLink>
            <NavLink to='/api/posts'>Posts</NavLink>
        </nav>
    )
}

export default Navigation;