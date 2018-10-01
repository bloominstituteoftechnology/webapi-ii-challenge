import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import { QuotesList } from './QuotesList/';

class App extends Component {
  render() {
    return (
      <div>
        {/* <Nav /> */}
        <Route exact path='/' component={QuotesList} />
        {/* <Route path='editor' component={Editor} /> */}
      </div>
    );
  }
}

export default App;
