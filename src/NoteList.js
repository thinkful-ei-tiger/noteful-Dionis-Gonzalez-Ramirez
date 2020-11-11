import React from 'react';
import data from './data';
import Note from './Note'
import './NoteList.css'

class NoteList extends React.Component {
  render() {
    const folderID = this.props.match.params.folder || '';
    const notes = data.notes.filter(note => note.folderId === folderID) || [];
    return (
      <div className='note-list'>
        {
          notes.map(note => {
            return (
              <Note folderID={folderID} note={note} />
            )
          })
        }
      </div>
    )
  }
}

export default NoteList;