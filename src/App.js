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

  addFolder = () => {
    api.addFolder()
    .then(idJSON => {
      const newFolder = {
        id: idJSON.id,
        name: ''
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
      this.setState({
        ...this.state,
        notes: [...this.state.notes, newNote]
      })
      this.props.history.push(`/folders/${newNote.folderId}/notes/${serverNote.id}`)
    })


    // this.props.notes.push({
    //   id: (this.props.notes.length + 1).toString(),
    //   name: '[New Note]',
    //   modified: (new Date()).toISOString(),
    //   folderId: folderID,
    //   content: ''
    // })
    // this.setState({notes: this.props.notes})
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
          />
          <Switch>
            <Route exact path='/' component={HomePage}/>
            <Route exact path='/folders/:folder' render={() =>
              <NoteList
                notes={this.state.notes}
                addNote={this.addNote}
              />
            }/>
            <Route path='/folders/:folder/notes/:note' render={() =>
              <NotePage notes={this.state.notes} />
            }/>
            <Route path='/mobile-add-folder' component={MobileNewFolder} />4
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
