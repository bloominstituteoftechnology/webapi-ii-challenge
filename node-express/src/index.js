import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import rootReducer from './reducers';

const reduxDevToolsHook = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();

const store = createStore(
    rootReducer,
    compose(applyMiddleware(logger, thunk), reduxDevToolsHook)
);

ReactDOM.render(
    <Provider store={store}>
    <Router>
        <Route path='/' component={App} />
    </Router>
    </Provider>,
    document.getElementById('root')
);
