import React from 'react';
import data from './data'
import {withRouter} from 'react-router-dom';
import './FolderDropdown.css'

class FolderDropdown extends React.Component {
  onChange = () => {
    ;
  }
  render() {
    return (
      <div className='folder-dropdown'>
        <select onChange={(evt) => this.props.history.push(`/${evt.target.value}`)}>
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
      </div>
    )
  }
}

export default withRouter(FolderDropdown);