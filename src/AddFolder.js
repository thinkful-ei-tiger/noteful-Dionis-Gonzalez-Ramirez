import React from 'react'
import './AddFolder.css'

const newFolder = React.createContext();

class AddFolder extends React.Component {
  
  render() {
    return (
      <button
        id='add-folder'
        to={`/add-folder`}
        onClick={this.props.addFolder}
      >Add Folder
      </button>
    )
  }
}

export default AddFolder;