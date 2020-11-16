import React from 'react';
import Note from './Note';
import data from './data'
import './NotePage.css'

class NotePage extends React.Component {
  editContent = (newContent) => {
    let found = data.notes.find(note => note.id === this.props.match.params.note)
    found = (found === undefined) ? {} : found;
    found.content = newContent;
    found.modified = (new Date()).toISOString();
  }

  render() {
    let note = data.notes.find(note => note.id === this.props.match.params.note)
    note = (note === undefined) ? {} : note;
    return (
      <div className='note-page'>
        <Note note={note} />
        <div
          contentEditable
          onBlur={(evt) => this.editContent(evt.target.textContent)}
          suppressContentEditableWarning="true"
          className= {'note-content'}
        >
          {note.content}
        </div>
      </div>
    )
  }
}

export default NotePage;