import React from 'react';
import Note from './Note'
import {withRouter} from 'react-router-dom'
import NotesContext from './NotesContext'
import ErrorPage from './ErrorPage'
import './NoteList.css'

class NoteList extends React.Component {
  state = this.props.state;

  static contextType = NotesContext;

  render() {
    const folderID = this.props.match.params.folder;
    const notes = this.props.state.notes.filter(note => note.folderId === folderID);
    const note = notes[0]
    console.log(notes)
    return (
      // (note === undefined)
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