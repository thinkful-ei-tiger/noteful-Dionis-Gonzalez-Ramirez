import React from 'react'
import PropTypes from 'prop-types'
import './AddFolder.css'

class AddFolder extends React.Component {
  static propTypes = {
    addFolder: PropTypes.func.isRequired
  }
  
  render() {
    return (
      <button
        id='add-folder'
        onClick={() => this.props.addFolder()}
      >Add Folder
      </button>
    )
  }
}

export default AddFolder;