import React from 'react';
import {withRouter, Route, Switch} from 'react-router-dom';
import Header from './Header/Header';
import SideFolders from './Folders/SideFolders';
import FolderDropdown from './Folders/Mobile/FolderDropdown'
import MobileNewFolder from './Folders/Mobile/MobileNewFolder'
import HomePage from './DefaultPages/HomePage'
import NoteList from './Notes/NoteList';
import NotePage from './Notes/NotePage';
import ErrorPage from './DefaultPages/ErrorPage'
import NotesContext from './NotesContext'
import RuntimeError from './RuntimeError'
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
      const newState = this.state
      newState.folders.push(newFolder)
      this.setState(newState)
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

  editFolder = (newFolderName, folderID) => {
    api.editFolder(newFolderName, folderID)
    .then(folderJSON => {
      const folders = this.state.folders;
      const existing = folders.find(folder => folder.id === folderID)
      if (existing === undefined || existing === null) return;
      Object.assign(existing, folderJSON);
      this.setState({...this.state, folders: folders})
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
      this.props.history.push(`/folders/${newNote.folderId}/notes/${serverNote.id}`)
    })
  }

  deleteNote = (noteID) => {
    const notes = this.state.notes;
    const found = notes.find(note => note.id === noteID)
    const indexFound = notes.indexOf(found)
    notes.splice(indexFound, 1)
    this.setState({notes: notes})
    this.props.history.push(`/folders/${found.folderId}`)
    api.deleteNote(noteID)
  }

  render() {
    return (
      <main className='App'>
        <Header />
        <div className='main-section'>
          <RuntimeError>
            <SideFolders
              folders={this.state.folders}
              addFolder={this.addFolder}
              deleteFolder={this.deleteFolder}
              editFolder={this.editFolder}
            />
          </RuntimeError>
          <RuntimeError>
            <FolderDropdown
              folders={this.state.folders}
              addFolder={this.addFolder}
              deleteFolder={this.deleteFolder}
              editFolder={this.editFolder}
            />
          </RuntimeError>
          <NotesContext.Provider value={{
              addNote: this.addNote,
              deleteNote: this.deleteNote
            }}>
            <RuntimeError>
              <Switch>
                  <Route exact path='/' component={HomePage}/>
                    <Route exact path='/folders/:folder' render={() =>
                      <NoteList
                        addNote={this.addNote}
                        deleteNote={this.deleteNote}
                        state={this.state}
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
                      editFolder={this.editFolder}
                      folderID={this.props.location.pathname.split('folders/')[1]}
                    />
                  } />
                  <Route component={ErrorPage} />
              </Switch>
            </RuntimeError>
          </NotesContext.Provider>
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
