import React from 'react';
import data from './data';
import Note from './Note'
import {Link} from 'react-router-dom';
import ErrorPage from './ErrorPage'
import './NoteList.css'

class NoteList extends React.Component {
  addNote() {
    const newNote = {}
  }
  render() {
    const folderID = this.props.match.params.folder || '';
    const notes = data.notes.filter(note => note.folderId === folderID) || [];
    const noteExists = notes[0] !== undefined;
    const folderExists = data.folders.find(folder => folder.id === folderID) !== undefined;

    return (
      (!noteExists && !folderExists)
      ? <ErrorPage />
      :
      <div className='note-list'>
        {
          notes.map(note => {
            return (
              <Note
                folderID={folderID}
                note={note}
                key={this.props.match.params.note}
              />
            )
          })
        }
        <button id='add-note'>Add Note</button>
      </div>
    )
  }
}

export default NoteList;