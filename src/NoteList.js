import React from 'react';
import {Link} from 'react-router-dom'
import Note from './Note'
import ErrorPage from './ErrorPage'
import {withRouter} from 'react-router-dom'
import api from './api'
import './NoteList.css'

class NoteList extends React.Component {
  state = {notes: this.props.notes}

  render() {
    const folderID = this.props.match.params.folder;
    const notes = this.props.notes.filter(note => note.folderId === folderID);
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
                notes={this.props.notes}
              />
            )
          })
        }
        <Link
          onClick={() => this.props.addNote(folderID)}
          to={`/folders/${folderID}/notes/${note.id}`}
          id='add-note'
        >Add Note</Link>
      </div>
    )
  }
}

export default withRouter(NoteList);