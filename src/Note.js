import React from 'react';
import {Link} from 'react-router-dom';
import {withRouter} from 'react-router-dom';
import data from './data';
import './Note.css'

class Note extends React.Component {
  delete = () => {
    const found = data.notes.find(note => note.id === this.props.note.id)
    const indexFound = data.notes.indexOf(found)
    data.notes.splice(indexFound, 1)
    this.props.history.push(`/${this.props.folderID || this.props.match.params.folder}`)
  }
  render() {
    const rawDate = (this.props.match.params.note) ? (new Date()).toString() : new Date(this.props.note.modified).toString();
    const date =  rawDate.split('GMT')[0];
    console.log(date);
    return (
      <div className='note-preview'>
        <Link
          to={`/${this.props.folderID}/${this.props.note.id}`}
          key={this.props.note.id}
          contentEditable
          suppressContentEditableWarning="true"

        >
          {this.props.note.name}
          <p><i>Modified on {date}</i></p>
        </Link>
        <button onClick={this.delete}>Delete</button>
      </div>
    )
  }
}

export default withRouter(Note);