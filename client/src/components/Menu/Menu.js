import React from 'react';
import { Link } from 'react-router-dom';

import './Menu.css';

export default () => {
    return (
        <Link to='/create'>
            <nav className="Menu">
                    <button className="Menu__button">Create</button>
            </nav>
        </Link>
    )
}