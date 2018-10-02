import React from 'react';
import ReactDOM from 'react-dom';
import ReactDOM from 'react-dom';import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { Route } from 'react-router-dom';
import thunk from 'redux-thunk';

import App from './App';
import rootReducer from './components/reducers';

import './index.css';

import registerServiceWorker from './registerServiceWorker';

const store = createStore(
    rootReducer,
    applyMiddleware(thunk)
);

ReactDOM.render(
    <Provider store={store}>
        <Router>
            <App />
        </Router>
    </Provider>,
    document.getElementById('root'));
registerServiceWorker();