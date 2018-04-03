import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import { injectGlobal } from 'styled-components';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

injectGlobal`

html,body { 
    overflow: hidden;
    margin: 0;
    padding: 0;
    font-family: arial;
}

`

ReactDOM.render(<App />, document.getElementById('root'));

