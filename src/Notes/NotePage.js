import React from 'react';
import {withRouter} from 'react-router-dom'
import PropTypes from 'prop-types'
import Note from './Note';
import NotesContext from '.././NotesContext'
import './NotePage.css'

class NotePage extends React.Component {
  static contextType = NotesContext;

  static propTypes = {
    notes: PropTypes.array.isRequired,
    deleteNote: PropTypes.func.isRequired
  }

  editContent = (newContent) => {
    let found = this.props.notes.find(note => note.id === this.props.match.params.note)
    found = (found === undefined) ? {} : found;
    found.content = newContent;
    found.modified = (new Date()).toISOString();
  }

  render = () => {
    let note = this.props.notes.find(note => note.id === this.props.match.params.note)
    note = (note === undefined) ? {} : note;
    return (
      <div className='note-page'>
        <Note
          note={note}
          notes={this.props.notes}
        />
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

export default withRouter(NotePage);