import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import rootReducer from './reducers';

const store = createStore(
    rootReducer,
    applyMiddleware(logger, thunk)
);

ReactDOM.render(
    <Provider store={store}>
    <Router>
        <Route path='/' component={App} />
    </Router>
    </Provider>,
    document.getElementById('root')
);
