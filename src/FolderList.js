import React from 'react';
import data from './data';
import {Link} from 'react-router-dom';
import './FolderList.css'

class FolderList extends React.Component {
  render() {
    return (
      <div className='folder-list'>
        {
          data.folders.map(folder => {
            return (
              <Link to={`/${folder.id}`} key={folder.id} >
                {folder.name}
              </Link>
            )
          })
        }
        <Link id='add-folder' to={`/`}>Add Folder</Link>
      </div>
    )
  }
}

export default FolderList;