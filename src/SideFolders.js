import React from 'react';
import AddFolder from './AddFolder'
import data from './data';
import {Link, withRouter} from 'react-router-dom';
import './SideFolders.css'

class SideFolders extends React.Component {
  state = {folders: data.folders}

  addFolder = () => {
    data.folders.push({id: data.folders.length+1, name: ''})
    this.setState({folders: data.folders})
  }
  deleteFolder = () => {
    const index = data.folders.indexOf(data.folders.find(folder => folder.id === this.props.location.pathname.split('folder/')[1]))
    data.folders.splice(index, 1)
    this.setState({folders: data.folders})
  }

  editFolder = (evt) => {
    const existingFolder = data.folders.find(folder => folder.id === this.props.location.pathname.split('folder/')[1]);
    if (existingFolder !== undefined) Object.assign(existingFolder, {name: evt.target.textContent})
    evt.target.contentEditable = false;
    evt.target.classList.remove('animate');
  }

  render() {
    const currentPath = this.props.location.pathname.split('folder/')[1];
    return (
      <div className='folder-list'>
        {
          this.state.folders.map(folder => {
            return (
              <div className='folder'>
                <Link
                  to={`/folder/${folder.id}`}
                  key={folder.id}
                  onBlur={(evt) => this.editFolder(evt)}
                  onKeyDown={(evt) => (evt.which === 13) ? evt.target.blur() : null}
                  tabIndex='none'
                  onClick={(evt) => {
                    (evt.target.contentEditable === 'true')
                    ? evt.target.classList.add('animate')
                    : evt.target.contentEditable = true
                  }}
                >
                  {folder.name}
                </Link>
                <button
                  className='delete'
                  onClick={this.deleteFolder}
                  style={{display: (this.props.location.pathname.split('folder/')[1]) === folder.id ? 'block' : 'none'}}
                ><b>X</b></button>
              </div>
            )
          })
        }
        <AddFolder addFolder={this.addFolder} />
      </div>
    )
  }
}

export default withRouter(SideFolders);