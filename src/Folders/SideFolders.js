import React from 'react';
import PropTypes from 'prop-types'
import {Link, withRouter} from 'react-router-dom';
import AddFolder from './AddFolder'
import './SideFolders.css'

class SideFolders extends React.Component {
  state = {folders: this.props.folders}

  static propTypes = {
    folders: PropTypes.array.isRequired,
    addFolder: PropTypes.func.isRequired,
    deleteFolder: PropTypes.func.isRequired,
    editFolder: PropTypes.func.isRequired
  }

  render() {
    return (
      <div className='folder-list'>
        {
          this.props.folders.map((folder, idx) => {
            return (
              <div className='folder' key={idx}>
                <Link
                  to={`/folders/${folder.id}`}
                  onBlur={(evt) => {
                    this.props.editFolder(
                      evt.target.textContent,
                      this.props.location.pathname.split('folders/')[1]
                    )
                    evt.target.contentEditable = false;
                    evt.target.classList.remove('animate');
                  }}
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
                  onClick={() => this.props.deleteFolder(this.props.location.pathname.split('folders/')[1])}
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