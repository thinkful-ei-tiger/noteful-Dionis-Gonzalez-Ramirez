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
            <Route exact path='/folder/:folder' render={() =>
              <NoteList notes={this.state.notes} />
            }/>
            <Route path='/folder/:folder/note/:note' render={() =>
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
