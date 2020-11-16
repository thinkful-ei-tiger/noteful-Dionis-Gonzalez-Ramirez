import React from 'react';
import {Link} from 'react-router-dom'
import data from './data';
import Note from './Note'
import ErrorPage from './ErrorPage'
import './NoteList.css'

class NoteList extends React.Component {
  state = {notes: data.notes}

  addNote = (folderID) => {
    data.notes.push({
      id: (data.notes.length + 1).toString(),
      name: '[New Folder]',
      modified: (new Date()).toISOString(),
      folderId: folderID,
      content: ''
    })
    this.setState({notes: data.notes})
  }

  render() {
    const folderID = this.props.match.params.folder;
    const notes = this.state.notes.filter(note => note.folderId === folderID) || [];
    const note = notes[0]
    const noteExists = note !== undefined;
    const folderExists = data.folders.find(folder => folder.id === folderID) !== undefined;

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
        <Link
          onClick={() => this.addNote(folderID)}
          to={`/folder/${folderID}/note/${data.notes.length+1}`}
          id='add-note'>Add Note</Link>
      </div>
    )
  }
}

export default NoteList;