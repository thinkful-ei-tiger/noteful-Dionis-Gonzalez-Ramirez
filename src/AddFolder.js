import React from 'react'
import './AddFolder.css'

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