import React from 'react';
import data from './data';
import Note from './Note'
import {Link} from 'react-router-dom';
import ErrorPage from './ErrorPage'
import './NoteList.css'

class NoteList extends React.Component {
  render() {
    const folderID = this.props.match.params.folder || '';
    const notes = data.notes.filter(note => note.folderId === folderID) || [];
    const noteExists = notes[0] !== undefined;
    const folderExists = data.folders.find(folder => folder.id === folderID) !== undefined

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
        <Link id='add-note'to='/'>Add Note</Link>
      </div>
    )
  }
}

export default NoteList;