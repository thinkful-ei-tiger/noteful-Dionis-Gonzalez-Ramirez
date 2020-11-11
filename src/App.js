import React from 'react';
import {Route} from 'react-router-dom';
import HomePage from './HomePage';
import NoteList from './NoteList';
import NotePage from './NotePage';
import './App.css'

function App() {
  return (
    <main className='App'>
      
      <Route path='/' component={HomePage} />
      <Route exact path='/:folder' component={NoteList} />
      <Route path='/:folder/:note' component={NotePage} />

    </main>
  );
}

export default App;
