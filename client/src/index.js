import React from 'react';
import ReactDOM from 'react-dom';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux'
import postReducer from '../src/reducers'
import App from '../src/components/App.js'

const store = createStore(postReducer, (applyMiddleware(thunk)));

ReactDOM.render(
<Provider store={store}>
<App />
</Provider>, document.getElementById('root'));
