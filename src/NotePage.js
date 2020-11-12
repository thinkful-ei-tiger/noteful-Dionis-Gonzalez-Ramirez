import React from 'react';
import Note from './Note';
import data from './data'
import './NotePage.css'

class NotePage extends React.Component {
  render() {
    const note = data.notes.find(note => note.id === this.props.match.params.note)
    return (
      <div className='note-page'>
        <Note note={note} />
        <p>{note.content}</p>
      </div>
    )
  }
}

export default NotePage;