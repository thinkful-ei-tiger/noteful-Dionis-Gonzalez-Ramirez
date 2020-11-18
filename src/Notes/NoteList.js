import React from 'react';
import {withRouter} from 'react-router-dom'
import PropTypes from 'prop-types'
import Note from './Note'
import ErrorPage from '../DefaultPages/ErrorPage'
import NotesContext from '.././NotesContext'
import './NoteList.css'

class NoteList extends React.Component {
  state = this.props.state;

  static contextType = NotesContext;

  static propTypes = {
    addNote: PropTypes.func.isRequired,
    deleteNote: PropTypes.func.isRequired,
    state: PropTypes.object.isRequired
  }

  render() {
    const folderID = this.props.match.params.folder;
    const notes = this.props.state.notes.filter(note => note.folderId === folderID);
    const note = notes[0]
    return (
      (this.props.state.folders.find(folder => folder.id === folderID) === undefined)
      ? <ErrorPage />
      :
      <div className='note-list'>
        {
          notes.map(note => {
            return (
              <Note
                folderID={folderID}
                note={note}
                key={note.id}
                notes={this.props.state.notes}
              />
            )
          })
        }
        <button
          onClick={() => this.context.addNote(folderID)}
          id='add-note'
        >Add Note</button>
      </div>
    )
  }
}

export default withRouter(NoteList);