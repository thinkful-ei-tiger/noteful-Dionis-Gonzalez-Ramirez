import React from 'react';
import data from './data'
import {withRouter} from 'react-router-dom';
import MobileAddFolder from './MobileAddFolder'
import './FolderDropdown.css'

class FolderDropdown extends React.Component {
  render() {
    return (
      <div className='folder-dropdown'>
        <select onChange={(evt) => this.props.history.push(`/folder/${evt.target.value}`)}>
          <option key='dropdown-title' selected disabled>
            Folders...
          </option>
          {
            data.folders.map(folder => {
              return (
                <option key={folder.id} value={folder.id}>
                  {folder.name}
                </option>
              )
            })
          }
        </select>
        <MobileAddFolder />
      </div>
    )
  }
}

export default withRouter(FolderDropdown);