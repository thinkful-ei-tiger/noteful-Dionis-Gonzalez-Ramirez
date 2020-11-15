import React from 'react'
import {Link} from 'react-router-dom';
import './AddFolder.css'

const newFolder = React.createContext();

class AddFolder extends React.Component {
  
  render() {
    return (
      <button
        id='add-folder'
        onClick={this.props.addFolder}
      >Add Folder
      </button>
    )
  }
}

export default AddFolder;