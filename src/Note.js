import React from 'react';
import {Link} from 'react-router-dom';
import {withRouter} from 'react-router-dom';
import data from './data';
import './Note.css'

class Note extends React.Component {
  state = {
    previousValues: {...this.props.note}
  }

  delete = () => {
    const found = data.notes.find(note => note.id === this.props.note.id)
    const indexFound = data.notes.indexOf(found)
    data.notes.splice(indexFound, 1)
    this.props.history.push(`/folder/${this.props.folderID || this.props.match.params.folder}`)
  }
  editTitle = (newName) => {
    const noteID = 
      (this.props.note.id === undefined)
      ? this.props.match.params.note
      : this.props.note.id
    let found = data.notes.find(note => note.id === noteID)
    found = (found === undefined) ? {} : found;
    Object.assign(found, {name: newName})
  }
  cancel = () => {
  let found = data.notes.find(note => note.id === this.props.note.id)
  found = (found === null || found === undefined) ? {} : found;
  Object.assign(found, this.state.previousValues)
  this.props.history.goBack();
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
          to={`/folder/${folderID}/note/${noteID}`}
          key={this.props.note.id}
          suppressContentEditableWarning="true"
          onKeyDown={(evt) => (evt.which === 13) ? evt.target.blur() : null}
          onBlur={(evt) => {
            evt.target.contentEditable = false;
            this.editTitle(evt.target.innerText.split('\n')[0])
          }}
          onClick={(evt) => (evt.target.contentEditable === true) ? evt.target.toggle('note-title-selected') : evt.target.contentEditable = true}
        >
          {(this.props.note.name === undefined) ? '[New Note]' : this.props.note.name}
          <p contentEditable={false}><i>Modified on {date}</i></p>
        </Link>
        <button onClick={this.delete}>Delete</button>
        <button
          className='cancel-button'
          onClick={this.cancel}
          style={{
            display:
              (`/folder/${folderID}/note/${noteID}` === this.props.match.url)
              ? 'block'
              : 'none'
          }}
        >Cancel</button>
      </div>
    )
  }
}

export default withRouter(Note);