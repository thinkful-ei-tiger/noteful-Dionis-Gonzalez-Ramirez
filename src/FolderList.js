import React from 'react';
import data from './data';
import {Link} from 'react-router-dom';
import './FolderList.css'

class FolderList extends React.Component {
  state = {status: ''}
  select = () => {
    this.setState({status: 'selected'})
  }
  unselect = () => {
    this.setState({status: ''})
  }
  render() {
    return (
      <div className='folder-list'>
          {
            data.folders.map(folder => {
              return ( 
                <Link
                  className={this.state.status}
                  to={`/${folder.id}`} key={folder.id} 
                  onClick={this.select}
                  onMouseOut={this.unselect}
                >
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