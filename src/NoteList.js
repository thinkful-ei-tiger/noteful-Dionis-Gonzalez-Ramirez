import React from 'react';
import Note from './Note'
import {withRouter} from 'react-router-dom'
import NotesContext from './NotesContext'
import ErrorPage from './ErrorPage'
import './NoteList.css'

class NoteList extends React.Component {
  state = {notes: this.props.notes}

  static contextType = NotesContext;

  render() {
    const folderID = this.props.match.params.folder;
    const notes = this.state.notes.filter(note => note.folderId === folderID);
    const note = notes[0]
    return (
      (note === undefined)
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
                notes={this.state.notes}
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