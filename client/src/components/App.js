import React, { Component } from 'react';
import './App.css';
import NotesList from './NotesList';
import Note from './Note';
import NewNote from './NewNote';
import EditNote from './EditNote';
import { BrowserRouter as Router, Route } from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <div className="App">
      <Router>
        <div>
        <Route path='/' exact component={NotesList}/>
        <Route path='/viewnote/:id' component={Note} />
        <Route path='/newnote' component={NewNote} />
        <Route path='/editnote/:id' component={EditNote} />
        {/* <Route path='/deletenote/:id' component={DeleteNote} /> */}
        </div>
      </Router>
      </div>
    );
  }
}

export default App;
