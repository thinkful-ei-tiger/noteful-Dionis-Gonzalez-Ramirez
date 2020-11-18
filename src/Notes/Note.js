import React from 'react';
import {Link, withRouter} from 'react-router-dom';
import PropTypes from 'prop-types'
import NotesContext from '.././NotesContext'
import './Note.css'

class Note extends React.Component {
  state = {
    previousValues: {...this.props.note}
  }

  static contextType = NotesContext;

  static propTypes = {
    notes: PropTypes.array.isRequired,
    note: PropTypes.object.isRequired,
    key: PropTypes.string,
    folderID: PropTypes.string
  }

  editTitle = (newName) => {
    const noteID = 
      (this.props.note.id === undefined)
      ? this.props.match.params.note
      : this.props.note.id
    let found = this.props.notes.find(note => note.id === noteID)
    found = (found === undefined) ? {} : found;
    Object.assign(found, {name: newName})
  }
  cancel = () => {
  let found = this.props.notes.find(note => note.id === this.props.note.id)
  found = (found === null || found === undefined) ? {} : found;
  Object.assign(found, this.state.previousValues)
  this.props.history.push(`/folders/${this.props.note.folderId}`);
  }
  render() {
    const rawDate = 
      (this.props.match.params.note)
      ? (new Date()).toString()
      : new Date(this.props.note.modified).toString();
    const date =  rawDate.split('GMT')[0];
    const folderID = 
      [this.props.folderID, this.props.note.folderId, this.props.match.params.folder]
      .find(folder => folder !== undefined)
    const noteID =
      [this.props.note.id, this.props.match.params.note]
      .find(note => note !== undefined)
    return (
        <div className='note-preview'>
          <Link
            to={`/folders/${folderID}/notes/${noteID}`}
            key={this.props.note.id}
            suppressContentEditableWarning="true"
            onKeyDown={(evt) => (evt.which === 13) ? evt.target.blur() : null}
            onBlur={(evt) => {
              evt.target.contentEditable = false;
              this.editTitle(evt.target.innerText.split('\n')[0])
            }}
            onClick={(evt) => (evt.target.contentEditable === true) ? evt.target.toggle('note-title-selected') : evt.target.contentEditable = true}
          >
            {this.props.note.name}
          </Link>
          <div className='buttons'>
          <p contentEditable={false}><i>Modified on {date}</i></p>
          <button onClick={() => this.context.deleteNote(noteID)}>Delete</button>
          <button
            className='cancel-button'
            onClick={this.cancel}
            style={{
              display:
                (`/folders/${folderID}/notes/${noteID}` === this.props.match.url)
                ? 'block'
                : 'none'
            }}
          >Cancel</button>
          </div>
        </div>
    )
  }
}

export default withRouter(Note);