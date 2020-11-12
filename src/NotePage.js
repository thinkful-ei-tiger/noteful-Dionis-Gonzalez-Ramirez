import React from 'react';
import Note from './Note';
import data from './data'
import './NotePage.css'

class NotePage extends React.Component {
  editContent = (newContent) => {
    const found = data.notes.find(note => note.id === this.props.match.params.note)
    found.content = newContent;
  }

  render() {
    const note = data.notes.find(note => note.id === this.props.match.params.note)
    return (
      <div className='note-page'>
        <Note note={note} />
        <div
          contentEditable onBlur={(evt) => this.editContent(evt.target.textContent)}
          suppressContentEditableWarning="true"
          className='note-content'
        >
          {note.content}
        </div>
      </div>
    )
  }
}

export default NotePage;