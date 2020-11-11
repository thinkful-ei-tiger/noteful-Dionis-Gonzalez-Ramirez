import React from 'react';
import {Link} from 'react-router-dom';

class Note extends React.Component {
  render() {
    return (
      <>
        <Link to={`/${this.props.folderID}/${this.props.note.id}`}>{this.props.note.name}</Link>
        <p>{this.props.note.content}</p>
      </>
    )
  }
}

export default Note;