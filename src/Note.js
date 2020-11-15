import React from 'react';
import {Link} from 'react-router-dom';
import {withRouter} from 'react-router-dom';
import data from './data';
import './Note.css'

class Note extends React.Component {
  static defaultProps = {
    note: {
      id: data.folders.length + 1,
      name: '',
      modified: '',
      folderId: '',
      content: ''
    }
  }
  delete = () => {
    const found = data.notes.find(note => note.id === this.props.note.id)
    const indexFound = data.notes.indexOf(found)
    data.notes.splice(indexFound, 1)
    this.props.history.push(`/folder/${this.props.folderID || this.props.match.params.folder}`)
  }
  editTitle = (newName) => {
    const found = data.notes.find(note => note.id === this.props.note.id)
    Object.assign(found, {name: newName})
  }
  cancel = () => {
  const found = data.notes.find(note => note.id === this.props.note.id)
  Object.assign(found, this.props.note)
  this.props.history.goBack();
  }
  render() {
    const rawDate = 
      (this.props.match.params.note)
      ? (new Date()).toString()
      : new Date(this.props.note.modified).toString();
    const date =  rawDate.split('GMT')[0];
    const folder =
      (this.props.folderID === undefined)
      ? this.props.note.folderId
      : this.props.folderID;
    return (
      <div className='note-preview'>
        <Link
          to={`/folder/${folder}/note/${this.props.note.id}`}
          key={this.props.note.id}
          contentEditable
          suppressContentEditableWarning="true"
          onKeyDown={(evt) => (evt.which === 13) ? evt.target.blur() : null}
          onBlur={(evt) => {
            this.editTitle(evt.target.innerText.split('\n')[0])
          }}
        >
          {this.props.note.name}
          <p><i>Modified on {date}</i></p>
        </Link>
        <button onClick={this.delete}>Delete</button>
        <button
          class='cancel-button'
          onClick={this.cancel}
          style={{
            display:
              (`/folder/${this.props.note.folderId}/note/${this.props.note.id}` === this.props.match.url)
              ? 'block'
              : 'none'
          }}
        >Cancel</button>
      </div>
    )
  }
}

export default withRouter(Note);