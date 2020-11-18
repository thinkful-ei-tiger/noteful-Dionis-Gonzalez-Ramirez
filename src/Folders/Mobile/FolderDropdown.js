import React from 'react';
import {withRouter} from 'react-router-dom';
import PropTypes from 'prop-types'
import MobileAddFolder from './MobileAddFolder'
import './FolderDropdown.css'

class FolderDropdown extends React.Component {
  static propTypes = {
    folders: PropTypes.array.isRequired,
    addFolder: PropTypes.func.isRequired,
    deleteFolder: PropTypes.func.isRequired,
    editFolder: PropTypes.func.isRequired
  }

  render() {
    return (
      <div className='folder-dropdown'>
        <select
          defaultValue=''
          onChange={(evt) => this.props.history.push(`/folders/${evt.target.value}`)}
        >
          <option key='dropdown-title' value='' disabled>
            Folders...
          </option>
          {
            this.props.folders.map(folder => {
              return (
                <option key={folder.id} value={folder.id}>
                  {folder.name}
                </option>
              )
            })
          }
        </select>
        <div
          className='dropdown-buttons'
          style={{display:(this.props.location.pathname === '/') ? 'none' : 'flex'}}
        >
        <button
          id='mobile-edit-folder'
          onClick={(evt) => {
            this.props.history.push(`/mobile-folder/${this.props.location.pathname.split('folders/')[1]}`)
          }}
        >Edit
        </button>
        <button
          id='mobile-delete-folder'
          onClick={() => this.props.deleteFolder(this.props.location.pathname.split('folders/')[1])}
        >Delete
        </button>
        </div>
        <MobileAddFolder />
      </div>
    )
  }
}

export default withRouter(FolderDropdown);