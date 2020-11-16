import React from 'react';
import {Route, Switch} from 'react-router-dom';
import Header from './Header';
import SideFolders from './SideFolders';
import FolderDropdown from './FolderDropdown'
import HomePage from './HomePage'
import NoteList from './NoteList';
import NotePage from './NotePage';
import ErrorPage from './ErrorPage'
import './App.css'

function App() {
  return (
    <main className='App'>
      <Header />
      <div className='main-section'>
        <SideFolders />
        <FolderDropdown />
        <Switch>
          <Route exact path='/' component={HomePage}/>
          <Route exact path='/folder/:folder' component={NoteList}/>
          <Route path='/folder/:folder/note/:note' component={NotePage}/>
          <Route component={ErrorPage} />
        </Switch>
      </div>
    </main>
  );
}

export default App;
