import React from 'react';
import { Route } from 'react-router-dom';
import Post from './Post';
import App from './../App';

const Root = () => {
    return (
        <div>

            <Route exact path='/' component={App} />
            <Route path='/:id' component={Post} />

            </div>
    )
}

export default Root;