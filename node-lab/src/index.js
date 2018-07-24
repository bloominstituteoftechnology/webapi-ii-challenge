import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Root from './components/Root';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import {postReducers} from './reducers/index';
import { BrowserRouter as Router } from 'react-router-dom';

const store = createStore(postReducers, applyMiddleware(thunk, logger));


ReactDOM.render(
    <Router>
<Provider store={store}>
<Root />
</Provider>
</Router>, document.getElementById('root'));
