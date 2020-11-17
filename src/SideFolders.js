import React from 'react';
import AddFolder from './AddFolder'
import {Link, withRouter} from 'react-router-dom';
import './SideFolders.css'

class SideFolders extends React.Component {
  state = {folders: this.props.folders}

  render() {
    return (
      <div className='folder-list'>
        {
          this.props.folders.map((folder, idx) => {
            return (
              <div className='folder' key={idx}>
                <Link
                  to={`/folder/${folder.id}`}
                  onBlur={(evt) => this.props.editFolder(evt, this.props.location.pathname.split('folder/')[1])}
                  onKeyDown={(evt) => (evt.which === 13) ? evt.target.blur() : null}
                  autoFocus={(this.props.location.pathname).includes(folder.id)}
                  onClick={(evt) => {
                    (evt.target.contentEditable === 'true')
                    ? evt.target.classList.add('animate')
                    : evt.target.contentEditable = true
                  }}
                >
                  {folder.name}
                </Link>
                <button
                  className='folder-delete'
                  onClick={() => this.props.deleteFolder(this.props.location.pathname.split('folder/')[1])}
                  style={{display: (this.props.location.pathname).includes(folder.id) ? 'block' : 'none'}}
                ><b>X</b>
                </button>
              </div>
            )
          })
        }
        <AddFolder addFolder={this.props.addFolder} />
      </div>
    )
  }
}

export default withRouter(SideFolders);