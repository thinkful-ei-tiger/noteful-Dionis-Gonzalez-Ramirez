import React from 'react';
import {withRouter, Route, Switch} from 'react-router-dom';
import Header from './Header';
import SideFolders from './SideFolders';
import FolderDropdown from './FolderDropdown'
import MobileNewFolder from './MobileNewFolder'
import HomePage from './HomePage'
import NoteList from './NoteList';
import NotePage from './NotePage';
import ErrorPage from './ErrorPage'
import api from './api'
import './App.css'

class App extends React.Component {
  state = {folders: [], notes: []}

  addFolder = (folderName = '') => {
    api.addFolder()
    .then(idJSON => {
      const newFolder = {
        id: idJSON.id,
        name: folderName
      }
      this.setState({
        ...this.state,
        folders: [...this.state.folders, newFolder]
      })
    })
  }

  deleteFolder = (folderID) => {
    api.deleteFolder(folderID)
    const filteredFolders = this.state.folders.filter(folder => folder.id !== folderID)
    const filteredNotes = this.state.notes.filter(note => note.folderId !== folderID)
    this.setState(
      {
        folders: filteredFolders,
        notes: filteredNotes
      }
    )
    this.props.history.push('/')
  }

  editFolder = (evt, folderID) => {
    const newFolderName = evt.target.textContent;
    api.editFolder(newFolderName, folderID)
    .then(folderJSON => {
      const folders = this.state.folders;
      const existing = folders.find(folder => folder.id === folderID)
      if (existing === undefined || existing === null) return;
      Object.assign(existing, folderJSON);
      this.setState({...this.state, folders: folders})
      evt.target.contentEditable = false;
      evt.target.classList.remove('animate');
    })
  }

  addNote = (folderID) => {
    const newNote = {
      name: '[New Note]',
      modified: (new Date()).toISOString(),
      folderId: folderID,
      content: ''
    }
    api.addNote(newNote)
    .then(serverNote => {
      const folders = this.state.notes
      folders.push(serverNote)
      console.log(newNote.folderId)
      this.props.history.push(`/folders/${newNote.folderId}/notes/${serverNote.id}`)
    })
  }

  deleteNote = (noteID) => {
    const notes = this.state.notes;
    console.log(this.props)
    const found = notes.find(note => note.id === noteID)
    const indexFound = notes.indexOf(found)
    notes.splice(indexFound, 1)
    this.setState({notes: notes})
    // this.props.history.goBack();
    this.props.history.push(`/folders/${found.folderId}`)
    api.deleteNote(noteID)
  }

  render() {
    return (
      <main className='App'>
        <Header />
        <div className='main-section'>
          <SideFolders
            folders={this.state.folders}
            addFolder={this.addFolder}
            deleteFolder={this.deleteFolder}
            editFolder={this.editFolder}
          />
          <FolderDropdown
            folders={this.state.folders}
            addFolder={this.addFolder}
            deleteFolder={this.deleteFolder}
            editFolder={this.editFolder}
          />
          <Switch>
            <Route exact path='/' component={HomePage}/>
            <Route exact path='/folders/:folder' render={() =>
              <NoteList
                notes={this.state.notes}
                addNote={this.addNote}
                deleteNote={this.deleteNote}
              />
            }/>
            <Route path='/folders/:folder/notes/:note' render={() =>
              <NotePage
                notes={this.state.notes}
                deleteNote={this.deleteNote}
              />
            }/>
            <Route path='/mobile-folder' render={() => 
              <MobileNewFolder
                addFolder={this.addFolder}
                folderID={this.props.location.pathname.split('folders/')[1]}
              />
            } />
            <Route component={ErrorPage} />
          </Switch>
        </div>
      </main>
    )
  }

  componentDidMount() {
    api.getData()
    .then(newState => this.setState(newState))
  }
}

export default withRouter(App);
