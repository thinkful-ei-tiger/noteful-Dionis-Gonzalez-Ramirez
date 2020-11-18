import React from 'react';
import data from '../.././data';
import api from '../.././api'
import {withRouter} from 'react-router-dom'
import './MobileNewFolder.css'

class MobileNewFolder extends React.Component {
  static defaultProps = {folderName: ''}

  mobileAddFolder = (evt) => {
    evt.preventDefault();
    if (this.props.location.pathname.split('/mobile-folder/')[1] !== undefined) {
      const folderName = evt.target['folder-name'].value
      const folderID = this.props.location.pathname.split('/mobile-folder/')[1]
      this.props.editFolder(folderName, folderID)
    } else {
      const folderName = evt.target['folder-name'].value
      this.props.addFolder(folderName)
    }
  }

  render() {
    return (
        <form
          onSubmit={(evt) => {
            evt.preventDefault();
            this.mobileAddFolder(evt)
            this.props.history.goBack();
          }}
          id='mobile-new-folder'
        >
          <input
            id='folder-name'
            type='text'
            // value={this.props.folderName}
          />
          <button type='submit'>Submit</button>
          <button type='button'
            onClick={() => this.props.history.goBack()}
          >Cancel</button>
        </form>
    )
  }
}

export default withRouter(MobileNewFolder);